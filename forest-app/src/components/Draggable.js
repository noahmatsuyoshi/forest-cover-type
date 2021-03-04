import React from 'react';
import './Draggable.css'

class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            pos: {x: props.x, y: props.y},
            dragging: false,
            zIndex: props.zIndex,
        }
    }

    componentDidMount() {
        const x = this.props.canvasPos.x + Math.random()*(this.props.canvasSize.w - this.ref.current.offsetWidth);
        const y = this.props.canvasPos.y + Math.random()*(this.props.canvasSize.h - this.ref.current.offsetHeight);
        this.setState({
            pos: {
                x: x,
                y: y
            }
        })
        this.props.stateManager.setState({[this.props.name]: {x: x, y: y}});
    }

    componentDidUpdate() {
        const pos = Object.assign({}, this.state.pos);
        if(pos.x < this.props.canvasPos.x) pos.x = this.props.canvasPos.x;
        else if(pos.x + this.ref.current.offsetWidth > this.props.canvasPos.x + this.props.canvasSize.w) 
            pos.x = this.props.canvasPos.x + this.props.canvasSize.w - this.ref.current.offsetWidth;
        if(pos.y < this.props.canvasPos.y) pos.y = this.props.canvasPos.y;
        else if(pos.y + this.ref.current.offsetHeight > this.props.canvasPos.y + this.props.canvasSize.h) 
            pos.y = this.props.canvasPos.y + this.props.canvasSize.h - this.ref.current.offsetHeight;
        if(pos.x !== this.state.pos.x || pos.y !== this.state.pos.y) this.setState({pos: pos});
    }

    beginDragging() {
        this.setState({
            dragging: true,
            zIndex: 4,
        });
    }

    endDragging() {
        this.props.stateManager.setState({[this.props.name]: this.state.pos});
        this.setState({
            dragging: false,
            zIndex: this.props.zIndex,
        });
    }

    onMouseDown(e) {
        this.beginDragging();
        this.setState({
            relPos: {
                x: e.clientX - this.state.pos.x, 
                y: e.clientY - this.state.pos.y
            },
        })
        e.preventDefault();
    }

    onMouseMove(e) {
        if(this.state.dragging) {
            if(
                e.clientX - this.state.relPos.x < this.props.canvasPos.x || 
                e.clientY - this.state.relPos.y < this.props.canvasPos.y ||
                e.clientX - this.state.relPos.x + this.ref.current.offsetWidth > this.props.canvasSize.w + this.props.canvasPos.x ||
                e.clientY - this.state.relPos.y + this.ref.current.offsetHeight > this.props.canvasSize.h + this.props.canvasPos.y
            ) {
                return;
            }
            this.setState({
                pos: {
                    x: e.clientX - this.state.relPos.x, 
                    y: e.clientY - this.state.relPos.y
                }
            })
        }
    }

    onMouseUp(e) {
        this.endDragging();
        e.preventDefault();
    }

    render() {
        return (
            <div 
             ref={this.ref}
             onMouseDown={this.onMouseDown.bind(this)}
             onMouseMove={this.onMouseMove.bind(this)}
             onMouseLeave={this.onMouseUp.bind(this)}
             onMouseUp={this.onMouseUp.bind(this)}
             style={{
                 position: "fixed",
                 left: this.state.pos.x,
                 top: this.state.pos.y,
                 zIndex: this.state.zIndex,
             }}
            >
                <img 
                 src={this.props.imgUrl} 
                 className={this.props.className}
                />
            </div>
        )
    }
}

export default Draggable;