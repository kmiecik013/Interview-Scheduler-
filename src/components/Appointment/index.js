import React, { Fragment } from 'react'
import "./styles.scss";
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETE = "DELETE";
  const CONFIRM_DELETE = "CONFIRM_DELETE"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
   
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
       })
      .catch(error => {
        transition(ERROR_SAVE, true)
      }) 
  };

  function cancel() {

    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))

    .catch(error => {
      transition(ERROR_DELETE, true)
    })
    };
    function confirmDelete() {
      transition(CONFIRM_DELETE);
    };
  
    function edit() {
      transition(EDIT)
    };

  
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
            message="Are you sure you want to delete?"
            onConfirm={cancel}
            onCancel= {back}
          />)}
        {mode === EDIT && (
          <Form 
            student = {props.interview.student}
            interviewers={props.interviewers}
            onSave={save}
            //onCancel={cancel}
            />)}
        {mode === ERROR_SAVE && (
          <Error 
          message= "Saving is not possible"
          onClose= {back}
            />)}
        {mode === ERROR_DELETE && (
          <Error 
          message="Delete is not possible" 
          onClose={back}
            />)}

      </article>
    )
  };