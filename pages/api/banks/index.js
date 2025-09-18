// API để lấy danh sách ngân hàng từ VietQR.io
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Gọi API VietQR.io để lấy danh sách ngân hàng
    const response = await fetch('https://api.vietqr.io/v2/banks');

    if (!response.ok) {
      throw new Error('Không thể lấy danh sách ngân hàng');
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      banks: data.data || [],
      message: "Danh sách ngân hàng từ VietQR.io"
    });

  } catch (error) {
    console.error("Get banks error:", error);
    return res.status(500).json({
      error: "Lỗi lấy danh sách ngân hàng",
      message: error.message
    });
  }
}
