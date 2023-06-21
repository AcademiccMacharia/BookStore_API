const { createTransport } = require("nodemailer");
require("dotenv").config();

const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendBorrowMail(email, name, title, return_date) {
  const message_options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "BOOK BORROWED SUCCESFULLY",
    text: 
    `Dear ${name},

    Thank you for borrowing our book. The Book Title is ${title}.
    
    May you get out of it what you desire.

    Best regards,
    BraveCoders`
  };

  try {
    const info = await transporter.sendMail(message_options);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendBorrowMail };

