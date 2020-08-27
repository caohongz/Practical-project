const { Service } = require("egg");
const nodeMailer = require("nodemailer");

const userEmail = "18511283565@163.com";
const transporter = nodeMailer.createTransport({
  service: "163",
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: "ICQBPSHDTHJRYDZL",
  },
});
class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html,
    };
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (e) {
      console.log("email error", e);
      return false;
    }
  }
}
module.exports = ToolService;
