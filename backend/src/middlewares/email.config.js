const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("sendVerificationEmail called");
    console.log("To:", email);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
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
    });

    console.log("EMAIL SENT");
    console.log(response);

    return response;
  } catch (error) {
    console.error("EMAIL SEND FAILED");
    console.error(error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};