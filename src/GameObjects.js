import React from 'react';
import {Rect} from 'react-konva';
import {cellSize} from './constants';

export const Enemy = ({x, y}) => (
    <Rect
        x={x} y={y} width={50} height={50}
        fill={'red'}
        shadowBlur={1}
    />
);

export const Player = ({x, y}) => (
    <Rect
        x={x} y={y} width={cellSize} height={cellSize}
        fill={'green'}
        shadowBlur={1}
    />
);