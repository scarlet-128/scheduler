import React, {useEffect, useState}from 'react'
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay, } from "helpers/selectors";
export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days}));
  const setInterviewer = interviewer =>
		setState(prev => ({ ...prev, interviewer }));
    const setAppointment = appointment =>
		setState(prev => ({ ...prev, appointment }));
    getAppointmentsForDay(state, state.day);
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewersForDay(state, state.day);
  const GET_DAYS = axios.get("/api/days");
  const GET_APPOINTMENTS = axios.get("/api/appointments");
  const GET_INTERVIEWERS = axios.get("/api/interviewers"); 
//   useEffect(() => {
//     axios.get("/api/days").then(respose => {
//       console.log(respose.data)
//       setDays(respose.data)
//     })
// }, [])
useEffect(() => {
  Promise.all([GET_DAYS, GET_APPOINTMENTS, GET_INTERVIEWERS]).then((all) => {
    setState((prev) => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data,
    }));
  });
}, []);
  console.log(state.interviewers)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewers={interviewers}
      />
    )
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
