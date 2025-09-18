// API đơn giản tạo VietQR - phiên bản gốc của bạn
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, userId } = req.body;

    // Validation đơn giản
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Số tiền không hợp lệ" });
    }

    if (!userId) {
      return res.status(400).json({ error: "Thiếu thông tin người dùng" });
    }

    // Thông tin ngân hàng theo chuẩn VietQR
    const bankInfo = {
      bankId: "TPB",
      accountNumber: "03924302701", // Không có dấu cách cho QR code
      accountName: "NGO QUANG TRUONG",
      description: "Thanh toan don hang Eco Bac Giang"
    };

    // Tạo payment code
    const paymentCode = `ECOBG-${userId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Tạo QR URL theo chuẩn VietQR.io
    const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNumber}-compact2.png?amount=${Math.round(amount)}&addInfo=${encodeURIComponent(bankInfo.description)}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

    console.log('✅ VietQR created:', {
      paymentCode,
      amount: Math.round(amount),
      qrUrl,
      bankInfo
    });

    return res.status(200).json({
      success: true,
      paymentCode: paymentCode,
      qrUrl: qrUrl,
      amount: Math.round(amount),
      bankInfo: bankInfo,
      message: "QR code đã được tạo thành công"
    });

  } catch (error) {
    console.error("Create VietQR Error:", error);
    return res.status(500).json({
      error: "Lỗi tạo QR code",
      message: error.message
    });
  }
}
