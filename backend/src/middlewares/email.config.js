require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,  
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(to, code) {
  try {
    const info = await transporter.sendMail({
      from: '"Aira AI Support" <airaaiagent@gmail.com>', 
      to: to, 
      subject: `${code} is your Aira AI verification code`, 
      text: `Welcome to Aira AI! Your verification code is ${code}. This code expires in 5 minutes.`, 
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px;">
          <h2 style="color: #4A90E2;">Welcome to Aira AI</h2>
          <p>Thank you for registering. Please use the following verification code to complete your sign-up process:</p>
          <div style="background: #f4f4f4; padding: 10px 20px; font-size: 24px; font-weight: bold; letter-spacing: 5px; display: inline-block; margin: 10px 0; color: #333;">
            ${code}
          </div>
          <p style="font-size: 12px; color: #777;">This code is valid for 5 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `, 
    }); 

  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = {
  sendVerificationEmail
};