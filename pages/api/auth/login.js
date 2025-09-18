import bcrypt from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await db.connectDb();

    const { email, phone, password } = req.body;

    // Validation
    if (!password) {
      return res.status(400).json({ 
        success: false, 
        error: "MISSING_PASSWORD",
        message: "Vui lòng nhập mật khẩu." 
      });
    }

    if (!email && !phone) {
      return res.status(400).json({ 
        success: false, 
        error: "MISSING_CREDENTIALS",
        message: "Vui lòng nhập email hoặc số điện thoại." 
      });
    }

    // Tìm user
    const user = await User.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null,
      ].filter(Boolean),
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        error: "USER_NOT_FOUND",
        message: "Email hoặc số điện thoại không tồn tại." 
      });
    }

    // Kiểm tra email verification
    if (!user.emailVerified) {
      return res.status(400).json({ 
        success: false, 
        error: "EMAIL_NOT_VERIFIED",
        message: "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập." 
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        error: "INVALID_PASSWORD",
        message: "Mật khẩu không đúng." 
      });
    }

    // Đăng nhập thành công
    return res.status(200).json({ 
      success: true, 
      message: "Đăng nhập thành công!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login API error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "SERVER_ERROR",
      message: "Đã xảy ra lỗi máy chủ. Vui lòng thử lại." 
    });
  }
}
