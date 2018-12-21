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
      textColor: '#BBDEFB',
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
      textColor: '#9E9E9E',
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
      resolve({ questions: QUESTIONS });
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
      resolve(gameLeaderBoard);
    }, 400);
  });
}