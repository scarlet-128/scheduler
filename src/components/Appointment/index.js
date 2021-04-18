import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"

export default function Appointment(props) {
  const interview = props.interview ? (
  <Show student={props.interview.student}
  interviewer={props.interview.interviewer}
  />) : (<Empty onClick={props.onAdd}/>)
  return <article className="appointment">
    <Header 
    id={props.id}
    time={props.time}
    className="appointment:last-of-type" />
    {interview}
  </article>;
}
