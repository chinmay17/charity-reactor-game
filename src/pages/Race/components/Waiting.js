import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

function Waiting(props) {
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
Waiting.propTypes = {};
Waiting.defaultProps = {};

export default Waiting;
