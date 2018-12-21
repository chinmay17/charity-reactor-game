import React from 'react';
import cx from 'classnames';
import LandingPage from './LandingPage';
import Game from './Game';
import withRoot from '../withRoot';

import './App.css';

class Index extends React.PureComponent {

  state = {
    shouldRenderRace: false,
    gameResponse: null,
  };

  handleLandingPageSubmit = (gameResponse) => {
    this.setState({
      shouldRenderRace: true,
      gameResponse,
    });
  };

  render() {
    const className = cx('full-height');

    return (
      this.state.shouldRenderRace ?
        <Game gameResponse={this.state.gameResponse} className={className}/> :
        <LandingPage className={className} onSubmit={this.handleLandingPageSubmit}/>
    );
  }
}

export default withRoot(Index);
