import React from "react";
import DateObject from "react-date-object";
import getAllDatesInRange from "../../shared/getAllDatesInRange";
import isArray from "../../shared/isArray";
import getBorderClass from "../../shared/getBorderClass";
import getValidProps from "../../shared/getValidProps";
import getLocaleName from "../../shared/getLocaleName";
import "./date_panel.css";

export default function DatePanel({
  state,
  setState,
  position,
  nodes,
  handleChange,
  eachDaysInRange,
  sort,
  style = {},
  className = "",
  onClickDate,
  removeButton = true,
  header,
  markFocused,
  focusedClassName = "",
  handleFocusedDate,
  formatFunction,
  ...props
}) {
  let headers = { en: "Dates", fa: "تاریخ ها", ar: "تواریخ", hi: "खजूर" },
    dates = [],
    {
      multiple,
      range,
      rangeWithExclude,
      inRangeDates,
      selectedDate,
      date: { locale },
    } = state,
    classNames = ["rmdp-panel", position, getBorderClass(position, nodes)];

  locale = locale.name.split("_")[1];
  if (multiple || (range && !eachDaysInRange) || rangeWithExclude) {
    dates = (inRangeDates || selectedDate).map((date, index) => {
      return {
        date,
        format: date.format(),
        index,
      };
    });
  } else if (range && eachDaysInRange) {
    let allDates = getAllDatesInRange(inRangeDates || selectedDate);

    dates = allDates.map((date, index) => {
      return {
        //in range mode
        //To find out which date is between the start and end date
        //We change its value to undefined
        date: index === 0 || index === allDates.length - 1 ? date : undefined,
        format: date.format(),
        index,
      };
    });
  } else if (selectedDate && !isArray(selectedDate)) {
    dates = [
      {
        date: selectedDate,
        format: selectedDate.format(),
        index: 0,
      },
    ];
  }

  if (multiple && sort === "date") dates.sort((a, b) => a.date - b.date);

  if (
    multiple &&
    sort === "color" &&
    dates.every((object) => object.date.color)
  ) {
    dates.sort((a, b) => {
      if (a.date.color < b.date.color) return -1;
      if (a.date.color > b.date.color) return 1;

      return 0;
    });
  }

  if (["fa", "ar"].includes(getLocaleName(locale))) {
    classNames.push("rmdp-rtl");
  }

  return (
    <div
      className={`${classNames.join(" ")} ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        ...style,
      }}
      {...getValidProps(props)}
    >
      <div className="rmdp-panel-header">{header || headers[locale]}</div>
      <div
        style={{
          position: "relative",
          overflow: "auto",
          height: ["top", "bottom"].includes(position) ? "100px" : "",
        }}
      >
        <ul className="rmdp-panel-body">
          {isArray(dates) &&
            dates.map((object, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    object.date?.color ? `bg-${object.date.color}` : ""
                  } ${
                    markFocused &&
                    object.date?.valueOf?.() === state.focused?.valueOf?.()
                      ? focusedClassName || "rmdp-focused"
                      : ""
                  }`}
                  onClick={() =>
                    !removeButton && selectDate(object.date, object.index)
                  }
                >
                  <span
                    onClick={() =>
                      removeButton && selectDate(object.date, object.index)
                    }
                    style={{ cursor: object.date ? "pointer" : "default" }}
                  >
                    {formatFunction ? formatFunction(object) : object.format}
                  </span>
                  {object.date && removeButton && (
                    <button
                      type="button"
                      className="b-deselect"
                      onClick={() => deSelect(object.index)}
                    >
                      +
                    </button>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );

  function selectDate(date, index) {
    handleClick(date ? selectedDate[index] : undefined);
    if (!date) return;

    setState({
      ...state,
      date: new DateObject(date),
      focused: selectedDate[index],
    });

    handleFocusedDate(selectedDate[index]);
  }

  function deSelect(index) {
    let dates, focused;
    if (range || multiple || rangeWithExclude) {
      dates = selectedDate.filter((d, i) => i !== index);
      focused = dates.find((d) => d.valueOf() === state.focused?.valueOf?.());
    } else {
      dates = null;
      focused = undefined;
    }

    handleChange(dates, {
      ...state,
      selectedDate: dates,
      focused,
    });

    handleClick();
    handleFocusedDate(focused);
  }

  function handleClick(date) {
    if (onClickDate instanceof Function) onClickDate(date);
  }
}
