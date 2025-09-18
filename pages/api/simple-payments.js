import db from "../../utils/db";
import SepayPayment from "../../models/SepayPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    console.log("=== SIMPLE PAYMENTS CHECK ===");

    // Chỉ lấy 5 payments gần nhất để tránh lỗi
    const payments = await SepayPayment.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('paymentCode status amount createdAt paidAt');

    console.log(`Found ${payments.length} payments`);

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments: payments.map(p => ({
        paymentCode: p.paymentCode,
        status: p.status,
        amount: p.amount,
        createdAt: p.createdAt,
        paidAt: p.paidAt
      }))
    });

  } catch (error) {
    console.error("Simple Payments Error:", error);
    return res.status(500).json({
      error: "Database error",
      message: error.message
    });
  }
}
