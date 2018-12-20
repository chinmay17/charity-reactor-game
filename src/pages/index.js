import React from 'react';
import cx from 'classnames';
import LandingPage from './LandingPage';
import Race from './Race';
import withRoot from '../withRoot';

import './App.css';

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
    const className = cx('full-height');

    return (
      this.state.shouldRenderRace ?
        <Race className={className}/> :
        <LandingPage className={className} onSubmit={this.handleLandingPageSubmit}/>
    );
  }
}

export default withRoot(Index);
