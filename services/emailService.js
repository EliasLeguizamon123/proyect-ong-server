const sgMail = require('@sendgrid/mail')

const emailService = async (email, subject, message) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject,
    text: message
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    // console.log(error)
  }
}

module.exports = emailService
