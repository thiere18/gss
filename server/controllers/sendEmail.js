const sgMail = require('@sendgrid/mail')
        
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmail = (to, from, subject, text) => {
  const msg = {
    to,
    from,
    subject,
    text,
  }

  sgMail.send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  
}
module.exports =sendEmail