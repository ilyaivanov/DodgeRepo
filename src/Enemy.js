import React, {Component} from 'react';
import {Layer, Rect, Stage} from 'react-konva';


export default ({x,y}) => (
    <Rect
        x={x} y={y} width={50} height={50}
        fill={'red'}
        shadowBlur={1}
    />
);