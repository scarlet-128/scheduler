import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";
import { suppressErrorOutput } from "@testing-library/react-hooks";
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const save = () => {

    if(name ==="") {
      setError("student name cannot be blank")
      return;
    }
    props.onSave(name, interviewer);
  };
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            id = 'student_name'
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {
              setName(event.target.value)
            }}
            value = { name }
              name = "name"
            data-testid="student-name-input"
          />
          {error && <output htmlFor="student_name">{error}</output>}
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
