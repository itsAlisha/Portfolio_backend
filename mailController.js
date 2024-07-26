const findConfig = require("find-config");
require("dotenv").config({ path: require("find-config")(".env") }); // Load environment variables from .env file
const nodemailer = require("nodemailer");

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

// Send email function
const sendEmail = (email, message, callback) => {
  const mailOptions = {
    from: { name: "Portfolio_Mail", address: process.env.EMAIL_USER }, // sender address
    to: process.env.EMAIL_USER, // list of receivers
    subject: email, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error.message);
      return callback(error, null);
    }
    console.log("Email sent:", info.response);
    callback(null, info.response);
  });
};

module.exports = { sendEmail };
