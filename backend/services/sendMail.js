require("dotenv").config(); // Load .env variables
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'prakhardeoria.2004@gmail.com',
    pass: 'hjqwxxhwubndnocr',
  },
});

// Optional verification
transporter.verify((err, success) => {
  if (err) console.error("Transporter verification failed:", err);
  else console.log("✅ Ready to send emails");
});

// console.log(transporter);

/**
 * Send an email to one or more recipients.
 * @param {string[]} to - Array of email addresses.
 * @param {string} subject - Email subject.
 * @param {string} text - Email body (plain text).
 */
async function sendMail(to, subject, text) {
  if (!Array.isArray(to) || to.length === 0) {
    console.error("sendMail error: Invalid 'to' address list");
    return;
  }
  const mailOptions = {
    from: `"Weather Alert" <${process.env.MAIL_USER}>`,
    to: 'ms2817948@gmail.com', 
    subject:subject,
    text:text,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    if (!result || !result.response) {
      throw new Error("Failed to send email: No response from transporter");
    }
    console.log("✅ Email sent:", result.response);
    return result;
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw error;
  }
}

module.exports = { sendMail };
