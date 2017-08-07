import React, {Component} from 'react';
import {Layer, Rect, Stage} from 'react-konva';

const Keys = {
    left: false,
    right: false,
    up: false,
    down: false,
}

class MyRect extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            color: 'green',
            x: 700/2-25,
            y: 700/2-25,
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

        requestAnimationFrame(this.update);
    }

    shouldComponentUpdate(newState) {
        return this.state.x !== newState.x || this.state.y !== newState.y;
    }

    //TODO: handle speed for diagonal movement
    update = () => {
        if (Keys.up) {
            this.setState({y : this.state.y - 4})
        }
        else if (Keys.down) {
            this.setState({y : this.state.y + 4})
        }

        if (Keys.left) {
            this.setState({x : this.state.x - 4})
        }
        else if (Keys.right) {
            this.setState({x : this.state.x + 4})
        }

        requestAnimationFrame(this.update);
    };

    render() {
        return (
            <Rect
                x={this.state.x} y={this.state.y} width={50} height={50}
                fill={this.state.color}
                shadowBlur={1}
            />
        );
    }
}

class App extends Component {
    render() {
        return (
            <div style={{margin: '0 auto', width: 700, border: '1px solid black'}}>
                <Stage width={700} height={700}>
                    <Layer>
                        <MyRect/>
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default App;
