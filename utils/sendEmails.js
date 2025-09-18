import nodemailer from "nodemailer";
import { activateEmailTemplate } from "../emails/activateEmailTemplate";

const {
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

// Log configuration (without sensitive data)
console.log("Email configuration loaded:", {
  hasAppPasswordConfig: !!(EMAIL_USER && EMAIL_PASS),
  senderEmail: EMAIL_USER,
});

// Function to create transporter using App Password only
const createTransporter = () => {
  // Only use App Password
  if (EMAIL_USER && EMAIL_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }
  
  throw new Error("App Password not configured. Please set EMAIL_USER and EMAIL_PASS in .env.local");
};

// Main send email function
export const sendEmail = async (to, url, txt, subject, template) => {
  try {
    const transporter = createTransporter();
    
    // Use custom template if provided, otherwise use default activation template
    const htmlContent = template || activateEmailTemplate(to, url);
    
    const mailOptions = {
      from: EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully using App Password:", {
      messageId: info.messageId,
      to: to,
      subject: subject,
      from: EMAIL_USER,
    });
    
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};