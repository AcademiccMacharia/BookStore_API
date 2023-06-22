const { createTransport } = require("nodemailer");
require("dotenv").config();

const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendBorrowMail(email, name, title) {
  const message_options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "BOOK BORROWED SUCCESFULLY",
    text: 
    `Dear ${name},

    Congratulations on borrowing a new book!
    
    The Book Title is ${title}.
    
    Enjoy the journey within its pages and may it transport you to captivating worlds and endless possibilities.

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

