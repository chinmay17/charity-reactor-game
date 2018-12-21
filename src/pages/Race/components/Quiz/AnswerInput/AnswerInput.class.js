import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class AnswerInput extends PureComponent {
  constructor(props) {
    super(props);
    this.keyMap = {
      t: this.handleTrueButtonSubmit,
      f: this.handleFalseButtonSubmit,
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

  handleKey = ({ key }) => {
    if (this.keyMap[key]) {
      this.keyMap[key]();
    }
  };

  handleFalseButtonSubmit = () => {
    const { props } = this;
    props.question.answer === 'F' ? props.onCorrect(props.question.id) : props.onIncorrect(props.question.id)
  };

  handleTrueButtonSubmit = () => {
    const { props } = this;
    props.question.answer === 'T' ? props.onCorrect(props.question.id) : props.onIncorrect(props.question.id)
  };

  render() {
    const { props } = this;
    return (
      <div>
        <Button className={props.classes.button} variant="outlined" color="secondary"
          onClick={this.handleFalseButtonSubmit}>
          False(F)
        </Button>
        <Button className={props.classes.button} variant="outlined" color="primary"
          onClick={this.handleTrueButtonSubmit}>
          True(T)
        </Button>
      </div>
    );
  }
}

AnswerInput.displayName = 'AnswerInput.class';
AnswerInput.propTypes = {};
AnswerInput.defaultProps = {};

export default withStyles(styles)(AnswerInput);
