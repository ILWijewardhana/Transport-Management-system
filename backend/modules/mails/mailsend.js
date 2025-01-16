const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "indikatransport8@gmail.com",
    pass: "itvn bgkz avxp imgl",
  },
});

async function sendMail(to, sub, message) {
  await transporter.sendMail({
    to: to,
    subject: sub,
    html: message,
  });
}

module.exports = sendMail;
