import axios from 'axios';
import update from 'immutability-helper';

const QUESTIONS = [
  {
    id: '1',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'black',
      textColor: '#00d2f9',
    },
    answer: 'F',
  },
  {
    id: '2',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'red',
      textColor: 'red',
    },
    answer: 'T',
  },
  {
    id: '3',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'blue',
      textColor: 'pink',
    },
    answer: 'F',
  },
  {
    id: '4',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'maroon',
      textColor: '#000',
    },
    answer: 'F',
  },
  {
    id: '5',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'pink',
      textColor: '#F06292',
    },
    answer: 'T',
  },
  {
    id: '6',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'purple',
      textColor: '#9C27B0',
    },
    answer: 'T',
  },
  {
    id: '7',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'teal',
      textColor: '#009688',
    },
    answer: 'T',
  },
  {
    id: '8',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'green',
      textColor: '#00AAFF',
    },
    answer: 'F',
  },
  {
    id: '9',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'brown',
      textColor: '#795548',
    },
    answer: 'T',
  },
  {
    id: '10',
    type: 'COLOR_TO_COLOR_NAME',
    data: {
      text: 'orange',
      textColor: '#FF5722',
    },
    answer: 'T',
  },
];

export function registerForGame(gameId, userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ questions: QUESTIONS.slice(5) });
    }, 1000);
  });

  return axios.post('/game/register', {
    gameId,
    userId,
  });
}

const NAMES = [
  'Vishwa',
  'Chicho',
  'Shree',
  'Anishetty',
  'Surabhi',
  'GK Soni',
  'Aneree',
  'Karan Vyas',
  'Archit',
  'Dhruv',
];

const PARTICIPANTS = NAMES.map(name => ({ name, score: 0 }));

let gameParticipants = [];
const MAX_GAME_PARTICIPANTS = PARTICIPANTS.length;
const MAX_ADDITION_AT_A_TIME = 3;

export function fetchGameReadyStatus(gameId) {
  return new Promise(resolve => {
    const participantsToAdd = Math.ceil(Math.random() * MAX_ADDITION_AT_A_TIME);
    const start = Math.max(gameParticipants.length, 0);
    const end = start + participantsToAdd;
    gameParticipants.push(...PARTICIPANTS.slice(start, end));

    if (gameParticipants.length >= MAX_GAME_PARTICIPANTS) {
      const response = {
        gameParticipants: [...gameParticipants],
        ready: true,
      };
      gameParticipants = [];
      resolve(response);
    }

    resolve({
      gameParticipants: [...gameParticipants],
      ready: false,
    });
  });
}

let gameLeaderBoard = PARTICIPANTS;

export function fetchGameLeaderBoard() {
  return new Promise(resolve => {
    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * MAX_GAME_PARTICIPANTS);
      gameLeaderBoard = update(gameLeaderBoard, {
        [winnerIndex]: {
          score: {
            $apply(score) {
              return score + 10;
            }
          },
        }
      });
      resolve(gameLeaderBoard.sort((p1, p2) => p1.score > p2.score ? -1 : 1));
    }, 400);
  });
}

export function fetchResults(gameId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const scoreSortedPlayers = gameLeaderBoard.sort((p1, p2) => p1.score > p2.score ? -1 : 1);
      const topScore = scoreSortedPlayers[0].score;
      const tieBetween = scoreSortedPlayers.filter(player => player.score === topScore);
      const response = {};
      if (tieBetween.length > 1) {
        response.tiedUsers = tieBetween;
        response.winner = tieBetween[Math.floor(Math.random() * (tieBetween.length - 1))]
      } else {
        response.winner = tieBetween[0];
      }
      resolve(response);
    }, 1000);
  });
}