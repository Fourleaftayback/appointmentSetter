export const roundToDay = date => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const getLastMinute = date => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59);
};

export const setAvailableTimes = (date, hour) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour).getTime();
};

export const setTime = (date, hour, minute) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
};

const roundToMinutes = date => {
  const d = new Date(date);
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes()
  ).getTime();
};

const checkRange = (time, min, max) => {
  return time >= min && time < max ? true : false;
};

export const checkAlltimes = (time, arr) => {
  let result = false;
  let i = 0;

  for (i; i < arr.length; i++) {
    if (
      checkRange(
        time,
        roundToMinutes(arr[i].appointment_start),
        roundToMinutes(arr[i].appointment_end)
      )
    ) {
      result = true;
      break;
    }
  }

  return result;
};

//bookedTimes is array of times already booked for the specific team member
//the issue is its gonna be hard to check if days off is true cause the data is being checked againt whole array

export const getAvaliableTimes = (bookedTimes, day, earliest, latest) => {
  const today = roundToDay(day).toString();
  const earlistTime = setAvailableTimes(today, earliest);
  const latestTime = setAvailableTimes(today, latest);
  const halfHour = 1800000;
  const currentTime = new Date().getTime();
  const timeBlock = [];
  let i = earlistTime;
  for (i; i < latestTime; i += halfHour) {
    timeBlock.push(i);
  }

  return timeBlock.filter(
    time => !checkAlltimes(time, bookedTimes) && time > currentTime
  );
};

export const getType = type => {
  switch (type) {
    case "hair_cut":
      return "Hair Cut";
    case "shave":
      return "Shave";
    case "cut_and_shave":
      return "Cut And Shave";
    default:
      return "Other type of";
  }
};

export const getEndTime = (start, type) => {
  switch (type) {
    case "hair_cut":
      return start + 1800000;
    case "shave":
      return start + 1800000;
    case "cut_and_shave":
      return start + 3600000;
    default:
      return start;
  }
};

export const firstUpperCase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkDayOff = (arrApps, id, date) => {
  const filter = arrApps.filter(
    item =>
      item.day_off === true &&
      roundToDay(item.appointment_start).getTime() ===
        roundToDay(date).getTime() &&
      item.team_member_id === id
  );
  if (filter.length === 0) return false;
  return true;
};
