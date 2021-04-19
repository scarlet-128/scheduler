export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filteredAppointment = state.days.filter((x) => x.name === day);
  // console.log(filteredAppointment)
  if (filteredAppointment.length === 0) {
    return [];
  }
  const appointmentsArr = filteredAppointment[0].appointments;
  // console.log("arr",appointmentsArr)
  const appointments = appointmentsArr.map((id) => state.appointments[id]);
  // console.log("appointment",appointments)
  return appointments;
}

export function getInterview(state, interview) {
	if (!interview) return null;

	const interviewObj = {
		student: interview.student,
	};

	interviewObj.interviewer = state.interviewers[interview.interviewer];
	return interviewObj;
}

export function getInterviewersForDay(state, day) {
	if (state.days.length === 0) return [];
	const dayObj = state.days.find(a => a.name === day);

	if (!dayObj) return [];

	const interviewersArray = dayObj.interviewers;
  console.log("int", dayObj.interviewers)
	const interviewers = interviewersArray.map(id => state.interviewers[id]);

	return interviewers;
}