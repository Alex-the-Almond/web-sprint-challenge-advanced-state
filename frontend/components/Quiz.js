import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {fetchQuiz, selectAnswer, postAnswer, setMessage} from '../state/action-creators';

const mapStateToProps = state => {
  console.log("In the map with ", state);
  return {
    quiz_id: state.quiz.quiz_id,
    question: state.quiz.question,
    answers: state.quiz.answers,
    selectedAnswer: state.selectedAnswer}

  
}

function Quiz(props) {

  useEffect(() => {
    if (!props.quiz_id) {
    props.fetchQuiz()}
  }, []);

  return (
    <div id="wrapper">
      {props.quiz_id
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
         ? (
          <>
            <h2>{props.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer === 0 ? 'selected' : ''}`}>
                {props.answers[0].text}
                <button onClick={() => props.selectAnswer(0)}>
                  {props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer === 1 ? 'selected' : ''}`}>
                {props.answers[1].text}
                <button onClick={() => props.selectAnswer(1)}>
                {props.selectedAnswer === 1 ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={props.selectedAnswer === 0 || props.selectedAnswer ? false : true}
            onClick={() => props.postAnswer(props.quiz_id, props.answers[props.selectedAnswer].answer_id)}>Submit answer</button>
          </>
        ) : `Loading next quiz ${props.quiz_id}`
      }
    </div>
  )
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer, setMessage})(Quiz);