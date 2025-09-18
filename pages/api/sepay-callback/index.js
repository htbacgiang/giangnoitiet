import db from "../../../utils/db";
import SepayPayment from "../../../models/SepayPayment";

export default async function handler(req, res) {
  console.log("=== SEPAY CALLBACK RECEIVED ===");
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
    console.log("=== FULL CALLBACK BODY ANALYSIS ===");
    Object.keys(req.body).forEach(key => {
      console.log(`${key}: ${req.body[key]} (${typeof req.body[key]})`);
    });
    console.log("==================================");

    // Sepay có thể gửi format webhook thay vì callback format
    const {
      paymentCode, paymentStatus, amount, transactionId,
      // Alternative webhook format
      gateway, transactionDate, accountNumber, transferType, transferAmount, referenceCode,
      code, content, subAccount, accumulated, id
    } = req.body;

    // Kiểm tra format dữ liệu
    const hasCallbackFormat = paymentCode && paymentStatus;
    const hasWebhookFormat = transferType && transferAmount && referenceCode;

    console.log("=== FORMAT DETECTION ===");
    console.log(`Has callback format: ${hasCallbackFormat}`);
    console.log(`Has webhook format: ${hasWebhookFormat}`);
    console.log("=========================");

    // Nếu là format webhook, xử lý như sepay-webhook-real
    if (hasWebhookFormat && !hasCallbackFormat) {
      console.log("🎯 Detected webhook format, processing as webhook...");

      // Simulate webhook processing
      let payment = null;

      if (transferType === 'in') {
        // Tìm payment gần nhất hoặc tạo mới
        const recentPayments = await SepayPayment.find({
          status: "pending",
          expiresAt: { $gt: new Date() },
          createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
        }).sort({ createdAt: -1 }).limit(5);

        if (recentPayments.length > 0) {
          payment = recentPayments[0];
          console.log(`🎯 Using most recent payment: ${payment.paymentCode}`);

          // Cập nhật payment status
          await SepayPayment.findOneAndUpdate(
            { paymentCode: payment.paymentCode },
            {
              status: "paid",
              paidAt: new Date(),
              callbackData: req.body
            }
          );

          // Gửi WebSocket notification
          if (global.socketServer) {
            global.socketServer.to(payment.paymentCode).emit("payment_paid", {
              paymentCode: payment.paymentCode,
              amount: payment.amount,
              transactionId: referenceCode,
              paidAt: new Date()
            });
          }

          return res.status(200).json({
            success: true,
            paymentCode: payment.paymentCode,
            message: "Webhook processed successfully",
            transferAmount: transferAmount,
            referenceCode: referenceCode,
            transferType: transferType
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Webhook format received but no matching payment found",
        transferAmount: transferAmount,
        referenceCode: referenceCode,
        transferType: transferType
      });
    }

    // Xử lý format callback bình thường
    console.log("🎯 Processing callback format...");

    // Validation với logging chi tiết
    console.log("=== VALIDATION CHECK ===");
    console.log(`paymentCode: ${paymentCode} (${typeof paymentCode})`);
    console.log(`paymentStatus: ${paymentStatus} (${typeof paymentStatus})`);
    console.log(`amount: ${amount} (${typeof amount})`);
    console.log(`transactionId: ${transactionId} (${typeof transactionId})`);
    console.log("========================");

    if (!paymentCode) {
      console.error("❌ Missing paymentCode in callback");
      console.error("Received fields:", Object.keys(req.body));
      console.error("Full body:", req.body);
      return res.status(400).json({
        error: "Missing paymentCode",
        receivedFields: Object.keys(req.body),
        receivedData: req.body
      });
    }

    if (!paymentStatus) {
      console.error("❌ Missing paymentStatus in callback");
      console.error("Received fields:", Object.keys(req.body));
      console.error("Full body:", req.body);
      return res.status(400).json({
        error: "Missing paymentStatus",
        receivedFields: Object.keys(req.body),
        receivedData: req.body
      });
    }

    // Tìm payment record với nhiều chiến lược
    console.log(`🔍 Searching for payment with code: ${paymentCode}`);

    let payment = null;

    // Chiến lược 1: Exact match
    payment = await SepayPayment.findOne({ paymentCode });
    if (payment) {
      console.log(`✅ Found exact match: ${payment.paymentCode}`);
    }

    // Chiến lược 2: Nếu không tìm thấy, tìm theo pattern (lấy 10 ký tự đầu)
    if (!payment && paymentCode && paymentCode.length >= 10) {
      console.log(`🔄 Exact match failed, trying pattern match...`);
      const pattern = paymentCode.substring(0, 10);
      console.log(`Pattern: ${pattern}`);

      payment = await SepayPayment.findOne({
        paymentCode: { $regex: `^${pattern}`, $options: 'i' }
      });

      if (payment) {
        console.log(`✅ Found pattern match: ${payment.paymentCode} (searched: ${pattern})`);
      }
    }

    // Chiến lược 3: Nếu vẫn không tìm thấy, tìm payment gần nhất có cùng amount
    if (!payment && amount) {
      console.log(`🔄 Pattern match failed, trying amount-based search...`);
      payment = await SepayPayment.findOne({
        amount: amount,
        status: "pending",
        expiresAt: { $gt: new Date() },
        createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // 1 giờ gần đây
      }).sort({ createdAt: -1 });

      if (payment) {
        console.log(`✅ Found amount match: ${payment.paymentCode} (amount: ${payment.amount})`);
      }
    }

    // Chiến lược 4: Cuối cùng, tìm payment gần nhất pending
    if (!payment) {
      console.log(`🔄 Amount match failed, trying recent pending payments...`);
      const recentPayments = await SepayPayment.find({
        status: "pending",
        expiresAt: { $gt: new Date() },
        createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) } // 30 phút gần đây
      }).sort({ createdAt: -1 }).limit(3);

      if (recentPayments.length > 0) {
        payment = recentPayments[0];
        console.log(`🎯 Using most recent payment: ${payment.paymentCode}`);
        console.log(`Recent payments found: ${recentPayments.map(p => p.paymentCode).join(', ')}`);
      }
    }

    if (!payment) {
      console.error(`❌ Payment not found for code: ${paymentCode}`);

      // Log tất cả payments gần đây để debug
      const allRecentPayments = await SepayPayment.find({
        createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
      }).sort({ createdAt: -1 }).limit(10);

      console.log("=== RECENT PAYMENTS DEBUG ===");
      allRecentPayments.forEach((p, index) => {
        console.log(`${index + 1}. ${p.paymentCode} - ${p.status} - ${p.amount} VND - ${p.createdAt}`);
      });
      console.log("==============================");

      return res.status(404).json({
        error: "Payment not found",
        searchedCode: paymentCode,
        recentPayments: allRecentPayments.map(p => ({
          paymentCode: p.paymentCode,
          status: p.status,
          amount: p.amount,
          createdAt: p.createdAt
        }))
      });
    }

    console.log("Found payment record:", {
      paymentCode: payment.paymentCode,
      status: payment.status,
      amount: payment.amount,
      userId: payment.userId
    });

    // Kiểm tra trạng thái hiện tại
    if (payment.status === "paid") {
      console.log(`Payment ${paymentCode} already marked as paid`);
      return res.status(200).json({ message: "Payment already processed" });
    }

    // Cập nhật trạng thái thanh toán
    let newStatus = "failed";
    if (paymentStatus === "success" || paymentStatus === "completed") {
      newStatus = "paid";
    } else if (paymentStatus === "pending") {
      newStatus = "pending";
    }

    console.log(`🔄 Updating payment status from ${payment.status} to ${newStatus}`);

    // Lưu trạng thái trước khi update để debug
    const beforeUpdate = {
      paymentCode: payment.paymentCode,
      status: payment.status,
      amount: payment.amount,
      userId: payment.userId
    };

    console.log("Before update:", beforeUpdate);

    // Cập nhật payment trong database
    console.log(`🔄 Executing database update for paymentCode: ${payment.paymentCode}`);

    const updateData = {
      status: newStatus,
      transactionId: transactionId || null,
      paidAt: newStatus === "paid" ? new Date() : null,
      callbackData: req.body, // Lưu toàn bộ data callback để debug
      lastUpdated: new Date()
    };

    console.log("Update data:", updateData);

    const updateResult = await SepayPayment.findOneAndUpdate(
      { paymentCode: payment.paymentCode }, // Sử dụng payment.paymentCode thay vì paymentCode để đảm bảo đúng
      updateData,
      {
        new: true, // Trả về document sau khi update
        runValidators: false // Tắt validation để tránh lỗi
      }
    );

    console.log("Update result:", {
      success: !!updateResult,
      newStatus: updateResult?.status,
      paidAt: updateResult?.paidAt,
      transactionId: updateResult?.transactionId
    });

    if (!updateResult) {
      console.error("❌ Database update failed!");
      return res.status(500).json({
        error: "Database update failed",
        paymentCode: payment.paymentCode
      });
    }

    console.log(`✅ Payment ${payment.paymentCode} status updated to: ${newStatus}`);

    // Verify update bằng cách query lại
    const verifyPayment = await SepayPayment.findOne({ paymentCode: payment.paymentCode });
    console.log("Verification after update:", {
      paymentCode: verifyPayment?.paymentCode,
      status: verifyPayment?.status,
      paidAt: verifyPayment?.paidAt,
      matchesExpected: verifyPayment?.status === newStatus
    });

    // Log kết quả để debug
    if (!verifyPayment || verifyPayment.status !== newStatus) {
      console.error("❌ CRITICAL: Payment status update FAILED!");
      console.error("Expected status:", newStatus);
      console.error("Actual status:", verifyPayment?.status);
      console.error("Payment found:", !!verifyPayment);
    } else {
      console.log("✅ SUCCESS: Payment status updated correctly");
    }

    // Gửi thông báo qua WebSocket nếu thanh toán thành công
    if (newStatus === "paid" && global.socketServer) {
      global.socketServer.to(payment.paymentCode).emit("payment_paid", {
        paymentCode: payment.paymentCode,
        amount: payment.amount,
        transactionId,
        paidAt: new Date()
      });
      console.log(`WebSocket notification sent for payment: ${payment.paymentCode}`);
    } else if (newStatus === "paid") {
      console.log("WebSocket server not available, payment status updated in DB only");
    }

    return res.status(200).json({
      success: true,
      paymentCode: payment.paymentCode,
      status: newStatus,
      updateSuccess: !!updateResult,
      debugInfo: {
        searchedCode: paymentCode,
        foundCode: payment.paymentCode,
        matchedBy: paymentCode === payment.paymentCode ? "exact" : "pattern",
        amount: payment.amount,
        beforeStatus: beforeUpdate.status,
        afterStatus: updateResult?.status
      }
    });

  } catch (error) {
    console.error("Sepay Callback Error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
}
