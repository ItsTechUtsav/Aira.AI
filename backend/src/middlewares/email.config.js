const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: true,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error(" SMTP VERIFY FAILED:", error);
  } else {
    console.log(" SMTP READY");
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" sendVerificationEmail called");
    console.log(" To:", email);
    console.log(" SMTP_USER exists:", !!process.env.SMTP_USER);
    console.log(" SMTP_PASS exists:", !!process.env.SMTP_PASS);
    console.log(" Preparing email send...");

    const mailOptions = {
      from: `"Aira.AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your Aira.AI Account",
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: white; border-radius: 12px;">
          <h2 style="color: #6366f1;">Welcome to Aira.AI!</h2>

          <p>
            Use the verification code below to activate your account:
          </p>

          <div
            style="
              background-color: rgba(255,255,255,0.1);
              padding: 16px;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 4px;
              text-align: center;
              border-radius: 8px;
              color: #34d399;
              border: 1px solid rgba(255,255,255,0.2);
            "
          >
            ${verificationToken}
          </div>

          <p
            style="
              font-size: 12px;
              color: #94a3b8;
              margin-top: 20px;
            "
          >
            This code will expire shortly.
          </p>
        </div>
      `,
    };

    console.log("📡 Calling transporter.sendMail()...");

    const info = await transporter.sendMail(mailOptions);

    console.log(" EMAIL SENT SUCCESSFULLY");
    console.log(" Response:", info.response);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return info;
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error(" EMAIL SEND FAILED");
    console.error(error);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    throw error;
  }
};

module.exports = {
  transporter,
  sendVerificationEmail,
};