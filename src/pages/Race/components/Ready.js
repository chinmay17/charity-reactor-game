import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

function Ready(props) {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Starting the game in ...
      </Typography>
    </div>
  );
}

Ready.displayName = 'Ready';
Ready.propTypes = {};
Ready.defaultProps = {};

export default Ready;
