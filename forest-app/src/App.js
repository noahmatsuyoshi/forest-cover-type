import Canvas from './components/Canvas';
import OptionsPanel from './components/OptionsPanel';
import React from 'react';
import './App.css';
import mapScaleImg from './images/map_scale.png';


function App() {
    const stateManager = new StateManager();
    const getPrediction = () => {
        console.log(stateManager.state);
        const features = getFeatures(stateManager.state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(features),
        };
        const response = fetch('/api/predict', requestOptions)
            .then(value => value.json());
        return response;
    }
    return (
        <div className="App">
            <div className="canvas-parent">
                <Canvas stateManager={stateManager}/>
                <img src={mapScaleImg} className="map-scale" />
            </div>
            <div className="options">
                <OptionsPanel stateManager={stateManager} getPrediction={getPrediction} />
            </div>
        </div>
    );
}

class StateManager {
    constructor() {
        this.state = {
            forest: {x: 0, y: 0},
            pond: {x: 0, y: 0},
            road: {x: 0, y: 0},
            fire: {x: 0, y: 0},
            elevation: 0,
            aspect: 0,
            slope: 0,
            wildernessArea: "",
            soilType: "",
            canvasSize: {h: 1000, w: 1000},
            canvasPos: {x: 0, y: 0},
        }
    }
    
    setState(state) {
        for (let k in state) {
            if(k in this.state) this.state[k] = state[k];
        }
    }
}

// Canvas width is 1000m
function getDistance(state, name, direction) {
    return Math.abs(state.forest[direction] - state[name][direction]) / 
        (direction === 'x' ? state.canvasSize.w : state.canvasSize.h) *
        (direction === 'x' ? 1000 : 1000 * (state.canvasSize.h / state.canvasSize.w));
}

function getFeatures(state) {
    const horHydro = getDistance(state, 'pond', 'x');
    const verHydro = getDistance(state, 'pond', 'y');
    const horRoad = getDistance(state, 'road', 'x');
    const horFire = getDistance(state, 'fire', 'x');
    return {
        elevation: state.elevation,
        aspect: state.aspect,
        slope: state.slope,
        horHydro: horHydro,
        verHydro: verHydro,
        horRoad: horRoad,
        horFire: horFire,
        wildernessArea: state.wildernessArea,
        soilType: state.soilType,
    }
}

export default App;
