import {cellSize, enemySpeed, height} from './constants';

// 0 - left to right
// 1 - right to left
// 2 - top to down
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const startingPosition = {
    0: () => ({
        x: -cellSize,
        y: Math.random() * (height - cellSize),
    }),
    1: () => ({
        x: height,
        y: Math.random() * (height - cellSize),
    }),
    2: () => ({
        x: Math.random() * (height - cellSize),
        y: -cellSize,
    }),
    3: () => ({
        x: Math.random() * (height - cellSize),
        y: height,
    })
};

const shifts = {
    0: (enemy) => ({
        ...enemy,
        x: enemy.x + enemySpeed,
        y: enemy.y,
    }),
    1: (enemy) => ({
        ...enemy,
        x: enemy.x - enemySpeed,
        y: enemy.y,
    }),
    2: (enemy) => ({
        ...enemy,
        x: enemy.x,
        y: enemy.y + enemySpeed,
    }),
    3: (enemy) => ({
        ...enemy,
        x: enemy.x,
        y: enemy.y - enemySpeed,
    })
};


export const createEnemy = () => {
    const enemyType = getRandomInt(0, 3);
    return ({
        ...startingPosition[enemyType](),
        enemyType,
    });
};

export const step = enemy => shifts[enemy.enemyType](enemy);
