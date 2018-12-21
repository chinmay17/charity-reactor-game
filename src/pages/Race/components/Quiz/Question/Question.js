import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import {QUESTION_TYPES} from '../../../../../constants';

import ColorMatcher from './ColorMatcher';
import General from './General';

import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
  root: {
    userSelect: 'none',
  },
});

const QUESTION_TYPE_TO_COMPONENT = {
  [QUESTION_TYPES.COLOR_TO_COLOR_NAME]: ColorMatcher,
  [QUESTION_TYPES.GENERAL]: General,
};

function Question(props) {
  const Component = QUESTION_TYPE_TO_COMPONENT[props.type];
  return (
    <div className={props.classes.root}>
      <Typography variant="h4" gutterBottom>
        <span>Question </span>
        <span>{props.questionNumber}</span>
        <span>/</span>
        <span>{props.totalQuestions}</span>
      </Typography>
      <Component
        data={props.data}
      />
    </div>
  );
}

Question.displayName = 'Question';
Question.propTypes = {
  type: PropTypes.oneOf(Object.values(QUESTION_TYPES)).isRequired,
  answer: PropTypes.oneOf(['T', 'F']).isRequired,
  data: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};
Question.defaultProps = {};

export default withStyles(styles)(Question);
