import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import {withStyles} from '@material-ui/core/styles';


import {isEmailIdValid} from '../helper';

import {registerForGame} from '../services';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class LandingPage extends React.PureComponent {
  state = {
    errorMessage: '',
    isLoggedIn: !!window.__ENV__,
    hideLoginButton: true,
    dialogOpen: false,
    isSubmitting: false,
  };

  componentDidMount() {
    if (window.__ENV__) {
      this.handlePostLogin();
    } else {
      window.onGoogleSignIn = this.handlePostLogin;
    }
    setTimeout(() => {
      if (!this.state.isLoggedIn) {
        this.setState({ hideLoginButton: false });
      }
    }, 1500);
  }

  handlePostLogin = () => {
    if (isEmailIdValid(window.__ENV__.emailId)) {
      this.setState({ isLoggedIn: true, errorMessage: '', hideLoginButton: true });
    } else {
      this.setState({ isLoggedIn: false, errorMessage: 'Sign in again via Sprinklr email!!', hideLoginButton: false });
    }
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleClick = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleSubmit = () => {
    this.setState({
      isSubmitting: true,
    });
    registerForGame()
      .then(() => {
        console.log(window.__ENV__);
        this.setState({
          dialogOpen: false,
          isSubmitting: false,
        });
        this.props.onSubmit();
      });
  };

  renderTermsAndConditions() {
    return (
      <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
        <DialogTitle>Spr Xmas Games TnC</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By entering you promise to pay ₹100 to Sprinklr Gurgaon
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleSubmit} disabled={this.state.isSubmitting}>
            {this.state.isSubmitting ? `Entering...` : `Enter`}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderTermsAndConditions()}
        <Typography variant="h4" gutterBottom>
          10 Player Reactor for X'mas@Sprinklr!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Entry fee ₹100
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Prize money ₹500
        </Typography>
        {!this.state.isLoggedIn && <div className="center-x">
          <div
            className={cx('g-signin2', { invisible: this.state.hideLoginButton })}
            data-onsuccess="onSignIn"
            data-theme="dark"
          >
          </div>
        </div>}
        {this.state.isLoggedIn && <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Enter Race
        </Button>}
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LandingPage);
