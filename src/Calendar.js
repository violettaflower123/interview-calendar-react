import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: normal;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;

const CalendarWrapper = styled.div`
  width: 740px;
  margin: 30px auto;

  @media screen and (max-width: 740px) {
    width: 100vw;
    margin: 10px auto;
  }
`;

const CalendarTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 30px;
`;

const CalendarAppButton = styled.button`
  margin-left: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 40px;
  color: #ff3131;
`;

const CalendarContainer = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  tbody {
    border-top: 20px solid transparent;
  }

  thead tr th,
  td {
    border: none;
  }

  th,
  td {
    border: 1px solid #e6e6e6;
    padding: 2px;
    text-align: center;
  }

  tr td:first-of-type {
    border: none;
    max-width: 40px;
    width: 40px;
    color: #c0c0c0;
    transform: translate(-2px, -24px);
  }

  tr td:nth-child(2) {
    border-left: none;
  }

  tr td:last-child {
    border-right: none;
  }

  tr:last-child td {
    border-bottom: none;
  }

  thead {
    background-color: #f6f6f6;
    border-top: 2px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }

  thead th {
    padding: 0;
  }

  .active {
    background-color: #ff3131;
    border-radius: 50%;
    color: white;
    margin: 0px auto;
    display: flex;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
  }

  .calendar-date-arrow {
    font-size: 30px;
    color: #ff3131;
    font-weight: 400;
  }
`;

const Slot = styled.div`
  height: 80px;
  position: relative;

  @media screen and (max-width: 740px) {
    height: 40px;
  }
`;

const SlotButton = styled.button`
  width: 95px;
  height: 100%;
  border: none;
  background-color: ${(props) => (props.isSelected ? "lightgray" : "white")};


  @media screen and (max-width: 740px) {
    width: 100%;
  }
`;

const Appointment = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Footer = styled.div`
  display: flex;
  align-items: self-end;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 10px;

  & h5 {
    color: #ff3131;
    font-size: 1.2em;
  }
`;

const AppDelete = styled.div`
  button {
    background: none;
    border: none;
    color: #ff3131;
    cursor: pointer;
    font-size: 1.2em;
  }
`;

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
    <>
      <GlobalStyle />
      <CalendarWrapper>
        <CalendarTitleWrapper>
          <h2>Interview Calendar</h2>
          <CalendarAppButton onClick={handleAddAppointment}>
            +
          </CalendarAppButton>
        </CalendarTitleWrapper>
        <CalendarContainer>
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
                  <th key={index} className={day === "28" ? "active" : ""}>
                    {day}
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                <th className="calendar-date-arrow">&#8249;</th>
                <th colSpan="5" className="calendar-date">
                  March 2019
                </th>
                <th className="calendar-date-arrow">&#8250;</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <tr key={index}>
                  <td>{time}</td>
                  {daysOfWeek.map((day, index) => (
                    <td key={index}>
                      <Slot>
                        {appointments[day] &&
                          appointments[day].map((appointment) => {
                            if (appointment.time === time) {
                              return (
                                <Appointment
                                  key={appointment.time}
                                  className="appointment"
                                >
                                  {appointment.eventText}
                                </Appointment>
                              );
                            } else {
                              return null;
                            }
                          })}
                        <SlotButton
                          onClick={() => handleSlotClick(day, time)}
                          isSelected={selectedSlot === `${day}_${time}`}
                        ></SlotButton>
                      </Slot>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Footer>
            <h5>Today</h5>
            {Object.keys(appointments).length > 0 && (
              <div className="appointment-container">
                {Object.keys(appointments).map((day) =>
                  appointments[day].map((appointment, index) => (
                    <AppDelete key={index}>
                      <button
                        onClick={() =>
                          handleDeleteAppointment(day, appointment.time)
                        }
                      >
                        Delete
                      </button>
                    </AppDelete>
                  ))
                )}
              </div>
            )}
          </Footer>
        </CalendarContainer>
      </CalendarWrapper>
    </>
  );
};

export default Calendar;
