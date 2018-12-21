import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: 360,
    transition: 'all .2s',
    backgroundColor: theme.palette.primary.main,
  },
  item: {
    color: theme.palette.primary.contrastText,
  }
});

function Participants(props) {
  const { classes } = props;

  let size = props.participants.length;
  return (
    <List dense className={cx(classes.root, props.className)} style={{ height: (size * 56) + (size ? 8 : 0) }}>
      {props.participants.map(({ name, emailId, imgUrl, score }) => (
        <ListItem key={name} className={classes.item} selected={emailId === window.__ENV__.emailId}>
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n°${name}`}
              src={imgUrl}
            />
          </ListItemAvatar>
          <ListItemText primary={name} primaryTypographyProps={{ color: 'textSecondary' }}/>
          <Typography variant="h6" color="textSecondary">
            {score}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

Participants.displayName = 'Participants';
Participants.propTypes = {
  participants: PropTypes.array,
};
Participants.defaultProps = {};

export default withStyles(styles)(Participants);
