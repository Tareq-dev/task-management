import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between mb-2">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setCurrentDate(addDays(currentDate, -7))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span className="text-lg font-semibold text-gray-700">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setCurrentDate(addDays(currentDate, 7))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-gray-400 font-medium">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendarDays = () => {
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));
    const rows = [];
    let currentDay = startDate;

    while (currentDay <= endDate) {
      const isCurrentMonth = isSameMonth(currentDay, currentDate);
      const isTodayDate = isToday(currentDay);

      rows.push(
        <div
          key={currentDay.toISOString()}
          className={`text-center py-2 ${!isCurrentMonth && "text-gray-300"} ${
            isTodayDate &&
            "bg-orange-400 text-white font-semibold rounded-full flex justify-center items-center mt-1 h-8 w-8"
          } `}
        >
          {format(currentDay, "d")}
        </div>
      );

      currentDay = addDays(currentDay, 1);
    }

    return <div className="grid grid-cols-7 gap-1">{rows}</div>;
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCalendarDays()}
    </div>
  );
};

export default Calendar;
