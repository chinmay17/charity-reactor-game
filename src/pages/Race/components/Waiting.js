import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getGameReadyStatus} from '../../../services';

function Waiting(props) {
  useEffect(() => {
    const readinessInterval = setInterval(() => {
      getGameReadyStatus().then(({ gameParticipants, ready }) => {
        props.onParticipantsUpdate(gameParticipants);
        if (ready) {
          clearInterval(readinessInterval);
          props.onCompletion();
        }
      });
    }, 1000);
  }, []);

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Please wait while we gather other enthusiasts
      </Typography>
      <div className="center-x">
        <CircularProgress/>
      </div>
    </div>
  );
}

Waiting.displayName = 'Waiting';
Waiting.propTypes = {
  onCompletion: PropTypes.func.isRequired,
  onParticipantsUpdate: PropTypes.func.isRequired,
};
Waiting.defaultProps = {};

export default Waiting;
