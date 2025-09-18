import db from "../../../utils/db";
import SepayPayment from "../../../models/SepayPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    console.log("=== DEBUG PAYMENTS REQUEST ===");
    console.log("Timestamp:", new Date().toISOString());

    // Lấy tất cả payments gần đây nhất
    const payments = await SepayPayment.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    console.log(`Found ${payments.length} payments`);

    const paymentSummary = payments.map(payment => ({
      paymentCode: payment.paymentCode,
      status: payment.status,
      amount: payment.amount,
      userId: payment.userId,
      createdAt: payment.createdAt,
      expiresAt: payment.expiresAt,
      paidAt: payment.paidAt,
      transactionId: payment.transactionId,
      lastCallbackAt: payment.lastCallbackAt,
      isExpired: payment.expiresAt && new Date() > payment.expiresAt
    }));

    // Thống kê
    const stats = {
      total: payments.length,
      pending: payments.filter(p => p.status === 'pending').length,
      paid: payments.filter(p => p.status === 'paid').length,
      expired: payments.filter(p => p.status === 'expired').length,
      failed: payments.filter(p => p.status === 'failed').length
    };

    console.log("Payment stats:", stats);

    return res.status(200).json({
      success: true,
      stats: stats,
      payments: paymentSummary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Debug Payments Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
}
