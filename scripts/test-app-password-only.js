// Script test chỉ sử dụng App Password
import { sendEmail } from '../utils/sendEmails.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const testAppPasswordOnly = async () => {
  console.log('🔐 Testing App Password Only Configuration...\n');
  
  // Check App Password configuration
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.error('❌ App Password not configured!');
    console.log('\n💡 Please add to .env.local:');
    console.log('   EMAIL_USER=your-email@gmail.com');
    console.log('   EMAIL_PASS=your-16-character-app-password');
    console.log('\n📖 See APP_PASSWORD_SETUP.md for detailed instructions');
    return;
  }
  
  console.log('📋 App Password Configuration:');
  console.log(`   Email: ${emailUser}`);
  console.log(`   App Password: ${emailPass ? '✅ Set' : '❌ Missing'}\n`);
  
  // Get test email from command line argument
  const testEmail = process.argv[2] || 'test@example.com';
  
  if (!testEmail.includes('@')) {
    console.error('❌ Please provide a valid email address');
    console.log('Usage: node scripts/test-app-password-only.js your-email@example.com');
    return;
  }
  
  console.log(`📧 Sending test email to: ${testEmail}\n`);
  
  try {
    const testSubject = 'Test Email - App Password Only - Giang Nội Tiết';
    const testTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Test Email - App Password Only</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .success { color: #10b981; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Giang Nội Tiết</h1>
            <p>App Password Only - Email System</p>
          </div>
          
          <div class="content">
            <h2 class="success">✅ App Password Only Configuration Working!</h2>
            <p>Email system is now configured to use <strong>App Password only</strong>.</p>
            
            <h3>📋 Configuration:</h3>
            <ul>
              <li><strong>Method:</strong> Gmail App Password Only</li>
              <li><strong>OAuth2:</strong> ❌ Disabled</li>
              <li><strong>App Password:</strong> ✅ Enabled</li>
              <li><strong>Sender:</strong> ${emailUser}</li>
              <li><strong>Time:</strong> ${new Date().toLocaleString('vi-VN')}</li>
            </ul>
            
            <p>All email features are working with App Password:</p>
            <ul>
              <li>✅ User registration emails</li>
              <li>✅ Gestational diabetes consultation emails</li>
              <li>✅ Daily schedule emails</li>
              <li>✅ Admin notification emails</li>
            </ul>
            
            <p><strong>Simple and reliable!</strong> No OAuth2 complexity needed.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const result = await sendEmail(testEmail, '', '', testSubject, testTemplate);
    
    console.log('✅ Email sent successfully using App Password only!');
    console.log(`   Message ID: ${result.messageId}`);
    console.log(`   Response: ${result.response}`);
    console.log(`   To: ${testEmail}`);
    console.log(`   From: ${emailUser}`);
    console.log(`   Subject: ${testSubject}\n`);
    
    console.log('🎉 App Password only configuration is working perfectly!');
    console.log('Benefits:');
    console.log('   ✅ Simple configuration');
    console.log('   ✅ No OAuth2 complexity');
    console.log('   ✅ Reliable and stable');
    console.log('   ✅ Easy to debug');
    console.log('   ✅ No token expiration issues\n');
    
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    
    if (error.message.includes('Invalid credentials')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Check your App Password (16 characters, no spaces)');
      console.log('   2. Make sure 2-Step Verification is enabled');
      console.log('   3. Try creating a new App Password');
    } else if (error.message.includes('Rate limit')) {
      console.log('\n💡 You may have exceeded the daily email limit (100 emails/day)');
    }
  }
};

// Run the test
testAppPasswordOnly();
