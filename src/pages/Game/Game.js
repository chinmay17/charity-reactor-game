import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LinearProgress from '@material-ui/core/LinearProgress';

import Waiting from './components/Waiting';
import Ready from './components/Ready';
import Quiz from './components/Quiz';
import Results from './components/Results';

import Participants from './components/Participants';

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
  [RACE_STATES.IN_PROGRESS.value]: Quiz,
  [RACE_STATES.DONE.value]: Results,
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
    marginRight: theme.spacing.unit,
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

class Game extends PureComponent {

  state = {
    currentState: RACE_STATES.WAITING,
    participants: [],
    timeElapsed: 100 - STEP_SIZE, //zero to 100
    showTimerProgressBar: false,
  };

  initializeProgressBar = () => {
    this.setState({ showTimerProgressBar: true });
    this.timer = setInterval(() => {
      const { timeElapsed } = this.state;
      if (timeElapsed === 0) {
        this.setState({ timeElapsed: 100 - STEP_SIZE });
      } else {
        this.setState({ timeElapsed: this.state.timeElapsed - STEP_SIZE });
      }
    }, REFRESH_TIME);
  };

  stopProgressBar = () => {
    clearInterval(this.timer);
    this.setState({ timeElapsed: 0 });
  };

  initNextState = () => {
    if (this.state.currentState.value === RACE_STATES.IN_PROGRESS.value) {
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

  render() {
    const { props } = this;
    const Component = RACE_STATE_TO_COMPONENT[this.state.currentState.value];
    return (
      <div className={cx(props.className, props.classes.container)}>
        {this.state.showTimerProgressBar &&
        <LinearProgress className={props.classes.progressBar} variant="determinate" value={this.state.timeElapsed}/>}
        <div className="pos-r full-height">
          <div className={cx('flex-row-container')}>
            <Participants
              className={cx('flex-item-auto', this.props.classes.participantsBar)}
              participants={this.state.participants}
            />
            <div className="flex-item-1 center-x">
              <Component
                participants={this.state.participants}
                className={this.props.classes.component}
                gameResponse={props.gameResponse}
                onCompletion={this.handleCurrentStateCompletion}
                onParticipantsUpdate={this.handleParticipantsUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Game.displayName = 'Race';
Game.propTypes = {
  gameResponse: PropTypes.any,
};
Game.defaultProps = {};

export default withStyles(styles)(Game);
