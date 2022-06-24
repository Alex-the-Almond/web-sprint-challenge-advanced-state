import * as actions from "./action-types";

export function moveClockwise() {
  return { type: actions.MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: actions.MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(questionNumber) {
  return { type: actions.SET_SELECTED_ANSWER, payload: questionNumber };
}

export function setMessage(message) {
  return { type: actions.SET_INFO_MESSAGE, payload: message };
}

export function setQuiz() {}

export function inputChange(newValue) {
  return { type: actions.INPUT_CHANGE, payload: newValue};
}

export function resetForm() {
  return { type: actions.RESET_FORM };
}


export function fetchQuiz() {
  return function (dispatch) {
    
   dispatch({
      type: actions.SET_QUIZ_INTO_STATE,
      payload: { quiz_id: null, question: null, answers: null },
    });
    fetch("http://localhost:9000/api/quiz/next")
      .then((response) => response.json())
      .then((quiz) => {
        dispatch({ type: actions.SET_QUIZ_INTO_STATE, payload: quiz });
      })
      .catch((err) => console.error(err));
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    fetch("http://localhost:9000/api/quiz/answer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quiz_id,
        answer_id,
      }),
    })
      .then((response) => response.json())
      .then((message) => {
        dispatch({ type: actions.SET_INFO_MESSAGE, payload: message });
        dispatch({ type: actions.SET_SELECTED_ANSWER, payload: null });
        dispatch({
          type: actions.SET_QUIZ_INTO_STATE,
          payload: {
            quiz_id: "",
            question: "",
            answers: "",
            selectedAnswer: "",
          },
        });
        fetch("http://localhost:9000/api/quiz/next")
          .then((response) => response.json())
          .then((quiz) => {
            dispatch({ type: actions.SET_QUIZ_INTO_STATE, payload: quiz });
          })
          .catch((err) => console.error(err));
      })

      .catch((err) => console.error(err));
    };
}
export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    fetch("http://localhost:9000/api/quiz/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_text,
        true_answer_text,
        false_answer_text
      }),
    })
      .then((response) => response.json())
      .then((message) => {
        dispatch({ type: actions.SET_INFO_MESSAGE, payload: {message: `Congrats: "${message.question}" is a great question!` }});
        dispatch({type: actions.RESET_FORM});
      
      })
  };
}
