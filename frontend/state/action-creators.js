// ❗ You don't need to add extra action creators to achieve MVP
import * as actions from './action-types'

export function moveClockwise() { 
  return {type: actions.MOVE_CLOCKWISE};
}

export function moveCounterClockwise() {
  return {type: actions.MOVE_COUNTERCLOCKWISE}
 }

export function selectAnswer(questionNumber) {
  return {type: actions.SET_SELECTED_ANSWER, payload: questionNumber }
 }

export function setMessage(message) {
  return {type: actions.SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
