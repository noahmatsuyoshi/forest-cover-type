import os
from flask import Flask
from flask.helpers import send_from_directory
import pandas as pd
from joblib import load
from flask.globals import request

def create_app():
    app = Flask(__name__, static_folder='build', static_url_path='/', instance_relative_config=True)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    feature_dict = {
        'Elevation': 0,
        'Aspect': 0,
        'Slope': 0,
        'Horizontal_Distance_To_Hydrology': 0,
        'Vertical_Distance_To_Hydrology': 0,
        'Horizontal_Distance_To_Roadways': 0,
        'Hillshade_9am': None,
        'Hillshade_Noon': None,
        'Hillshade_3pm': None,
        'Horizontal_Distance_To_Fire_Points': 0,
        'Wilderness_Area1': 0,
        'Wilderness_Area2': 0,
        'Wilderness_Area3': 0,
        'Wilderness_Area4': 0,
        'Soil_Type1': 0,
        'Soil_Type2': 0,
        'Soil_Type3': 0,
        'Soil_Type4': 0,
        'Soil_Type5': 0,
        'Soil_Type6': 0,
        'Soil_Type7': 0,
        'Soil_Type8': 0,
        'Soil_Type9': 0,
        'Soil_Type10': 0,
        'Soil_Type11': 0,
        'Soil_Type12': 0,
        'Soil_Type13': 0,
        'Soil_Type14': 0,
        'Soil_Type15': 0,
        'Soil_Type16': 0,
        'Soil_Type17': 0,
        'Soil_Type18': 0,
        'Soil_Type19': 0,
        'Soil_Type20': 0,
        'Soil_Type21': 0,
        'Soil_Type22': 0,
        'Soil_Type23': 0,
        'Soil_Type24': 0,
        'Soil_Type25': 0,
        'Soil_Type26': 0,
        'Soil_Type27': 0,
        'Soil_Type28': 0,
        'Soil_Type29': 0,
        'Soil_Type30': 0,
        'Soil_Type31': 0,
        'Soil_Type32': 0,
        'Soil_Type33': 0,
        'Soil_Type34': 0,
        'Soil_Type35': 0,
        'Soil_Type36': 0,
        'Soil_Type37': 0,
        'Soil_Type38': 0,
        'Soil_Type39': 0,
        'Soil_Type40': 0,
    }

    cover_types = [
        "Spruce/Fir",
        "Lodgepole Pine",
        "Ponderosa Pine",
        "Cottonwood/Willow",
        "Aspen",
        "Douglas-fir",
        "Krummholz",
    ]

    model = load('model_dump.joblib')

    @app.route("/api/predict", methods=['GET', 'POST'])
    def predict():
        """Use model to predict based on given features"""
        body_json = request.get_json()
        features = feature_dict.copy()
        features['Elevation'] = body_json['elevation']
        features['Aspect'] = body_json['aspect']
        features['Slope'] = body_json['slope']
        features['Horizontal_Distance_To_Hydrology'] = body_json['horHydro']
        features['Vertical_Distance_To_Hydrology'] = body_json['verHydro']
        features['Horizontal_Distance_To_Roadways'] = body_json['horRoad']
        features['Horizontal_Distance_To_Fire_Points'] = body_json['horFire']
        features[f"Wilderness_Area{body_json['wildernessArea']+1}"] = 1
        features[f"Soil_Type{body_json['soilType']+1}"] = 1
        X_new = pd.DataFrame(data=features, index=[0])
        return {'prediction': cover_types[model.predict(X_new)[0]]}

    @app.route('/')
    def index():
        return send_from_directory(app.static_folder, 'index.html')

    

    return app