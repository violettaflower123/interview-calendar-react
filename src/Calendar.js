import React, { useState } from "react";

const Calendar = () => {
  const daysOfWeek = ["25", "26", "27", "28", "29", "30", "31"];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState({});

  const handleSlotClick = (day, time) => {
    setSelectedSlot(`${day}_${time}`);
  };

  const handleAddAppointment = () => {
    if (selectedSlot) {
      const [day, time] = selectedSlot.split("_");
      const eventText = prompt("Enter event text:");
      if (eventText) {
        setAppointments((prevAppointments) => ({
          ...prevAppointments,
          [day]: prevAppointments[day]
            ? [...prevAppointments[day], { time, eventText }]
            : [{ time, eventText }],
        }));
        setSelectedSlot(null);
      }
    }
  };

  const handleDeleteAppointment = (day, time) => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };
      updatedAppointments[day] = updatedAppointments[day].filter(
        (appointment) => appointment.time !== time
      );
      return updatedAppointments;
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-title-wrapper">
        <h2>Interview Calendar</h2>
        <button className="calendar-app-btn" onClick={handleAddAppointment}>
          +
        </button>
      </div>
      <div className="calendar-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {days.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
            <tr>
              <th></th>
              {daysOfWeek.map((day, index) => (
                <th key={index}
                className={day === "28" ? "active" : ""}
                >{day}</th>
              ))}
            </tr>
            <tr>
              <th></th>
              <th className="calendar-date-arrow">&#8249;</th>
              <th colspan="5" className="calendar-date">
                March 2019</th>
              <th className="calendar-date-arrow">&#8250;</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <tr key={index}>
                <td>{time}</td>
                {daysOfWeek.map((day, index) => (
                  <td key={index}>
                    <div className="slot">
                      {appointments[day] &&
                        appointments[day].map((appointment) => {
                          if (appointment.time === time) {
                            return (
                              <div
                                key={appointment.time}
                                className="appointment"
                              >
                                {appointment.eventText}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      <button
                        onClick={() => handleSlotClick(day, time)}
                        className={`slot-button ${
                          selectedSlot === `${day}_${time}` ? "selected" : ""
                        } ${
                          appointments[day] &&
                          appointments[day].some((a) => a.time === time)
                            ? "busy"
                            : "free"
                        }`}
                      ></button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer">
          <h5>Today</h5>
          {Object.keys(appointments).length > 0 && (
            <div className="appointment-container">
              {Object.keys(appointments).map((day) =>
                appointments[day].map((appointment, index) => (
                  <div key={index} className="app-delete">
                    <button
                      onClick={() =>
                        handleDeleteAppointment(day, appointment.time)
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
