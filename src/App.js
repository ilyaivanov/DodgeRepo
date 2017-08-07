import React, {Component} from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import Enemy from './Enemy';

const Keys = {
    left: false,
    right: false,
    up: false,
    down: false,
};
const height = 700;
const cellSize = 50;
const enevmiesSpawnPerSecond = 0.5;
const Player = ({x, y}) => (
    <Rect
        x={x} y={y} width={cellSize} height={cellSize}
        fill={'green'}
        shadowBlur={1}
    />
);
const createEnemy = () => ({
    x: -cellSize,
    y: Math.random() * (height - cellSize)
});

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            x: height / 2 - cellSize / 2,
            y: height / 2 - cellSize / 2,
            enemies: [
                createEnemy(),
                createEnemy(),
            ]
        };
    }

    componentDidMount() {
        window.onkeydown = function (e) {
            var kc = e.keyCode;
            e.preventDefault();

            if (kc === 37) Keys.left = true;
            else if (kc === 38) Keys.up = true;
            else if (kc === 39) Keys.right = true;
            else if (kc === 40) Keys.down = true;
        };

        window.onkeyup = function (e) {
            var kc = e.keyCode;
            e.preventDefault();

            if (kc === 37) Keys.left = false;
            else if (kc === 38) Keys.up = false;
            else if (kc === 39) Keys.right = false;
            else if (kc === 40) Keys.down = false;
        };
        const lastSpawn = new Date().getTime();
        this.setState({lastSpawn});
        requestAnimationFrame(this.update);
    }

    spawnEnemies = () => {
        const time = new Date().getTime();
        if (time - this.state.lastSpawn > 1000 / enevmiesSpawnPerSecond) {
            const enemies = this.state.enemies;
            enemies.push(createEnemy());
            this.setState({
                lastSpawn: time,
                enemies,
            });
        }
    };
    //TODO: handle speed for diagonal movement
    update = () => {
        if (Keys.up) {
            this.setState({y: this.state.y - 4})
        }
        else if (Keys.down) {
            this.setState({y: this.state.y + 4})
        }

        if (Keys.left) {
            this.setState({x: this.state.x - 4})
        }
        else if (Keys.right) {
            this.setState({x: this.state.x + 4})
        }
        const newEnemies = this.state.enemies.map(enemy => ({
            x: enemy.x + 0.5, y: enemy.y
        }));
        this.setState({enemies: newEnemies});
        this.spawnEnemies();
        requestAnimationFrame(this.update);
    };

    render() {
        return (
            <div style={{margin: '0 auto', width: height, border: '1px solid black'}}>
                <Stage width={height} height={height}>
                    <Layer>
                        <Player x={this.state.x} y={this.state.y}/>
                        {this.state.enemies.map((enemy, i) =>
                            <Enemy key={i} x={enemy.x} y={enemy.y}/>
                        )}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default App;
