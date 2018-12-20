import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Typography from '@material-ui/core/Typography/Typography';

import Waiting from './components/Waiting';
import Ready from './components/Ready';

import Participants from './components/Participants';

import {getGameReadyStatus} from '../../services';
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

class Race extends PureComponent {

  state = {
    currentState: RACE_STATES.WAITING,
    gameParticipants: [],
  };

  componentDidMount() {
    this.pollForReadiness();
  }

  pollForReadiness() {
    this.readinessInterval = setInterval(() => {
      getGameReadyStatus().then(({ gameParticipants, ready }) => {
        const nextState = { gameParticipants };
        if (ready) {
          nextState.currentState = RACE_STATES[this.state.currentState.next];
          clearInterval(this.readinessInterval);
        }
        this.setState(nextState);
      });
    }, 1000);
  }

  renderFooter() {
    return (
      <div className={this.props.classes.footer}>
        <Typography variant="overline">
          For True - press `T`
        </Typography>
        <Typography variant="overline" gutterBottom>
          For False - press `F`
        </Typography>
      </div>
    );
  }

  renderParticipants() {
    return (
      <div className={this.props.classes.participantsBar}>
        <Participants participants={this.state.gameParticipants}/>
      </div>
    );
  }

  renderAnswerInput(){}

  render() {
    const Component = RACE_STATE_TO_COMPONENT[this.state.currentState.value];
    return (
      <div className="pos-r full-height">
        <div className={cx(this.props.classes.component, 'center-x')}>
          <Component/>
          {this.renderAnswerInput()}
        </div>
        {this.renderParticipants()}
        {this.renderFooter()}
      </div>
    );
  }
}

Race.displayName = 'Race';
Race.propTypes = {};
Race.defaultProps = {};

export default withStyles(styles)(Race);
