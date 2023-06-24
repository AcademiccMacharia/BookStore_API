const { createTransport } = require("nodemailer");
require("dotenv").config();

const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendMail(email, name) {
  const message_options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to our Bookstore Community!",
    text: `Dear ${name},
    
    We are delighted to welcome you to our Bookstore community! On behalf of our entire team, we extend a warm greeting and express our gratitude for choosing us as your go-to destination for all things books.

    At our bookstore, we are passionate about literature and the power of storytelling. We believe that books have the ability to inspire, educate, and transport us to new worlds. We are thrilled to have you join us on this literary journey, where you can explore a vast collection of captivating tales, gain knowledge from thought-provoking non-fiction, and indulge in the pleasure of reading.
    As a member, you will enjoy numerous benefits, including access to our extensive catalog, exclusive offers, personalized recommendations, and exciting events. Our dedicated staff is always ready to assist you in finding the perfect book that matches your interests and preferences.
    
    Should you have any questions or require assistance, please don't hesitate to reach out to our friendly staff. We are here to make your experience with us enjoyable and fulfilling.
    Once again, welcome to our Bookstore family! We look forward to accompanying you on your literary adventures and sharing the joy of reading together.
    
    Happy reading!
    
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

module.exports = { sendMail };
