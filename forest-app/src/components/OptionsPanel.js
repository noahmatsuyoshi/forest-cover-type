import React from 'react';
import './OptionsPanel.css'

class OptionsPanel extends React.Component {
    constructor(props) {
        super(props);

        const soilTypeComps = [];
        soilTypeStrings.forEach((item, index) => {
            soilTypeComps.push(
                <option key={index} value={index}>{item}</option>
            )
        });

        const wildernessAreaComps = [];
        wildernessAreaStrings.forEach((item, index) => {
            wildernessAreaComps.push(
                <option key={index} value={index}>{item}</option>
            )
        });

        this.state = {
            elevation: 0,
            aspect: 0,
            slope: 0,
            wildernessArea: 0,
            soilType: 0,
            soilTypeComps: soilTypeComps,
            wildernessAreaComps: wildernessAreaComps,
            prediction: "",
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: parseInt(value)});
    }

    handleSubmit(event) {
        this.props.stateManager.setState(this.state);
        this.props.getPrediction().then(value => {
            console.log(value);
            this.setState({prediction: value['prediction']});
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <b className="title">Forest Cover Type Simulator</b>
                <br/>
                <br/>
                <b className="description">
                    The left figure shows symbols representing a forest, a water source, a roadway, and a wildfire ignition point.
                    Click and drag the elements change their distance from the forest. The predicted cover type of the forest 
                    depends on the distance between the forest and each of these elements. 
                    <br/>
                    The vertical axis represents altitude, and the horizontal axis represents horizontal position.
                    <br/>
                    The information entered below also affects the predicted cover type.
                </b>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Elevation (m) <br/>
                        <input name="elevation" type="text" 
                         value={this.state.elevation} 
                         onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Aspect (direction that slope faces in degrees azimuth) <br/>
                        <input name="aspect" type="text" 
                         value={this.state.aspect} 
                         onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Slope Steepness (degrees) <br/>
                        <input name="slope" type="text" 
                         value={this.state.slope} 
                         onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Soil Type <br/>
                        <select name="soilType" 
                         value={this.state.soilType} 
                         onChange={this.handleInputChange}>
                             {this.state.soilTypeComps}
                         </select>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Wilderness Area <br/>
                        <select name="wildernessArea"
                         value={this.state.wildernessArea} 
                         onChange={this.handleInputChange}>
                             {this.state.wildernessAreaComps}
                        </select>
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <input type="submit" value="Get Cover Type" />
                </form>
                <br/>
                <br/>
                <b className='prediction'>Predicted cover type: {this.state.prediction}</b>
            </div>
        )
    }
}

const soilTypeStrings = [
    "Cathedral family - Rock outcrop complex, extremely stony.",
    "Vanet - Ratake families complex, very stony.",
    "Haploborolis - Rock outcrop complex, rubbly.",
    "Ratake family - Rock outcrop complex, rubbly.",
    "Vanet family - Rock outcrop complex complex, rubbly.",
    "Vanet - Wetmore families - Rock outcrop complex, stony.",
    "Gothic family.",
    "Supervisor - Limber families complex.",
    "Troutville family, very stony.",
    "Bullwark - Catamount families - Rock outcrop complex, rubbly.",
    "Bullwark - Catamount families - Rock land complex, rubbly.",
    "Legault family - Rock land complex, stony.",
    "Catamount family - Rock land - Bullwark family complex, rubbly.",
    "Pachic Argiborolis - Aquolis complex.",
    "unspecified in the USFS Soil and ELU Survey.",
    "Cryaquolis - Cryoborolis complex.",
    "Gateview family - Cryaquolis complex.",
    "Rogert family, very stony.",
    "Typic Cryaquolis - Borohemists complex.",
    "Typic Cryaquepts - Typic Cryaquolls complex.",
    "Typic Cryaquolls - Leighcan family, till substratum complex.",
    "Leighcan family, till substratum, extremely bouldery.",
    "Leighcan family, till substratum - Typic Cryaquolls complex.",
    "Leighcan family, extremely stony.",
    "Leighcan family, warm, extremely stony.",
    "Granile - Catamount families complex, very stony.",
    "Leighcan family, warm - Rock outcrop complex, extremely stony.",
    "Leighcan family - Rock outcrop complex, extremely stony.",
    "Como - Legault families complex, extremely stony.",
    "Como family - Rock land - Legault family complex, extremely stony.",
    "Leighcan - Catamount families complex, extremely stony.",
    "Catamount family - Rock outcrop - Leighcan family complex, extremely stony.",
    "Leighcan - Catamount families - Rock outcrop complex, extremely stony.",
    "Cryorthents - Rock land complex, extremely stony.",
    "Cryumbrepts - Rock outcrop - Cryaquepts complex.",
    "Bross family - Rock land - Cryumbrepts complex, extremely stony.",
    "Rock outcrop - Cryumbrepts - Cryorthents complex, extremely stony.",
    "Leighcan - Moran families - Cryaquolls complex, extremely stony.",
    "Moran family - Cryorthents - Leighcan family complex, extremely stony.",
    "Moran family - Cryorthents - Rock land complex, extremely stony.",
];

const wildernessAreaStrings = [
    "Rawah Wilderness Area",
    "Neota Wilderness Area",
    "Comanche Peak Wilderness Area",
    "Cache la Poudre Wilderness Area",
];

export default OptionsPanel;