const Appointment = require("../models/Appointment");

const createDaysOffArray = (id, startDate, endDate, weeks, groupId) => {
  let newAppointment = new Appointment({
    user: "5cddfcf01de6df0b4669ff3e",
    client_info: {},
    appointment_type: "day off",
    appointment_start: startDate,
    appointment_end: endDate,
    day_off: true,
    team_member_id: id,
    team_member_info: {},
    days_off_group: groupId,
    date_requested_on: Date.now()
  });
  const daysOffArr = [newAppointment];
  let i = 1;
  let startTime = new Date(startDate).getTime();
  let endTime = new Date(endDate).getTime();
  const sevenDays = 604800000;

  for (i; i < weeks; i++) {
    startTime = sevenDays + startTime;
    endTime = sevenDays + endTime;
    daysOffArr.push(
      new Appointment({
        user: "5cddfcf01de6df0b4669ff3e",
        client_info: {},
        appointment_type: "day off",
        appointment_start: new Date(startTime),
        appointment_end: new Date(endTime),
        day_off: true,
        team_member_id: id,
        team_member_info: {},
        days_off_group: groupId,
        date_requested_on: Date.now()
      })
    );
  }
  return daysOffArr;
};

const setTime = (date, hour, minute) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
};

module.exports = { createDaysOffArray: createDaysOffArray, setTime: setTime };
