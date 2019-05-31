function PasswordResetMessageUser(toEmail, token, url) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Reset Password Request from AppointmentSetter`),
    (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process: https://${url}/reset/password/${token}</p>`);
}

function PasswordResetMessageTeam(toEmail, token, url) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Reset Password Request from AppointmentSetter`),
    (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process: https://${url}/reset/team/password/${token}</p>`);
}

function TeamRegistrationMessage(toEmail, token, url) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Team member Registration`),
    (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process of setting up your profile for AppointmentSetter: https://${url}/team/register/${token}</p>`);
}

function TeamConfirmAppMessage(toEmail, id, url) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Appointment Requested`),
    (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process confirming the clients appointment: https://${url}/confirm/team/${id}</p>`);
}

function ClientConfirmAppMessage(toEmail, name, date, teamName) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Appointment Confirmed`),
    (this.html = `<p>Hi ${name},</p><p>Your appointment on ${date} with ${teamName} has been confirmed.</p>`);
}

function ClientRejectAppMessage(toEmail, name, date, teamName) {
  (this.to = toEmail),
    (this.from = process.env.SEND_GRID_EMAIL),
    (this.subject = `Appointment could not be confirmed`),
    (this.html = `<p>Hi ${name},</p><p>Sorry bit your appointment on ${date} with ${teamName} can not be confirmed. Please log back in and request another appointment</p>`);
}

module.exports = {
  PasswordResetMessageUser,
  PasswordResetMessageTeam,
  TeamRegistrationMessage,
  TeamConfirmAppMessage,
  ClientConfirmAppMessage,
  ClientRejectAppMessage
};
