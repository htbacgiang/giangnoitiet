import db from '../../utils/db';
import Subscription from '../../models/Subscription';
import { sendEmail } from '../../utils/sendEmails';
import { gestationalDiabetesEmailTemplate } from '../../emails/gestationalDiabetesEmailTemplate';
import { adminNotificationEmailTemplate } from '../../emails/adminNotificationEmailTemplate';

export default async function handler(req, res) {
  await db.connectDb();

  if (req.method === 'POST') {
    try {
      const { 
        name, 
        age, 
        phone, 
        email, 
        purpose, 
        courseSlug,
        source = 'gestational_diabetes_consultation_popup', 
        ipAddress, 
        userAgent 
      } = req.body;

      // Validate required fields (name, phone, and email are required)
      if (!name || !phone || !email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Vui lòng điền đầy đủ thông tin bắt buộc (họ tên, số điện thoại và email)' 
        });
      }

      // Validate age only if provided
      let ageNum = null;
      if (age && age.toString().trim()) {
        ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
          return res.status(400).json({ 
            success: false, 
            message: 'Tuổi phải là số từ 1 đến 100' 
          });
        }
      }

      // Validate phone (basic Vietnamese phone format)
      const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return res.status(400).json({ 
          success: false, 
          message: 'Số điện thoại không hợp lệ' 
        });
      }

      // Validate email (now required)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email không hợp lệ' 
        });
      }

      // Check if phone already exists
      const existingPhoneSubscription = await Subscription.findOne({ 
        phone: phone.trim() 
      });

      if (existingPhoneSubscription) {
        return res.status(400).json({ 
          success: false, 
          message: 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác hoặc liên hệ hỗ trợ.' 
        });
      }

      // Check if email already exists (email is now required)
      const existingEmailSubscription = await Subscription.findOne({ 
        email: email.trim().toLowerCase() 
      });

      if (existingEmailSubscription) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc liên hệ hỗ trợ.' 
        });
      }

      // Get client IP address
      const clientIP = req.headers['x-forwarded-for'] || 
                      req.headers['x-real-ip'] || 
                      req.connection.remoteAddress || 
                      req.socket.remoteAddress ||
                      (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                      ipAddress || 
                      'unknown';

      // Create new subscription
      const subscription = new Subscription({
        name: name.trim(),
        age: ageNum,
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        purpose: purpose ? purpose.trim() : "Tư vấn tiểu đường thai kỳ",
        courseSlug: courseSlug || null,
        source,
        ipAddress: clientIP,
        userAgent: userAgent || req.headers['user-agent'] || 'unknown'
      });

      // Save with validation
      const savedSubscription = await subscription.save();
      
      // Verify the subscription was saved
      if (!savedSubscription) {
        throw new Error('Không thể lưu thông tin đăng ký');
      }

      console.log('Gestational diabetes consultation saved successfully:', {
        id: savedSubscription._id,
        phone: savedSubscription.phone,
        email: savedSubscription.email,
        purpose: savedSubscription.purpose
      });

      // Send emails asynchronously (don't block the response)
      const emailPromises = [];

      // 1. Send confirmation email to user (email is now required)
      const userEmailPromise = sendEmail(
        email.trim(),
        null, // url not needed for this template
        null, // txt not needed
        'Đăng ký tư vấn tiểu đường thai kỳ thành công - Ekip Giang Nội Tiết',
        gestationalDiabetesEmailTemplate(name.trim())
      ).catch(error => {
        console.error('Error sending confirmation email to user:', error);
      });
      emailPromises.push(userEmailPromise);

      // 2. Send notification email to admin
      const adminEmail = process.env.ADMIN_EMAIL || process.env.SENDER_EMAIL_ADDRESS;
      if (adminEmail) {
        const adminEmailData = {
          name: savedSubscription.name,
          age: savedSubscription.age,
          phone: savedSubscription.phone,
          email: savedSubscription.email,
          purpose: savedSubscription.purpose,
          courseSlug: savedSubscription.courseSlug,
          registeredAt: savedSubscription.subscribedAt,
          ipAddress: clientIP,
          userAgent: savedSubscription.userAgent
        };

        const adminEmailPromise = sendEmail(
          adminEmail,
          null,
          null,
          `🚨 Đăng ký tư vấn tiểu đường thai kỳ mới - ${name.trim()}`,
          adminNotificationEmailTemplate(adminEmailData)
        ).catch(error => {
          console.error('Error sending notification email to admin:', error);
        });
        emailPromises.push(adminEmailPromise);
      }

      // Execute all email sends in parallel without blocking response
      Promise.all(emailPromises).then(() => {
        console.log('All emails sent successfully');
      }).catch(error => {
        console.error('Some emails failed to send:', error);
      });

      res.status(201).json({ 
        success: true, 
        message: 'Đăng ký tư vấn tiểu đường thai kỳ thành công! Ekip Giang Nội Tiết sẽ liên hệ với bạn sớm nhất.',
        data: {
          id: savedSubscription._id,
          registeredAt: savedSubscription.subscribedAt
        }
      });

    } catch (error) {
      console.error('Gestational diabetes consultation error:', error);
      
      // Handle MongoDB duplicate key errors
      if (error.code === 11000) {
        if (error.keyPattern?.email) {
          return res.status(400).json({ 
            success: false, 
            message: 'Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc liên hệ hỗ trợ.' 
          });
        }
        if (error.keyPattern?.phone) {
          return res.status(400).json({ 
            success: false, 
            message: 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác hoặc liên hệ hỗ trợ.' 
          });
        }
        return res.status(400).json({ 
          success: false, 
          message: 'Thông tin này đã được đăng ký. Vui lòng kiểm tra lại.' 
        });
      }
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ 
          success: false, 
          message: `Dữ liệu không hợp lệ: ${validationErrors.join(', ')}` 
        });
      }
      
      // Generic error
      res.status(500).json({ 
        success: false, 
        message: 'Có lỗi xảy ra khi lưu thông tin đăng ký. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }
}
