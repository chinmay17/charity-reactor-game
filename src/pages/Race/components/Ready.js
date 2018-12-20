import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';

function Ready(props) {
  const [countDown, updateCountDown] = useState(100);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      updateCountDown(prevCountDown => prevCountDown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (countDown === 0) {
    clearInterval(timer);
    props.onCompletion();
  }

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        <span>Starting the game in </span>
        <span>{countDown}...</span>
      </Typography>
    </div>
  );
}

Ready.displayName = 'Ready';
Ready.propTypes = {};
Ready.defaultProps = {};

export default Ready;
