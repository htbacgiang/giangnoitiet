import db from "../../../utils/db";
import SepayPayment from "../../../models/SepayPayment";

export default async function handler(req, res) {
  console.log("=== SEPAY WEBHOOK REAL RECEIVED ===");
  console.log("Method:", req.method);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Body:", JSON.stringify(req.body, null, 2));
  console.log("Raw Body:", req.rawBody || "No raw body");
  console.log("Query:", req.query);
  console.log("Timestamp:", new Date().toISOString());
  console.log("===================================");

  if (req.method !== "POST") {
    console.log(`❌ Method not allowed: ${req.method}`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    // Log all available fields first
    console.log("=== WEBHOOK BODY ANALYSIS ===");
    Object.keys(req.body).forEach(key => {
      console.log(`${key}: ${req.body[key]} (${typeof req.body[key]})`);
    });
    console.log("=============================");

    // Sepay webhook format thường khác với callback
    const webhookData = req.body;

    // Kiểm tra nếu body rỗng hoặc không phải object
    if (!webhookData || typeof webhookData !== 'object') {
      console.log("❌ Empty or invalid webhook body");
      return res.status(400).json({ error: "Invalid webhook data" });
    }

    // Xử lý các format webhook khác nhau từ Sepay
    const {
      gateway,
      transactionDate,
      accountNumber,
      transferType,
      transferAmount,
      amount,
      referenceCode,
      description,
      transactionId,
      // Các field khác có thể có
      ...otherFields
    } = webhookData;

    console.log("=== WEBHOOK DATA EXTRACTION ===");
    console.log(`Gateway: ${gateway}`);
    console.log(`Transaction Date: ${transactionDate}`);
    console.log(`Account Number: ${accountNumber}`);
    console.log(`Transfer Type: ${transferType}`);
    console.log(`Transfer Amount: ${transferAmount || amount}`);
    console.log(`Reference Code: ${referenceCode}`);
    console.log(`Description: ${description}`);
    console.log(`Transaction ID: ${transactionId}`);
    console.log("===============================");

    // Validate required fields
    const webhookAmount = transferAmount || amount;
    if (!webhookAmount || !referenceCode) {
      console.log("❌ Missing required fields in webhook");
      return res.status(400).json({
        error: "Missing required fields",
        required: ["amount", "referenceCode"]
      });
    }

    // Tìm payment theo reference code hoặc gần nhất
    let payment = null;

    // Thử tìm theo reference code trước
    if (referenceCode) {
      payment = await SepayPayment.findOne({
        paymentCode: referenceCode,
        status: "pending"
      });

      if (payment) {
        console.log(`✅ Found payment by reference code: ${payment.paymentCode}`);
      }
    }

    // Nếu không tìm thấy theo reference code, tìm payment gần nhất
    if (!payment) {
      console.log("🔍 Reference code not found, searching recent payments...");

      const recentPayments = await SepayPayment.find({
        status: "pending",
        expiresAt: { $gt: new Date() },
        createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // Trong 1 giờ
      }).sort({ createdAt: -1 }).limit(5);

      if (recentPayments.length > 0) {
        // Lọc payments có amount gần giống nhất
        const matchingPayment = recentPayments.find(p =>
          Math.abs(p.amount - webhookAmount) < 1000 // Sai số 1k VND
        );

        if (matchingPayment) {
          payment = matchingPayment;
          console.log(`🎯 Found matching payment by amount: ${payment.paymentCode}`);
        } else {
          payment = recentPayments[0]; // Lấy payment gần nhất
          console.log(`⚠️ Using most recent payment: ${payment.paymentCode}`);
        }
      }
    }

    if (!payment) {
      console.log("❌ No matching payment found");
      return res.status(404).json({
        error: "Payment not found",
        referenceCode,
        amount: webhookAmount
      });
    }

    // Cập nhật payment status
    const updateData = {
      status: "paid",
      paidAt: new Date(),
      transactionId: transactionId || `sepay_${Date.now()}`,
      sepayData: webhookData,
      callbackData: {
        receivedAt: new Date().toISOString(),
        source: "webhook",
        ...webhookData
      }
    };

    const updatedPayment = await SepayPayment.findOneAndUpdate(
      { paymentCode: payment.paymentCode },
      updateData,
      { new: true }
    );

    console.log("✅ Payment updated successfully:");
    console.log(`   Payment Code: ${updatedPayment.paymentCode}`);
    console.log(`   Status: ${updatedPayment.status}`);
    console.log(`   Amount: ${updatedPayment.amount}`);
    console.log(`   Paid At: ${updatedPayment.paidAt}`);

    // Response cho Sepay
    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      paymentCode: updatedPayment.paymentCode,
      status: updatedPayment.status
    });

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
}
