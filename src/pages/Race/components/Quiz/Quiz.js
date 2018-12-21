import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {QUESTION_TYPES} from '../../../../constants';

import Question from './Question';
import AnswerInput from './AnswerInput';

function Quiz(props) {
  const [currentIndex, updateCurrentIndex] = useState(0);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      updateCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  let totalQuestions = props.gameResponse.questions.length;
  if (currentIndex >= totalQuestions) {
    props.onCompletion();
  }

  const question = props.gameResponse.questions[currentIndex];

  return (
    <div className={props.className}>
      <Question
        type={question.type}
        data={question.data}
        answer={question.answer}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
      />
      <AnswerInput
        question={question}
        onCorrect={qId => console.log('correct', qId)}
        onIncorrect={qId => console.log('incorrect', qId)}
      />
    </div>
  );
}

Quiz.displayName = 'Quiz';
Quiz.propTypes = {
  gameResponse: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(Object.values(QUESTION_TYPES)),
      answer: PropTypes.oneOf(['T', 'F']),
      data: PropTypes.object,
    })),
  }),
};
Quiz.defaultProps = {};

export default Quiz;
