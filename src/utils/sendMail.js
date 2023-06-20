const {createTransport} = require("nodemailer");
require("dotenv").config()

const email_config = require('../config/emailConfig');

const message_options = {
    from: process.env.EMAIL_USER,
    to: ["machariab19@gmail.com", "benson.macharia@thejitu.com", "muchuicollins56@gmail.com"],
    subject: "Email testing || LESSS gerritt",
    text: "Yaaaayyy we got it!!!!"
}

const transporter = createTransport(email_config);

async function sendMail(){
    try {
        const info = await transporter.sendMail(message_options);
        console.log("Message sent: %s", info.messageId);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail;