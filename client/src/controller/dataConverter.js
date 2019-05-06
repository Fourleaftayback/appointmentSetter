/*
export const removeDuplicateObj = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}; */
export const roundToDay = date => {
  let d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const setAvailableTimes = (date, hour) => {
  let d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour).getTime();
};

const roundToMinutes = date => {
  let d = new Date(date);
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
