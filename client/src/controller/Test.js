const roundToMinute = date => {
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

const checkAlltimes = (time, arr) => {
  let result = false;
  let i = 0;
  for (i; i < arr.length; i++) {
    if (checkRange(time, arr[i].start, arr[i].end)) {
      result = true;
      break;
    }
  }
  return result;
};

//

let booked = [
  {
    start: roundToMinute("2019-05-06T13:00:45.700Z"),
    end: roundToMinute("2019-05-06T13:30:45.700Z")
  },
  {
    start: roundToMinute("2019-05-06T15:00:45.697Z"),
    end: roundToMinute("2019-05-06T15:30:45.700Z")
  },
  {
    start: roundToMinute("2019-05-06T18:00:45.697Z"),
    end: roundToMinute("2019-05-06T20:00:45.700Z")
  }
];

let earlistTime = roundToMinute("2019-05-06T13:00:45.700Z");
let latestTime = roundToMinute("2019-05-06T21:00:45.700Z");
const halfHour = 1800000;

const timeBlock = [];
let i = earlistTime;
for (i; i < latestTime; i += halfHour) {
  timeBlock.push(i);
}

let availTimes = timeBlock.filter(time => {
  if (!checkAlltimes(time, booked)) {
    return time;
  }
});
