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

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log("📨 Preparing email send...");

    const mailOptions = {
      from: `"Aira.AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your Aira.AI Account",
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: white; border-radius: 12px;">
          <h2 style="color: #6366f1;">Welcome to Aira.AI!</h2>
          <p>Use the verification code below to activate your account:</p>

          <div style="background-color: rgba(255,255,255,0.1); padding: 16px; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-align: center; border-radius: 8px; color: #34d399; border: 1px solid rgba(255,255,255,0.2);">
            ${verificationToken}
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            This code will expire shortly.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📨 EMAIL SENT SUCCESSFULLY:", info.response);

    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED:", error);
    throw error;
  }
};

module.exports = {
  transporter,
  sendVerificationEmail,
};