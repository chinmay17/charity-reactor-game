import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});

function Footer(props) {
  return (
    <div className={props.classes.container}>
      <Typography variant="overline">
        For True - press `T`
      </Typography>
      <Typography variant="overline" gutterBottom>
        For False - press `F`
      </Typography>
    </div>
  );
}

Footer.displayName = 'Footer';
Footer.propTypes = {};
Footer.defaultProps = {};

export default withStyles(styles)(Footer);
