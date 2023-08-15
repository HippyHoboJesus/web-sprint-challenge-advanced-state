import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'


export function Form(props) {

  const {form, inputChange, postQuiz} = props

  const onChange = evt => {
    const id = evt.target.id
    inputChange({id: id, text: evt.target.value})
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form.newQuestion, form.newTrueAnswer, form.newFalseAnswer)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={form.newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={form.newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={(form.newQuestion.trim().length > 0 && form.newTrueAnswer.trim().length > 0 && form.newFalseAnswer.trim().length > 0) ? false : true}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return{
    form: state.form
  }
}

export default connect(mapStateToProps, {inputChange, postQuiz})(Form)
