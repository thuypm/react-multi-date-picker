import isSameDate from "./isSameDate";
import DateObject from "react-date-object";

export default function selectDate(
  date,
  sort,
  {
    multiple,
    range,
    rangeWithExclude,
    selectedDate,
    onlyMonthPicker,
    onlyYearPicker,
    format,
    focused: previousFocused,
    weekPicker,
  }
) {
  date.setFormat(format);

  let focused = new DateObject(date);
  if (multiple) {
    selectedDate = selectMultiple();
  } else if (range) {
    selectedDate = selectRange();
  } else if (rangeWithExclude) {
    selectedDate = selectRangeWithExclude();
  } else {
    selectedDate = focused;
  }

  return [selectedDate, focused];

  function selectMultiple() {
    let dates = selectedDate.filter(
      ($date) => !isSameDate(date, $date, onlyMonthPicker, onlyYearPicker)
    );

    if (dates.length === selectedDate.length) {
      dates.push(focused);
    } else {
      focused = dates.find((d) => isSameDate(d, previousFocused));
    }

    if (sort) dates.sort((a, b) => a - b);

    return dates;
  }
  function selectRangeWithExclude() {
    if (selectedDate.length === 1) {
      const listStartEnd = [...selectedDate, focused].sort((a, b) => a - b);
      let listDays = [];
      const day = new Date(listStartEnd[0].toDate().getTime());
      const endDate = new Date(listStartEnd[1].toDate().getTime());
      while (day <= endDate) {
        listDays.push(new DateObject(day));
        day.setDate(day.getDate() + 1);
      }
      return listDays;
    } else return [focused];
  }

  function selectRange() {
    if (weekPicker)
      return [
        new DateObject(focused).toFirstOfWeek(),
        new DateObject(focused).toLastOfWeek(),
      ];
    if (selectedDate.length === 2 || selectedDate.length === 0)
      return [focused];
    if (selectedDate.length === 1)
      return [selectedDate[0], focused].sort((a, b) => a - b);
  }
}
