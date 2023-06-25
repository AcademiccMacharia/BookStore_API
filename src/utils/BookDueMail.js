const { createTransport } = require('nodemailer');
require('dotenv').config();
const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);
const cron = require('node-cron');
const mssql = require('mssql');

async function sendMail(message) {
  try {
    await transporter.sendMail(message);
    console.log(`Email sent to ${message.to}`);
  } catch (error) {
    console.error(`Error sending email to ${message.to}:`, error);
  }
}

async function checkOverdue() {
  try {
    await mssql.connect(config);
    const result = await mssql.execute('library.CheckLoanStatus');

    result.recordset.forEach(async (row) => {
      const { MemberEmail } = row;

      const message = {
        to: MemberEmail,
        from: process.env.EMAIL_USER,
        subject: 'Library Loan Reminder',
        text: 'Dear member, your loan is due or overdue. Please return the book as soon as possible.',
      };

      await sendMail(message);
    });
  } catch (error) {
    console.error('Error executing cron job:', error);
  }
}

cron.schedule('0 0 * * *', () => {
  checkOverdue();
});
