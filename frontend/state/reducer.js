// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, INPUT_CHANGE, RESET_FORM } from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case(MOVE_CLOCKWISE): {
      if(state >= 5) {
        return(
          0
        )
      }
        return(
          state + 1
        )
    }
    case(MOVE_COUNTERCLOCKWISE): {
      if(state <= 0) {
        return(
          5
        )
      }
        return(
          state - 1
        )
    }
    default:
            return(state)
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case(SET_QUIZ_INTO_STATE): {
        return(
          action.payload
        )
    }
    default:
      return(state)
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case(SET_SELECTED_ANSWER): {
      return(
        action.payload
      )
    }
    default:
      return(state)
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case(SET_INFO_MESSAGE): {
      return(
        action.payload
      )
    }
    default:
      return(state)
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case(INPUT_CHANGE): {
      if(action.payload.id === "newQuestion") {
        return {
          ...state,
          newQuestion: action.payload.text
        }
      } else if(action.payload.id === "newTrueAnswer") {
        return {
          ...state,
          newTrueAnswer: action.payload.text
        }
      } else if(action.payload.id === "newFalseAnswer") {
        return {
          ...state,
          newFalseAnswer: action.payload.text
        }
      }
      return
    }
    case(RESET_FORM): {
      return(
        initialFormState
      )
    }
    default:
      return(state)
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
