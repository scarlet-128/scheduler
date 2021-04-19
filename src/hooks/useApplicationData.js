import axios from "axios";
import React, { useState, useEffect } from "react";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });
	const GET_DAYS = axios.get("/api/days");
	const GET_APPOINTMENTS = axios.get("/api/appointments");
	const GET_INTERVIEWERS = axios.get("/api/interviewers");
  const updateSpots = (day, days, func) => {
		const dayObj = days.filter(a => a.name === day)[0];
		if (func === "book") dayObj.spots -= 1;
		if (func === "delete") dayObj.spots += 1;
	};

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

  const setDay = (day) => setState({ ...state, day });
	function bookInterview(id, interview) {
    console.log("id, interview: ", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then (() => {
      setState({
        ...state,
        appointments,
      });
      updateSpots(state.day, state.days, "book");
    })
    
    
    
  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
      });
      updateSpots(state.day, state.days, "delete");
    })
    
    
    
  };
  

	return { state, setDay, bookInterview, cancelInterview };
}
