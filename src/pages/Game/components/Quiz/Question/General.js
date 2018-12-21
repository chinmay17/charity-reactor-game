import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function General(props) {
  return (
    <Typography variant="subtitle1" gutterBottom>
      {props.data.text}
    </Typography>
  );
}

General.displayName = 'General';
General.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
  })
};
General.defaultProps = {};

export default General;
