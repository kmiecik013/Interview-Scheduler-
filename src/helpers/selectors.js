function getAppointmentsForDay(state, day) {


  const filteredAppointments = [];

  const filteredDay = state.days.filter((weekday) => weekday.name === day)[0]; // {} | undefined


  if (!filteredDay) {
    return [];
  }

  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
}


function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
};


function getInterviewersForDay(state, day) {

const appointments = getAppointmentsForDay(state, day) 

const appointmentWithInterviews = appointments.filter((appointment) => appointment.interview)

const interviewers = appointmentWithInterviews.map((appointment) => {
  
  const interviewerID = appointment.interview.interviewer 
  
  return state.interviewers[interviewerID]


  
})
console.log(interviewers);
//console.log("check appointment", appointments);
//console.log("test array", appointmentWithInterviews);

return interviewers;


}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };




