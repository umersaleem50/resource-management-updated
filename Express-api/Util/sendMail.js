const nodeMailer = require("nodemailer");

exports.sendMail = async (email, resetToken) => {
  const transporter = new nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const TOKEN_URL = `127.0.0.1:3000/auth/reset-password/${resetToken}`;
  const message = `<div>Reset Password of Resource management account. Click on given link below to reset password.<br><a href=${TOKEN_URL}>${TOKEN_URL}</a><br>If you didn't requested for reseting you password then please ignore this mail.</div>`;

  try {
    return transporter.sendMail({
      from: "Umar Saleem <umersaleem50@gmail.com>",
      to: email,
      subject: "You can reset your password within 10 minutes",
      html: message,
    });
  } catch (error) {
    console.log(error);
  }
};
