import React, {Component} from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import {Enemy, Player} from './GameObjects';
import {cellSize, boardSize, enemiesSpawnPerSecond, speed, enemySpeed} from './constants';
import {createEnemy, step} from './enemy';
import {rectOverlap} from './geometry';

const Keys = {
    left: false,
    right: false,
    up: false,
    down: false,
};

const screenRect = {x: 0, y: 0, width: boardSize, height: boardSize};

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            x: boardSize / 2 - cellSize / 2,
            y: boardSize / 2 - cellSize / 2,
            enemies: [],
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
        if (time - this.state.lastSpawn > 1000 / enemiesSpawnPerSecond) {
            const isOnScreen = enemy => rectOverlap(screenRect, {...enemy, width: cellSize, height: cellSize});
            const enemies = this.state.enemies.filter(isOnScreen);
            enemies.push(createEnemy());
            this.setState({
                lastSpawn: time,
                enemies,
            });
            console.log(this.state.enemies.length)
        }
    };

    //TODO: handle speed for diagonal movement
    update = () => {
        if (Keys.up) {
            this.setState({y: this.state.y - speed});
        }
        else if (Keys.down) {
            this.setState({y: this.state.y + speed});
        }

        if (Keys.left) {
            this.setState({x: this.state.x - speed});
        }
        else if (Keys.right) {
            this.setState({x: this.state.x + speed});
        }
        const newEnemies = this.state.enemies.map(step);
        this.setState({enemies: newEnemies});
        this.spawnEnemies();
        requestAnimationFrame(this.update);
    };

    render() {
        const {x, y, enemies} = this.state;
        return (
            <div style={{margin: '0 auto', width: boardSize, border: '1px solid black'}}>
                <Stage width={boardSize} height={boardSize}>
                    <Layer>
                        <Player x={x} y={y}/>
                        {enemies.map((enemy, i) =>
                            <Enemy key={i} x={enemy.x} y={enemy.y}/>,
                        )}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default App;

// spawn enemy at random directions
// spawn multiple enemies
// collision decetion
// randomize speed