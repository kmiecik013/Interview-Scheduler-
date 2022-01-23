import React, { useEffect, useState } from "react";
import DayList from "./DayList";

import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  console.log("checking state", state)

  const setDay = (day) => setState({ ...state, day });
  /*const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  }
*/
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day); 

  
  

  const schedule = appointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      interviewer={interviewers}
    />
    );
  });

  useEffect(() => {
    const grabDays = `http://localhost:8001/api/days`
    const grabAppointments = `http://localhost:8001/api/appointments`
    const grabInterviewers = `http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(grabDays),
      axios.get(grabAppointments),
      axios.get(grabInterviewers)

    ]).then((all) => {

      setState(prev =>
      ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  },[]);


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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
