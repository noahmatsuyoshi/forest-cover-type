import React from 'react';
import forestImg from '../images/drag_forest.png';
import pondImg from '../images/drag_pond.png';
import roadImg from '../images/drag_road.png';
import fireImg from '../images/drag_fire.png';
import Draggable from './Draggable';

// classname, imgUrl
const dragElementProps = [
    ['forest', forestImg],
    ['pond', pondImg],
    ['road', roadImg],
    ['fire', fireImg],
];
  
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            canvasSize: {
                h: 1000,
                w: 1000
            },
            canvasPos: {
                x: 0,
                y: 0
            },
            dragElements: [],
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({}));
        this.forceUpdate();
    }

    getSizeState() {
        return ({
            canvasSize: {
                h: this.canvas.current.offsetHeight,
                w: this.canvas.current.offsetWidth
            },
            canvasPos: {
                x: this.canvas.current.offsetLeft,
                y: this.canvas.current.offsetTop
            }
        });
    }

    render() {
        const dragElements = [];
        if (this.canvas.current) {
            const state = this.getSizeState();
            this.props.stateManager.setState(state);
            dragElementProps.forEach((item, index) => {
                dragElements.push(
                    <Draggable
                        key={index}
                        name={item[0]}
                        className={item[0]}
                        imgUrl={item[1]}
                        zIndex={item[1]}
                        canvasPos={state.canvasPos}
                        canvasSize={state.canvasSize}
                        stateManager={this.props.stateManager}
                    />
                );
            });
        }
        return (
            <div className="canvas" ref={this.canvas}>
                {dragElements}
            </div>
        )
    }
}

export default Canvas;