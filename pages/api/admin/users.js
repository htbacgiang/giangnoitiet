import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "../../../utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Check if user is authenticated and is admin
  if (!session) {
    return res.status(401).json({ 
      success: false, 
      message: "Bạn cần đăng nhập để truy cập tính năng này" 
    });
  }

  if (session.user.role !== "admin") {
    return res.status(403).json({ 
      success: false, 
      message: "Bạn không có quyền truy cập tính năng này" 
    });
  }

  await db.connectDb();

  if (req.method === "GET") {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search = '',
        role = '',
        emailVerified = ''
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Build query
      const query = {};
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (role) {
        query.role = role;
      }
      
      if (emailVerified !== '') {
        query.emailVerified = emailVerified === 'true';
      }

      // Get users with pagination
      const users = await User.find(query)
        .select('name email phone role image emailVerified gender dateOfBirth address createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      const total = await User.countDocuments(query);

      // Get additional stats
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ emailVerified: true });
      const adminUsers = await User.countDocuments({ role: 'admin' });
      const regularUsers = await User.countDocuments({ role: 'user' });

      res.status(200).json({
        success: true,
        data: {
          users,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          },
          stats: {
            totalUsers,
            activeUsers,
            adminUsers,
            regularUsers
          }
        }
      });

    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { userId, updates } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "ID người dùng là bắt buộc"
        });
      }

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy người dùng"
        });
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true, runValidators: true }
      ).select('name email phone role image emailVerified gender dateOfBirth address createdAt');

      res.status(200).json({
        success: true,
        message: "Cập nhật người dùng thành công",
        data: updatedUser
      });

    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { userId, userIds } = req.body;

      // Handle bulk delete
      if (userIds && Array.isArray(userIds)) {
        if (userIds.length === 0) {
          return res.status(400).json({
            success: false,
            message: "Danh sách ID người dùng không được để trống"
          });
        }

        // Check if any of the users are admins
        const users = await User.find({ _id: { $in: userIds } });
        const adminUsers = users.filter(user => user.role === 'admin');
        
        if (adminUsers.length > 0) {
          return res.status(403).json({
            success: false,
            message: `Không thể xóa ${adminUsers.length} tài khoản quản trị viên trong danh sách`
          });
        }

        // Delete users
        const result = await User.deleteMany({ 
          _id: { $in: userIds },
          role: { $ne: 'admin' } // Double check to prevent admin deletion
        });

        res.status(200).json({
          success: true,
          message: `Xóa ${result.deletedCount} người dùng thành công`,
          deletedCount: result.deletedCount
        });

      } else if (userId) {
        // Handle single user delete
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "Không tìm thấy người dùng"
          });
        }

        // Prevent deleting admin users
        if (user.role === 'admin') {
          return res.status(403).json({
            success: false,
            message: "Không thể xóa tài khoản quản trị viên"
          });
        }

        // Delete user
        await User.findByIdAndDelete(userId);

        res.status(200).json({
          success: true,
          message: "Xóa người dùng thành công"
        });

      } else {
        return res.status(400).json({
          success: false,
          message: "ID người dùng hoặc danh sách ID là bắt buộc"
        });
      }

    } catch (error) {
      console.error("Error deleting user(s):", error);
      res.status(500).json({ 
        success: false, 
        message: "Lỗi server nội bộ",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }
}
