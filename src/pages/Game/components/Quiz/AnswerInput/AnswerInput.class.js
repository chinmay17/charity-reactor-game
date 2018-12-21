import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const SNACKBAR_ORIGIN = {
  vertical: 'bottom',
  horizontal: 'center',
};

class AnswerInput extends PureComponent {
  constructor(props) {
    super(props);
    this.keyMap = {
      t: this.handleTPress,
      f: this.handleFPress,
    };
    this.state = {
      openSnackbar: false,
      snackbarMessage: '',
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.props.question !== prevProps.question) {
      this.setState({ openSnackbar: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    })
  };

  handleKey = ({ key }) => {
    if (this.keyMap[key]) {
      this.keyMap[key]();
    }
  };

  handleTPress = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      openSnackbar: true,
      snackbarMessage: 'Submitting with `true`...'
    });
    this.handleTrueButtonSubmit();
  };

  handleFPress = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      openSnackbar: true,
      snackbarMessage: 'Submitting with `false`...'
    })
    this.handleFalseButtonSubmit();
  };

  handleFalseButtonSubmit = () => {
    const { props } = this;
    props.question.answer === 'F' ? props.onCorrect(props.question.id) : props.onIncorrect(props.question.id)
  };

  handleTrueButtonSubmit = () => {
    const { props } = this;
    props.question.answer === 'T' ? props.onCorrect(props.question.id) : props.onIncorrect(props.question.id)
  };

  renderSnackbar() {
    return ReactDOM.createPortal(
      <Snackbar
        autoHideDuration={2000}
        open={this.state.openSnackbar}
        onClose={this.handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.snackbarMessage}</span>}
      />,
      document.getElementById('snackbar')
    );
  }

  render() {
    const { props } = this;
    return (
      <div className="center-x">
        <div>
          <Button
            className={props.classes.button} variant="outlined" color="secondary"
            onClick={this.handleFalseButtonSubmit}>
            False
          </Button>
          <Typography variant="overline">
            Press `F`
          </Typography>
        </div>
        <div>
          <Button
            className={props.classes.button} variant="outlined" color="primary"
            onClick={this.handleTrueButtonSubmit}>
            True
          </Button>
          <Typography variant="overline">
            Press `T`
          </Typography>
        </div>
        {this.renderSnackbar()}
      </div>
    );
  }
}

AnswerInput.displayName = 'AnswerInput.class';
AnswerInput.propTypes = {
  disabled: PropTypes.bool,
};
AnswerInput.defaultProps = {};

export default withStyles(styles)(AnswerInput);
