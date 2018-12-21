import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {fetchGameLeaderBoard} from '../../../../services';
import {QUESTION_TYPES} from '../../../../constants';

import Question from './Question';
import AnswerInput from './AnswerInput';

import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
  disabledContainer: {
    cursor: 'not-allowed',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: .5,
  },
});

function useLeaderBoardFetch(currentIndex, onParticipantsUpdate) {
  useEffect(() => {
    fetchGameLeaderBoard().then(participants => {
      onParticipantsUpdate(participants);
    })
  }, [currentIndex]);
}

function Quiz(props) {
  const [currentIndex, updateCurrentIndex] = useState(0);
  const [disable, updateDisable] = useState(false);
  const startTime = useRef(0);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      updateCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
      updateDisable(false);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    startTime.current = performance.now();
  }, [currentIndex]);
  useLeaderBoardFetch(currentIndex, props.onParticipantsUpdate);

  const handleCorrectSubmission = qId => {
    const duration = performance.now() - startTime.current;
    console.log('Correct!!', qId, duration);
    updateDisable(true);
  };

  const handleIncorrectSubmission = qId => {
    console.log('----Incorrect----', qId);
    updateDisable(true);
  };

  let totalQuestions = props.gameResponse.questions.length;
  if (currentIndex >= totalQuestions) {
    props.onCompletion();
  }

  const question = props.gameResponse.questions[currentIndex];

  return (
    <div className={cx(props.className, { [props.classes.disabledContainer]: disable })}>
      <div className={cx({ [props.classes.disabled]: disable })}>
        <Question
          type={question.type}
          data={question.data}
          answer={question.answer}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
        />
        <AnswerInput
          question={question}
          onCorrect={handleCorrectSubmission}
          onIncorrect={handleIncorrectSubmission}
        />
      </div>
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

export default withStyles(styles)(Quiz);
