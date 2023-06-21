const { createTransport } = require("nodemailer");
require("dotenv").config();

const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendReturnMail(email, name, title) {
  const message_options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "BOOK RETURNED SUCCESFULLY",
    text: 
    `Dear ${name},

    Thank you for returning our book. The Book Title is ${title}. 
    
    May your life forever be impacted by its knowledge.

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

module.exports = { sendReturnMail };

