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
  },
  logo: {
    marginBottom: 24,
  },
  infoBlockContainer: {
    marginBottom: 60,
  },
  infoBlock: {
    backgroundColor: '#f7f8fd',
    padding: theme.spacing.unit,
  },
  infoBlock1: {
    marginRight: theme.spacing.unit,
  },
  errorMessage: {
    color: theme.palette.error.dark,
  }
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
      .then((response) => {
        console.log(window.__ENV__);
        this.setState({
          dialogOpen: false,
          isSubmitting: false,
        });
        this.props.onSubmit(response);
      });
  };

  renderTermsAndConditions() {
    return (
      <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
        <DialogTitle>Spr Xmas Games TnC</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
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
      <div className={cx('center-x-y', this.props.className, classes.root)}>
        {this.renderTermsAndConditions()}
        <div>
          <Typography className={cx(classes.logo)} variant="h4" gutterBottom>
            🎅
          </Typography>
          <Typography variant="h4" gutterBottom>
            Fastest Finger First
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            10 competitors * 10 Questions * Quickest One Wins
          </Typography>
          <div className={cx('center-x', classes.infoBlockContainer)}>
            <div className={cx(classes.infoBlock, classes.infoBlock1, 'flex-item-1')}>
              <Typography variant="subtitle2">
                💵 Entry Fees ₹100
              </Typography>
            </div>
            <div className={cx(classes.infoBlock, 'flex-item-1')}>
              <Typography variant="subtitle2">
                🏆 Prize money ₹500
              </Typography>
            </div>
          </div>
          {this.state.errorMessage && <Typography className={classes.errorMessage} variant="h6" gutterBottom>
            {this.state.errorMessage}
          </Typography>}
          {!this.state.isLoggedIn && <div className="center-x">
            <div
              className={cx('g-signin2', { invisible: this.state.hideLoginButton })}
              data-onsuccess="onSignIn"
              data-theme="dark"
            >
            </div>
          </div>}
          {this.state.isLoggedIn &&
          <Button className="full-width" variant="contained" color="primary" onClick={this.handleClick}>
            Enter Game
          </Button>}
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LandingPage);
