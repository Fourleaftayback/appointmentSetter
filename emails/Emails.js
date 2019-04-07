function PasswordResetMessage(toEmail, token, url) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Reset Password Request from AppointmentSetter`),
    (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process: https://${url}/reset/password/${token}</p>`);
}

function TeamRegistrationMessage(email, token, url) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Team member Registration`),
    (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process of setting up your profile for AppointmentSetter: https://${url}/team/register/${token}</p>`);
}

module.exports = {
  PasswordResetMessage,
  TeamRegistrationMessage
};
