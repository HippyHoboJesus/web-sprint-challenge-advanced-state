import { MOVE_CLOCKWISE,
    MOVE_COUNTERCLOCKWISE,
    SET_QUIZ_INTO_STATE,
    SET_INFO_MESSAGE,
    SET_SELECTED_ANSWER,
    INPUT_CHANGE,
    RESET_FORM
     } from "./action-types"
import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return({type: MOVE_CLOCKWISE})
 }

export function moveCounterClockwise() {
  return({type:MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(id) {
  return({type:SET_SELECTED_ANSWER, payload: id})
 }

export function setMessage(message) {
  return({type:SET_INFO_MESSAGE, payload: message})
 }

export function setQuiz(quiz) {
  return({type:SET_QUIZ_INTO_STATE, payload: quiz})
 }

export function inputChange(input) {
  return({type:INPUT_CHANGE, payload: input})
 }

export function resetForm() {
  return({type:RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
        axios.get('http://localhost:9000/api/quiz/next')
          .then(res=>{
            dispatch(setQuiz(res.data))
          })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', {"quiz_id": quizId, "answer_id": answerId})
    .then(res => {
      dispatch(setMessage(res.data.message))
    })
    dispatch(selectAnswer(null))
    dispatch(fetchQuiz())
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(newQ, newT, newF) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { "question_text": newQ, "true_answer_text": newT, "false_answer_text": newF })
    .then(res => {
      dispatch(setMessage(res.statusText))
    })
    dispatch(resetForm())
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
