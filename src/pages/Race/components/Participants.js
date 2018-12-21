import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
  },
  item: {
    backgroundColor: theme.palette.background.paper,
  },
});

function Participants(props) {
  const { classes } = props;

  return (
    <List dense className={cx(classes.root, props.className)} style={{ height: (props.participants.length * 56) + 8 }}>
      {props.participants.map(({ name, imgUrl }) => (
        <ListItem key={name} className={classes.item}>
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n°${name}`}
              src={imgUrl}
            />
          </ListItemAvatar>
          <ListItemText primary={name}/>
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
