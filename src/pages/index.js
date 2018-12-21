import React from 'react';
import cx from 'classnames';
import LandingPage from './LandingPage';
import Game from './Game';
import withRoot from '../withRoot';
import Typography from '@material-ui/core/Typography';

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

  renderFooter() {
    return (
      <div className="footer center-x full-width">
        <div>
          <Typography variant="subtitle1" gutterBottom>
            <span>Created with ❤️ by </span>
            <a target="_blank" href="https://www.instagram.com/chicho.17/">chicho.17</a>
            <span>!</span>
          </Typography>
        </div>
      </div>
    );
  }

  render() {
    const className = cx('full-height');

    return (
      <>
        {
          this.state.shouldRenderRace ?
            <Game gameResponse={this.state.gameResponse} className={className}/> :
            <LandingPage className={className} onSubmit={this.handleLandingPageSubmit}/>
        }
        {this.renderFooter()}
      </>
    );
  }
}

export default withRoot(Index);
