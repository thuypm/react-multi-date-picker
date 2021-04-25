import React, { useState } from "react";
import { getValidProps } from "../utils";
import {
  IconLanguage,
  IconCalendarEvent,
  IconCircles,
  IconClock,
} from "@tabler/icons";
import "./settings.css";

export default function Settings({
  state,
  setState,
  position,
  setProps,
  calendars = ["gregorian", "persian", "arabic", "indian"],
  locales = ["en", "fa", "ar", "hi"],
  modes = ["single", "multiple", "range"],
  others = ["only month picker", "only year picker"],
  defaultActive = "",
  disabledList = [],
  defaultFormat = {},
  className = "",
  handlePropsChange,
  ...props
}) {
  const [section, setSection] = useState(defaultActive);
  const shortName = {
    "only month picker": "OM",
    "only year picker": "OY",
  };

  return (
    <div
      className={`settings ${position} ${className}`}
      {...getValidProps(props)}
    >
      {!disabledList.includes("calendar") && (
        <div
          title="Calendar"
          className={`setting ${section === "calendar" ? "active" : ""}`}
        >
          <IconCalendarEvent
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "calendar" ? "" : "calendar")}
          />
          <div className="items">
            {calendars.map((calendar, index) => {
              return (
                <span
                  key={index}
                  className={`item ${
                    state.date.calendar === calendar ? "active" : ""
                  }`}
                  title={calendar}
                  onClick={(e) => setKeyValue(e, "calendar")}
                >
                  {calendar.substring(0, 2).toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {!disabledList.includes("locale") && (
        <div
          title="Locale"
          className={`setting ${section === "locale" ? "active" : ""}`}
        >
          <IconLanguage
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "locale" ? "" : "locale")}
          />
          <div className="items">
            {locales.map((locale, index) => {
              return (
                <span
                  key={index}
                  className={`item ${
                    state.date.locale === locale ? "active" : ""
                  }`}
                  title={locale}
                  onClick={(e) => setKeyValue(e, "locale")}
                >
                  {locale.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {!disabledList.includes("mode") && (
        <div
          title="Mode"
          className={`setting ${section === "mode" ? "active" : ""}`}
        >
          <IconCircles
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "mode" ? "" : "mode")}
          />
          <div className="items">
            {modes.map((mode, index) => {
              return (
                <span
                  key={index}
                  className={`item ${
                    state[mode]
                      ? "active"
                      : !state.range && !state.multiple && mode === "single"
                      ? "active"
                      : ""
                  }`}
                  title={mode}
                  onClick={setMode}
                >
                  {mode.substring(0, 2).toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {!disabledList.includes("other") && (
        <div
          title="Other Pickers"
          className={`setting ${section === "others" ? "active" : ""}`}
        >
          <IconClock
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "others" ? "" : "others")}
          />
          <div className="items">
            <span
              className={`item ${
                !state.onlyMonthPicker && !state.onlyYearPicker ? "active" : ""
              }`}
              title="disable"
              onClick={setOtherPickers}
            >
              DI
            </span>
            {
              <>
                {others.map((title, index) => {
                  return (
                    <span
                      key={index}
                      className={`item ${
                        state[title.replace(/\s\w/g, (w) => w[1].toUpperCase())]
                          ? "active"
                          : ""
                      }`}
                      title={title}
                      onClick={setOtherPickers}
                    >
                      {shortName[title]}
                    </span>
                  );
                })}
              </>
            }
          </div>
        </div>
      )}
    </div>
  );

  function setKeyValue(e, key) {
    let value = e.target.title;

    if (state[key] === value) return;

    let $state = { ...state, date: state.date.set(key, value), [key]: value };

    notifyChange($state);
  }

  function setMode(e) {
    let mode = e.target.title,
      $state;

    switch (mode) {
      case "multiple":
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate)
            ? state.selectedDate
            : [state.selectedDate],
          multiple: true,
          range: false,
        };
        break;
      case "range":
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate)
            ? state.selectedDate
            : [state.selectedDate],
          multiple: false,
          range: true,
        };

        if ($state.selectedDate.length > 2) {
          $state.selectedDate = [
            $state.selectedDate[0],
            getLastItem($state.selectedDate),
          ];
        }
        break;
      default:
        //single
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate)
            ? getLastItem(state.selectedDate)
            : state.selectedDate,
          multiple: false,
          range: false,
        };
    }

    notifyChange($state);
  }

  function getLastItem(array) {
    return array[array.length - 1];
  }

  function setOtherPickers(e) {
    let title = e.target.title,
      $state;

    switch (title) {
      case "only month picker":
        $state = {
          ...state,
          onlyMonthPicker: true,
          onlyYearPicker: false,
          format: defaultFormat?.onlyMonthPicker || "MM/YYYY",
        };
        break;
      case "only year picker":
        $state = {
          ...state,
          onlyMonthPicker: false,
          onlyYearPicker: true,
          format: defaultFormat?.onlyYearPicker || "YYYY",
        };
        break;
      default:
        //disable
        $state = {
          ...state,
          onlyMonthPicker: false,
          onlyYearPicker: false,
          format: defaultFormat?.single || "YYYY/MM/DD",
        };
    }

    notifyChange($state);
  }

  function notifyChange($state) {
    if (setProps instanceof Function) {
      if ("_self" in React.createElement("div")) {
        console.warn(
          [
            "setProps is deprecated and will not available in the next versions.",
            "https://shahabyazdi.github.io/react-multi-date-picker/plugins/settings/",
          ].join("\n")
        );
      }

      setProps((props) => {
        return {
          ...props,
          ...$state,
          value: $state.selectedDate,
        };
      });
    }

    handlePropsChange($state);
  }
}
