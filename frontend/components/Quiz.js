import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, selectedAnswer, postAnswer } = props;

  
  useEffect(() => {if(!quiz){fetchQuiz()}}, [])

  const handleClick = (id) => {
    selectAnswer(id)
  }

  const handleSubmit = () => {
    postAnswer(quiz.quiz_id, selectedAnswer)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id={quiz.quiz_id}>
              <div className={`answer${selectedAnswer === quiz.answers[0].answer_id ? ' selected' : ''}`}>
                {quiz.answers[0].text}
                <button onClick={() => handleClick(quiz.answers[0].answer_id)}>
                {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer${selectedAnswer === quiz.answers[1].answer_id ? ' selected' : ''}`} >
                {quiz.answers[1].text}
                <button onClick={() => handleClick(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn"  onClick={handleSubmit} disabled={selectedAnswer ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz);
