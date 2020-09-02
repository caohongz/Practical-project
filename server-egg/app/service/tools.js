const { Service } = require("egg");
const nodeMailer = require("nodemailer");
const path = require("path");
const fse = require("fs-extra");
const { WriteStream } = require("fs-extra");

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
  async mergeFile(filePath, filehash, size) {
    const chunksDir = path.resolve(this.config.UPLOAD_DIR, filehash);
    let chunks = await fse.readdir(chunksDir);
    chunks.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    chunks = chunks.map((cp) => path.resolve(chunksDir, cp));
    await this.mergeChunks(chunks, filePath, size);
  }
  async mergeChunks(chunks, filePath, size) {
    const pipStream = (filePath, writeStream) =>
      new Promise((resolve) => {
        const readStream = fse.createReadStream(filePath);
        readStream.on("end", () => {
          fse.unlinkSync(filePath);
          resolve();
        });
        readStream.pipe(writeStream);
      });
    await Promise.all(
      chunks.map((file, index) => {
        pipStream(
          file,
          fse.createWriteStream(filePath, {
            start: index * size,
            end: (index + 1) * size,
          })
        );
      })
    );
  }
}

module.exports = ToolService;
