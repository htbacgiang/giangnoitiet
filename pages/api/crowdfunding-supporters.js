import db from "../../utils/db";
import SepayPayment from "../../models/SepayPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    const { page = 1, limit = 20, search = "", bank = "" } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Xây dựng query filter
    let filter = { status: "paid" };
    


    // Tìm kiếm theo lời nhắn hoặc số tài khoản
    if (search && search !== "") {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { "sepayData.description": searchRegex },
        { "sepayData.accountNumber": searchRegex }
      ];
    }

    // Lấy tổng số tiền đã nhận được
    const totalAmount = await SepayPayment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Lấy tổng số người ủng hộ
    const totalSupporters = await SepayPayment.countDocuments(filter);

    // Lấy danh sách người ủng hộ với phân trang
    const supporters = await SepayPayment.aggregate([
      { $match: filter },
      {
        $addFields: {
          // Lấy lời nhắn từ BankAPINotify và số tài khoản
          message: {
            $cond: {
              if: { $and: [{ $ne: ["$sepayData", null] }, { $ne: ["$sepayData.description", null] }] },
              then: {
                $cond: {
                  if: { $regexMatch: { input: "$sepayData.description", regex: "BankAPINotify" } },
                  then: {
                    $concat: [
                      "Lời nhắn: ",
                      { $substr: ["$sepayData.description", { $add: [{ $indexOfBytes: ["$sepayData.description", " "] }, 1] }, -1] }
                    ]
                  },
                  else: "$sepayData.description"
                }
              },
              else: "Không có lời nhắn"
            }
          },
          // Lấy số tài khoản người chuyển
          senderAccount: {
            $cond: {
              if: { $and: [{ $ne: ["$sepayData", null] }, { $ne: ["$sepayData.accountNumber", null] }] },
              then: "$sepayData.accountNumber",
              else: null
            }
          },
          // Lấy ngân hàng người chuyển
          senderBank: {
            $cond: {
              if: { $and: [{ $ne: ["$sepayData", null] }, { $ne: ["$sepayData.gateway", null] }] },
              then: "$sepayData.gateway",
              else: null
            }
          }
        }
      },
      {
        $project: {
          amount: 1,
          paidAt: 1,
          paymentCode: 1,
          message: 1,
          senderAccount: 1,
          senderBank: 1,
          transactionDate: "$sepayData.transactionDate",
          ecoBacGiangBankInfo: "$ecoBacGiangData.bankInfo"
        }
      },
      { $sort: { paidAt: -1 } },
      { $skip: skip },
      { $limit: limitNum }
    ]);

    // Tính tổng số tiền
    const total = totalAmount.length > 0 ? totalAmount[0].total : 0;

    console.log("Crowdfunding Supporters API:", {
      page: pageNum,
      limit: limitNum,
      search,
      bank,
      totalSupporters,
      totalAmount: total,
      supportersCount: supporters.length
    });

    return res.status(200).json({
      success: true,
      supporters: supporters,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalSupporters / limitNum),
        totalSupporters,
        hasNextPage: pageNum * limitNum < totalSupporters,
        hasPrevPage: pageNum > 1
      },
      totalAmount: total,
      filters: {
        search
      }
    });

  } catch (error) {
    console.error("Crowdfunding Supporters API Error:", error);
    return res.status(500).json({
      error: "Database error",
      message: error.message
    });
  }
}
