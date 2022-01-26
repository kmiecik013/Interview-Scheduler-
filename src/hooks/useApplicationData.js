import axios from "axios";
import React, { useEffect, useState } from "react";




export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
    cancelInterview: {cancelInterview},
  });

const setDay = (day) => setState({ ...state, day });

function bookInterview(id, interview) {
  console.log("bookinterview", id, interview);

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = copyDayState(state.days, appointments);

  return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then((response) => {
      console.log("check response", response);
     setState({...state, appointments, days});
    })
   }

   function cancelInterview(id) {


    const appointment = {
    ...state.appointments[id],
    interview: null, 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment 
    }

    const days = copyDayState(state.days, appointments);

    return axios 
    .delete(`http://localhost:8001/api/appointments/${id}`)
    .then (() => {
      setState({...state, appointments, days});
    })
   }

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

  function updateSpots(day, appointments) {
    let counter = 0
    day.appointments.forEach((id) => { 
      if (appointments[id].interview === null){
        counter++
      }
      
    })
   return counter; 
  }

  function copyDayState(days, appointments) {
      const dayArray = days.map((day) => {
        return {...day, spots:updateSpots(day,appointments)};
      })
      return dayArray
  }
  
  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview }

}