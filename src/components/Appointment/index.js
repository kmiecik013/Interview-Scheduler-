import React, { Fragment } from 'react'
import "./styles.scss";
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETE = "DELETE";
  const CONFIRM_DELETE = "CONFIRM_DELETE"
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("look here", props.bookInterview())
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {

        transition(SHOW);

      })
  }

  function cancel() {

    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
    }
    function confirmDelete() {
      transition(CONFIRM_DELETE);
    }
  
    function edit() {
      transition(EDIT)
    }



    return (
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)} />}
        {mode === SHOW && (
          <Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={confirmDelete}
            onEdit={edit}

          />)}
        {mode === CREATE && (
          <Form
            onCancel={back}
            onSave={save}
            interviewers={props.interviewers}
          />)}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === DELETE && <Status message="DELETING" />}
        {mode === CONFIRM_DELETE && (
          <Confirm
            message="Biggest desicison ever!, Are you sure you want to delete?"
            onConfirm={cancel}
          />)}
        {mode === EDIT && (
          <Form 
            student = {props.interview.student}
            interviewers={props.interviewers}
            onSave={save}
            />)}

      </article>
    )
  }