import db from "../../../utils/db";
import SepayPayment from "../../../models/SepayPayment";

// Thời gian hết hạn QR code (30 phút)
const QR_CODE_EXPIRY_MINUTES = 30;

// Thông tin ngân hàng Sepay (CẬP NHẬT THEO THÔNG TIN THẬT CỦA BẠN)
const SEPAY_BANK_INFO = {
  bankId: "TPB",
  accountNumber: "03924302701", // CẬP NHẬT: Số tài khoản Sepay thật
  accountName: "NGO QUANG TRUONG", // CẬP NHẬT: Tên tài khoản thật
  description: "Thanh toan don hang Eco Bac Giang"
};

const SEPAY_CONFIG = {
  QR_BASE_URL: "https://img.vietqr.io/image/"
};

// Function tạo VietQR code theo chuẩn ngân hàng Việt Nam
function createVietQRData(paymentCode, amount) {
  // Format theo chuẩn VietQR
  const vietQRData = {
    // Header
    "00": "01", // Version
    "01": "11", // Initiation method (static QR)

    // Thông tin người thụ hưởng (Beneficiary)
    "38": {
      "00": SEPAY_BANK_INFO.bankId, // Bank ID
      "01": SEPAY_BANK_INFO.accountNumber, // Account Number
      "02": "VN", // Country Code
    },

    // Thông tin chuyển khoản
    "53": "704", // Currency VND
    "54": amount.toString(), // Amount
    "58": "VN", // Country Code

    // Thông tin bổ sung
    "62": {
      "01": paymentCode, // Reference Code
      "08": SEPAY_BANK_INFO.description, // Description
    }
  };

  return vietQRData;
}

// Function tạo QR URL
function createVietQR(paymentCode, amount) {
  const bankId = SEPAY_BANK_INFO.bankId;
  const accountNo = SEPAY_BANK_INFO.accountNumber;
  const accountName = SEPAY_BANK_INFO.accountName;
  const description = SEPAY_BANK_INFO.description;

  // Đảm bảo amount là số nguyên
  const cleanAmount = Math.round(amount);

  // Tạo QR URL theo chuẩn VietQR.io
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${cleanAmount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

  console.log("=== VIETQR REFRESH ===");
  console.log(`Payment Code: ${paymentCode}`);
  console.log(`Bank ID: ${bankId}`);
  console.log(`Account: ${accountNo}`);
  console.log(`Amount: ${cleanAmount}`);
  console.log(`QR URL: ${qrUrl}`);
  console.log("======================");

  return qrUrl;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await db.connectDb();

    const { paymentCode } = req.body;

    if (!paymentCode) {
      return res.status(400).json({ error: "Missing paymentCode" });
    }

    // Tìm payment trong database
    const payment = await SepayPayment.findOne({ paymentCode });

    if (!payment) {
      return res.status(404).json({
        error: "Payment not found",
        paymentCode
      });
    }

    // Kiểm tra trạng thái payment
    if (payment.status !== "pending") {
      return res.status(400).json({
        error: "Payment is not in pending status",
        status: payment.status
      });
    }

    // Tạo QR mới
    const newQrUrl = createVietQR(paymentCode, payment.amount);

    // Cập nhật expires time
    const newExpiresAt = new Date(Date.now() + QR_CODE_EXPIRY_MINUTES * 60 * 1000);

    // Cập nhật payment trong database
    const updatedPayment = await SepayPayment.findOneAndUpdate(
      { paymentCode },
      {
        expiresAt: newExpiresAt,
        sepayData: {
          ...payment.sepayData,
          qrUrl: newQrUrl,
          refreshedAt: new Date(),
          refreshCount: (payment.sepayData?.refreshCount || 0) + 1
        }
      },
      { new: true }
    );

    console.log("=== QR REFRESHED SUCCESSFULLY ===");
    console.log(`Payment Code: ${paymentCode}`);
    console.log(`New QR URL: ${newQrUrl}`);
    console.log(`New Expires At: ${newExpiresAt}`);
    console.log("=================================");

    res.status(200).json({
      success: true,
      paymentCode,
      qrUrl: newQrUrl,
      expiresAt: newExpiresAt,
      amount: payment.amount,
      message: "QR code refreshed successfully"
    });

  } catch (error) {
    console.error("Refresh Sepay QR Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
}
