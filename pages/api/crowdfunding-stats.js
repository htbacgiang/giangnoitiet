import db from "../../utils/db";
import SepayPayment from "../../models/SepayPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    // Lấy tổng số tiền đã nhận được (chỉ tính các payment đã thanh toán thành công)
    const totalAmount = await SepayPayment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Lấy danh sách người ủng hộ với thông tin từ Sepay
    const supporters = await SepayPayment.aggregate([
      { $match: { status: "paid" } },
      {
        $addFields: {
          // Lấy tên người chuyển khoản từ sepayData
          senderName: {
            $cond: {
              if: { $and: [{ $ne: ["$sepayData", null] }, { $ne: ["$sepayData.description", null] }] },
              then: "$sepayData.description",
              else: {
                $cond: {
                  if: { $and: [{ $ne: ["$sepayData", null] }, { $ne: ["$sepayData.accountNumber", null] }] },
                  then: { $concat: ["Tài khoản ", "$sepayData.accountNumber"] },
                  else: "Khách hàng ẩn danh"
                }
              }
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
          senderName: 1,
          senderAccount: 1,
          senderBank: 1,
          transactionDate: "$sepayData.transactionDate"
        }
      },
      { $sort: { paidAt: -1 } },
      { $limit: 20 }
    ]);

    // Lấy số lượng người ủng hộ
    const supporterCount = await SepayPayment.countDocuments({ status: "paid" });

    // Tính tổng số tiền
    const total = totalAmount.length > 0 ? totalAmount[0].total : 0;

    console.log("Crowdfunding Stats:", {
      totalAmount: total,
      supporterCount: supporterCount,
      supportersCount: supporters.length
    });

    return res.status(200).json({
      success: true,
      totalAmount: total,
      supporterCount: supporterCount,
      supporters: supporters.map(s => ({
        amount: s.amount,
        paidAt: s.paidAt,
        paymentCode: s.paymentCode,
        senderName: s.senderName,
        senderAccount: s.senderAccount,
        senderBank: s.senderBank,
        transactionDate: s.transactionDate
      }))
    });

  } catch (error) {
    console.error("Crowdfunding Stats Error:", error);
    return res.status(500).json({
      error: "Database error",
      message: error.message
    });
  }
}
