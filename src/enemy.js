import {cellSize, enemySpeed, boardSize} from './constants';

// 0 - left to right
// 1 - right to left
// 2 - top to down
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const startingPosition = {
    0: () => ({
        x: -cellSize,
        y: Math.random() * (boardSize - cellSize),
    }),
    1: () => ({
        x: boardSize,
        y: Math.random() * (boardSize - cellSize),
    }),
    2: () => ({
        x: Math.random() * (boardSize - cellSize),
        y: -cellSize,
    }),
    3: () => ({
        x: Math.random() * (boardSize - cellSize),
        y: boardSize,
    }),
};

const shifts = {
    0: (enemy) => ({
        ...enemy,
        x: enemy.x + enemy.speed,
        y: enemy.y,
    }),
    1: (enemy) => ({
        ...enemy,
        x: enemy.x - enemy.speed,
        y: enemy.y,
    }),
    2: (enemy) => ({
        ...enemy,
        x: enemy.x,
        y: enemy.y + enemy.speed,
    }),
    3: (enemy) => ({
        ...enemy,
        x: enemy.x,
        y: enemy.y - enemy.speed,
    }),
};


export const createEnemy = () => {
    const enemyType = getRandomInt(0, 3);
    return ({
        ...startingPosition[enemyType](),
        enemyType,
        speed: getRandomArbitrary(0.2, 3),
    });
};

export const step = enemy => shifts[enemy.enemyType](enemy);
