import db from "../../../utils/db";
import SepayPayment from "../../../models/SepayPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Thêm headers để tránh caching - điều này sẽ ngăn HTTP 304
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // Xóa các headers có thể gây conditional requests
  res.removeHeader('Last-Modified');
  res.removeHeader('ETag');

  try {
    await db.connectDb();

    const { paymentCode } = req.query;

    console.log("=== CHECK SEPAY STATUS REQUEST ===");
    console.log("Payment Code:", paymentCode);
    console.log("Headers:", req.headers);
    console.log("Query:", req.query);
    console.log("Timestamp:", new Date().toISOString());

    if (!paymentCode) {
      console.error("Missing paymentCode parameter");
      return res.status(400).json({ error: "Missing paymentCode parameter" });
    }

    // Tìm payment trong database
    const payment = await SepayPayment.findOne({ paymentCode });

    if (!payment) {
      console.log(`Payment not found: ${paymentCode}`);
      return res.status(404).json({
        error: "Payment not found",
        paymentCode
      });
    }

    // Kiểm tra trạng thái payment
    const now = new Date();
    let status = payment.status;
    let message = "";

    // Nếu payment đang pending và đã hết hạn
    if (payment.status === "pending" && payment.expiresAt < now) {
      // Cập nhật trạng thái thành expired
      await SepayPayment.findOneAndUpdate(
        { paymentCode },
        { status: "expired" }
      );
      status = "expired";
      message = "Payment expired";
    }

    console.log("=== PAYMENT STATUS CHECK ===");
    console.log(`Payment Code: ${paymentCode}`);
    console.log(`Status: ${status}`);
    console.log(`Amount: ${payment.amount}`);
    console.log(`Created: ${payment.createdAt}`);
    console.log(`Expires: ${payment.expiresAt}`);
    console.log(`Paid At: ${payment.paidAt || 'Not paid yet'}`);
    console.log("============================");

    // Response với thông tin payment (bao gồm object payment để tương thích)
    res.status(200).json({
      success: true,
      paymentCode,
      payment: {
        paymentCode,
        status,
        amount: payment.amount,
        createdAt: payment.createdAt,
        expiresAt: payment.expiresAt,
        paidAt: payment.paidAt,
        qrUrl: payment.sepayData?.qrUrl || null,
        bankInfo: payment.sepayData?.bankInfo || null
      },
      status,
      amount: payment.amount,
      createdAt: payment.createdAt,
      expiresAt: payment.expiresAt,
      paidAt: payment.paidAt,
      message,
      qrUrl: payment.sepayData?.qrUrl || null,
      bankInfo: payment.sepayData?.bankInfo || null
    });

  } catch (error) {
    console.error("Check Sepay Status Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
}
