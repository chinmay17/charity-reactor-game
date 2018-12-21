import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {fetchResults} from '../../../services';

function Results(props) {
  const [loading, setLoading] = useState(true);
  const [tiedMessage, setTiedMessage] = useState('');
  const [winnerMessage, setWinnerMessage] = useState('');
  useEffect(() => {
    fetchResults().then(({ tiedUsers, winner }) => {
      setLoading(false);
      if (tiedUsers) {
        setTiedMessage(`The score was tied between ${tiedUsers.map(user => user.name).join(',')}`);
        setWinnerMessage(`Based on the cumulative reaction time, the winner is ${winner.name}!!`);
      } else {
        setWinnerMessage(`Congratulations ${winner.name}!!`);
      }
    })
  }, []);
  return (
    <div className={props.className}>
      {loading && <div>
        <Typography variant="h4" gutterBottom color="primary">
          Please wait while we gather the results
        </Typography>
        <div className="center-x">
          <CircularProgress/>
        </div>
      </div>}
      {!loading && <>
        {tiedMessage && <Typography variant="h4" gutterBottom color="secondary">
          {tiedMessage}
        </Typography>
        }
        <Typography variant="h4" gutterBottom color="primary">
          {winnerMessage}
        </Typography>
        <Typography variant="h2" gutterBottom>
          🎊🎁
        </Typography>
      </>}
    </div>
  );
}

Results.displayName = 'Results';
Results.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
    name: PropTypes.string,
  }))
};
Results.defaultProps = {};

export default Results;
