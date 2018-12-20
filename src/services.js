import axios from 'axios';

export function registerForGame(gameId, userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  return axios.post('/game/register', {
    gameId,
    userId,
  });
}

const PARTICIPANTS = [
  {
    name: 'Vishwa',
  },
  {
    name: 'Chicho',
  },
  {
    name: 'Shree',
  },
  {
    name: 'Anishetty',
  },
  {
    name: 'Surabhi',
  },
  {
    name: 'GK Soni',
  },
  {
    name: 'Aneree',
  },
  {
    name: 'Karan Vyas',
  },
  {
    name: 'Archit',
  },
  {
    name: 'Dhruv',
  },
];

let gameParticipants = [];
const MAX_GAME_PARTICIPANTS = 10;
const MAX_ADDITION_AT_A_TIME = 3;

export function getGameReadyStatus(gameId) {
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