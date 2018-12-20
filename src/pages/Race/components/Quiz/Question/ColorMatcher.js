import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

function ColorMatcher(props) {
  return (
    <Typography variant="h2" style={{ color: props.data.textColor }} gutterBottom>
      {props.data.text}
    </Typography>
  );
}

ColorMatcher.displayName = 'ColorMatcher';
ColorMatcher.propTypes = {};
ColorMatcher.defaultProps = {};

export default ColorMatcher;
