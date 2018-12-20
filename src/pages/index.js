import React from 'react';
import cx from 'classnames';
import LandingPage from './LandingPage';
import Race from './Race';
import withRoot from '../withRoot';
import {withStyles} from '@material-ui/core/styles';

import './App.css';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
  },
});

class Index extends React.PureComponent {

  state = {
    shouldRenderRace: false,
  };

  handleLandingPageSubmit = () => {
    this.setState({
      shouldRenderRace: true,
    });
  };

  render() {
    return (
      <div className={cx(this.props.classes.root, 'full-height')}>
        {this.state.shouldRenderRace ? <Race/> : <LandingPage onSubmit={this.handleLandingPageSubmit}/>}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
