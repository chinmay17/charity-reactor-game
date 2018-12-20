import React from 'react';
import PropTypes from 'prop-types';
import {QUESTION_TYPES} from '../../../../constants';

import Button from '@material-ui/core/Button';

function AnswerInput(props) {
  return (
    <div>
      <Button variant="contained" color="primary"
        onClick={() => props.question.answer === 'T' ? props.onCorrect(props.question.id) : props.onIncorrect(props.question.id)}>
        True(T)
      </Button>
      <Button variant="contained" color="secondary"
        onClick={() => props.question.answer === 'F' ? props.onCorrect(props.question.id) : props.onIncorrect(props.question.id)}>
        False(T)
      </Button>
    </div>
  );
}

AnswerInput.displayName = 'AnswerInput';
AnswerInput.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.oneOf(Object.values(QUESTION_TYPES)),
    answer: PropTypes.oneOf(['T', 'F']),
    data: PropTypes.object,
  }).isRequired,
  onCorrect: PropTypes.func.isRequired,
  onIncorrect: PropTypes.func.isRequired,
};
AnswerInput.defaultProps = {};

export default AnswerInput;
