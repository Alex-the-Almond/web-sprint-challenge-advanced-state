import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'

export function Form(props) {


  const onSubmit = e => {
    e.preventDefault();
    props.postQuiz(props.newQuestion, props.newTrueAnswer, props.newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.newQuestion} maxLength={50}
       onChange={ e => props.inputChange({...props, newQuestion: e.target.value}) } id="newQuestion" placeholder="Enter question" />
      <input value={props.newTrueAnswer} maxLength={50}
       onChange={ e => props.inputChange({...props, newTrueAnswer: e.target.value}) } id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.newFalseAnswer} maxLength={50}
       onChange={ e => props.inputChange({...props, newFalseAnswer: e.target.value}) } id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={ props.newQuestion.trim().length > 0 && props.newFalseAnswer.trim().length > 0 && props.newTrueAnswer.trim().length > 0 ? false : true} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => { 
  return {
  newQuestion: state.form.newQuestion,
  newTrueAnswer: state.form.newTrueAnswer,
  newFalseAnswer: state.form.newFalseAnswer
}
}
export default connect(mapStateToProps, {inputChange, postQuiz})(Form)