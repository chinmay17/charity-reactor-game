import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LinearProgress from '@material-ui/core/LinearProgress';

import Waiting from './components/Waiting';
import Ready from './components/Ready';

import Participants from './components/Participants';
import Footer from './components/Footer';

import {withStyles} from '@material-ui/core/styles';

const RACE_STATES = {
  WAITING: { value: 'WAITING', next: 'READY' },
  READY: { value: 'READY', next: 'IN_PROGRESS' },
  IN_PROGRESS: { value: 'IN_PROGRESS', next: 'DONE' },
  DONE: { value: 'DONE' },
};

const RACE_STATE_TO_COMPONENT = {
  [RACE_STATES.WAITING.value]: Waiting,
  [RACE_STATES.READY.value]: Ready,
};

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 5,
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  participantsBar: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  component: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

const TIME_FOR_EACH_PAGE = 5 * 1000; //5seconds
const REFRESH_TIME = 500;
const PROGRESS_MAX = 100;
const STEP_SIZE = (PROGRESS_MAX / TIME_FOR_EACH_PAGE) * REFRESH_TIME;

class Race extends PureComponent {

  state = {
    currentState: RACE_STATES.WAITING,
    participants: [],
    timeElapsed: STEP_SIZE, //zero to 100
    showTimerProgressBar: false,
  };

  initializeProgressBar = () => {
    this.setState({ showTimerProgressBar: true });
    this.timer = setInterval(() => {
      const { timeElapsed } = this.state;
      if (timeElapsed === 100) {
        this.setState({ timeElapsed: STEP_SIZE });
      } else {
        this.setState({ timeElapsed: this.state.timeElapsed + STEP_SIZE });
      }
    }, REFRESH_TIME);
  };

  stopProgressBar = () => {
    clearInterval(this.timer);
    this.setState({ timeElapsed: 100 });
  };

  initNextState = () => {
    if (this.state.currentState.value === RACE_STATES.READY.value) {
      this.initializeProgressBar();
    } else if (this.state.currentState.value === RACE_STATES.DONE.value) {
      this.stopProgressBar();
    }
  };

  handleCurrentStateCompletion = () => {
    this.setState({
      currentState: RACE_STATES[this.state.currentState.next],
    }, this.initNextState);
  };

  handleParticipantsUpdate = participants => {
    this.setState({ participants });
  };

  renderAnswerInput() {
  }

  render() {
    const { props } = this;
    const Component = RACE_STATE_TO_COMPONENT[this.state.currentState.value];
    return (
      <div className={cx(props.className, props.classes.container)}>
        {this.state.showTimerProgressBar && <LinearProgress className={props.classes.progressBar} variant="determinate" value={this.state.timeElapsed}/> }
        <div className="pos-r full-height">
          <div className={cx(this.props.classes.component, 'center-x')}>
            <Component
              onCompletion={this.handleCurrentStateCompletion}
              onParticipantsUpdate={this.handleParticipantsUpdate}
            />
            {this.renderAnswerInput()}
          </div>
          <Participants
            className={this.props.classes.participantsBar}
            participants={this.state.participants}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

Race.displayName = 'Race';
Race.propTypes = {};
Race.defaultProps = {};

export default withStyles(styles)(Race);
