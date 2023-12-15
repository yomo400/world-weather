"use client";

export default function TimeSet(unixTime) {
  if (unixTime !== undefined) {
    let localDatetime = [];
    for (let index = 0; index < unixTime.length - 1; index++) {
      let localUnixTime =
        unixTime[index] - 32400 + unixTime[unixTime.length - 1];
      let dateTime = new Date(localUnixTime * 1000);
      let date = dateTime.toLocaleDateString("ja-JP").slice(5);
      let localTime = dateTime.toLocaleTimeString("en-GB").slice(0, 5);
      let dailyDateTime = { day: date, time: localTime };
      localDatetime.push(dailyDateTime);
    }
    return localDatetime;
  }
}
