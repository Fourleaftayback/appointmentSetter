const sgMail = require('@sendgrid/mail');
const EmailErrors = require('../models/EmailErrors');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports = function sendEmail(email, errorPath, recipientEmail) {
  return sgMail
    .send(email)
    .then(() => ({ success: true }))
    .catch((err) => {
      const emailErr = new EmailErrors({
        email: recipientEmail,
        from: errorPath,
        error: err,
      });
      return emailErr
        .save()
        .catch(() => undefined)
        .then(() => {
          throw err;
        });
    });
};
