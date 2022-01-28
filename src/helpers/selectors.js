function getAppointmentsForDay(state, day) {


  const filteredAppointments = [];

  const filteredDay = state.days.find((weekday) => weekday.name === day); 

  console.log("check fileteredday", filteredDay);

  if (!filteredDay) {
    return [];
  }

  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; 
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
};


function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
};


function getInterviewersForDay(state, day) {


  const filteredInterviewers = [];

  const filteredDay = state.days.find((weekday) => weekday.name === day); 

  console.log("check fileteredday", filteredDay);

  if (!filteredDay) {
    return [];
  }

  filteredDay.interviewers.forEach((interviewer) => {
    
    const matchedInterviewer = state.interviewers[interviewer]; 
   
    if (matchedInterviewer) {
      filteredInterviewers.push(matchedInterviewer);
    }
  });

  return filteredInterviewers;
};


export { getAppointmentsForDay, getInterview, getInterviewersForDay };




