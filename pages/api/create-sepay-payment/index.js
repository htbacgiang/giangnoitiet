import db from "../../../utils/db";
import SepayPayment from "../../../models/SepayPayment";

// Thông tin tài khoản Sepay để xử lý thanh toán
const BANK_INFO = {
  bankId: "TPB", // TPBank - đúng code từ VietQR.io API
  accountNumber: "03924302701", // Tài khoản Sepay để xử lý giao dịch
  accountName: "NGO QUANG TRUONG", // Tên tài khoản Sepay
  description: "Thanh toan don hang Eco Bac Giang"
};

// Function tạo VietQR theo chuẩn chính xác của VietQR.io
function createVietQR(paymentCode, amount) {
  const bankId = BANK_INFO.bankId;
  const accountNo = BANK_INFO.accountNumber;
  const accountName = BANK_INFO.accountName;
  const description = BANK_INFO.description;

  // Format chuẩn của VietQR.io:
  // https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>

  // Đảm bảo amount là số nguyên
  const cleanAmount = Math.round(amount);

  // Tạo QR URL theo chuẩn VietQR.io chính xác
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${cleanAmount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

  console.log("=== VIETQR CREATION ===");
  console.log(`Bank ID: ${bankId}`);
  console.log(`Account: ${accountNo}`);
  console.log(`Amount: ${cleanAmount}`);
  console.log(`QR URL: ${qrUrl}`);
  console.log("=======================");

  return qrUrl;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    const { amount, userId, orderInfo } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Số tiền không hợp lệ" });
    }

    if (!userId) {
      return res.status(400).json({ error: "Thiếu thông tin người dùng" });
    }

    // Tạo payment code unique
    const paymentCode = `ECOBG-${userId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Tạo QR URL
    const qrUrl = createVietQR(paymentCode, amount);

    // Lưu payment vào database
    const payment = new SepayPayment({
      paymentCode,
      amount: Math.round(amount),
      userId,
      sepayData: {
        bankInfo: BANK_INFO,
        qrUrl,
        orderInfo: orderInfo || {}
      }
    });

    await payment.save();

    console.log("=== PAYMENT CREATED ===");
    console.log(`Payment Code: ${paymentCode}`);
    console.log(`Amount: ${amount}`);
    console.log(`QR URL: ${qrUrl}`);
    console.log(`Expires At: ${payment.expiresAt}`);
    console.log("=======================");

    // Response
    res.status(200).json({
      success: true,
      paymentCode,
      qrUrl,
      amount: Math.round(amount),
      expiresAt: payment.expiresAt,
      bankInfo: BANK_INFO,
      message: "Payment created successfully"
    });

  } catch (error) {
    console.error("Create Sepay Payment Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
}
