import db from "../../utils/db";
import SepayPayment from "../../models/SepayPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    // Kiểm tra tất cả payments
    const allPayments = await SepayPayment.find({}).limit(10);
    
    // Kiểm tra payments đã thanh toán
    const paidPayments = await SepayPayment.find({ status: "paid" }).limit(10);
    
    // Kiểm tra payments pending
    const pendingPayments = await SepayPayment.find({ status: "pending" }).limit(10);
    
    // Đếm tổng số
    const totalCount = await SepayPayment.countDocuments({});
    const paidCount = await SepayPayment.countDocuments({ status: "paid" });
    const pendingCount = await SepayPayment.countDocuments({ status: "pending" });

    // Kiểm tra một payment cụ thể
    const samplePayment = allPayments.length > 0 ? allPayments[0] : null;

    console.log("=== TEST SEPAY PAYMENTS ===");
    console.log(`Total payments: ${totalCount}`);
    console.log(`Paid payments: ${paidCount}`);
    console.log(`Pending payments: ${pendingCount}`);
    console.log("Sample payment:", samplePayment);
    console.log("==========================");

    return res.status(200).json({
      success: true,
      stats: {
        total: totalCount,
        paid: paidCount,
        pending: pendingCount
      },
      allPayments: allPayments.map(p => ({
        id: p._id,
        paymentCode: p.paymentCode,
        status: p.status,
        amount: p.amount,
        createdAt: p.createdAt,
        paidAt: p.paidAt
      })),
      paidPayments: paidPayments.map(p => ({
        id: p._id,
        paymentCode: p.paymentCode,
        status: p.status,
        amount: p.amount,
        createdAt: p.createdAt,
        paidAt: p.paidAt,
        sepayData: p.sepayData
      })),
      samplePayment: samplePayment ? {
        id: samplePayment._id,
        paymentCode: samplePayment.paymentCode,
        status: samplePayment.status,
        amount: samplePayment.amount,
        createdAt: samplePayment.createdAt,
        paidAt: samplePayment.paidAt,
        sepayData: samplePayment.sepayData
      } : null
    });

  } catch (error) {
    console.error("Test Sepay Payments Error:", error);
    return res.status(500).json({
      error: "Database error",
      message: error.message
    });
  }
}
