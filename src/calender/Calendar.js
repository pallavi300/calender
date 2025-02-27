import React, { useEffect, useState } from "react";
import moment from "moment";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = currentDate.clone().startOf("months");
  const endOfMonth = currentDate.clone().endOf("month");
  const startDay = startOfMonth.isoWeekday();
  const daysInMonth = endOfMonth.date();
  const today = moment();

  const [note, setNote] = useState("");
  const [noteData, setNoteData] = useState([]);

  const prevMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.clone().add(1, "month"));

  const handleDateClick = (day) => {
    setSelectedDate(currentDate.clone().date(day));
  };

  const handleChange = (e) => {
    setNote(e.target.value || "");
    console.log(e.target.value, "note");
  };

  const handleSaveNote = (e) => {
    if (note.trim()) {
      setNoteData([...noteData, note]);
      setNote("");
      console.log(noteData, "sdfghjk");
    }
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteData));
  }, [noteData]);

  const renderDays = () => {
    const days = [];

    for (let i = 1; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.isSame(currentDate.clone().date(day), "day");
      const isSelected =
        selectedDate &&
        selectedDate.isSame(currentDate.clone().date(day), "day");
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };
  return (
    <div className="calendar-main">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt; Prev</button>
          <h2>{currentDate.format("DD-MM-YYYY ")}</h2>
          <button onClick={nextMonth}>Next &gt;</button>
        </div>
        <div className="calendar-grid">
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
            <div key={day} className="calendar-day header">
              {day}
            </div>
          ))}
          {renderDays()}
        </div>

        <div className="days">
          {selectedDate && (
            <div className="selected-date">
              <div className="seleted-date-show">
                Select date : {selectedDate.format("DD-MM-YYYY")}
              </div>
              <input
                type="text"
                name="todo"
                onChange={handleChange}
                placeholder="write your note...."
              />

              <button type="submit" onClick={handleSaveNote}>
                Save
              </button>

              {noteData?.map((data, index) => (
                <li>{data}</li>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
