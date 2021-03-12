# **Forest Cover Type Classification**
msds699 Machine Learning Lab Final Project
---
---
## Dataset
The dataset was downloaded from the UCI Machine Learning Repository. It contains data about forest areas within the Roosevelt National Forest of northern Colorado. The dataset has 581,012 rows and 54 columns. Here are the dataset columns with descriptions:
- Elevation / quantitative /meters / Elevation in meters
- Aspect / quantitative / azimuth / Aspect in degrees azimuth
- Slope / quantitative / degrees / Slope in degrees
- Horizontal_Distance_To_Hydrology / quantitative / meters / Horz Dist to nearest surface water features
- Vertical_Distance_To_Hydrology / quantitative / meters / Vert Dist to nearest surface water features
- Horizontal_Distance_To_Roadways / quantitative / meters / Horz Dist to nearest roadway
- Hillshade_9am / quantitative / 0 to 255 index / Hillshade index at 9am, summer solstice
- Hillshade_Noon / quantitative / 0 to 255 index / Hillshade index at noon, summer soltice
- Hillshade_3pm / quantitative / 0 to 255 index / Hillshade index at 3pm, summer solstice
- Horizontal_Distance_To_Fire_Points / quantitative / meters / Horz Dist to nearest wildfire ignition points
- Wilderness_Area (4 binary columns) / qualitative / 0 (absence) or 1 (presence) / Wilderness area designation
- Soil_Type (40 binary columns) / qualitative / 0 (absence) or 1 (presence) / - Soil Type designation
- Cover_Type (7 types) / integer / 1 to 7 / Forest Cover Type designation

## Goal
The goal of this project was to predict the Cover_Type based on all the other features. Therefore, this is a 7-class classification problem that can be solved with interpretable machine learning algorithms. Predicting cover type based on geological features is important because it can provide a suggestion of what tree species will thrive best given some environment. Examining the features' impacts on prediction can also show how each feature can influence the dominant tree speciies in a forest.

## Results
The best-performing model for this dataset was a random forest classifier with 300 trees, and no bagging or feature subset selection. This final model achieved a balanced accuracy score of 0.899 and an F1 score of 0.950 when evaluating the model on the test set. 

## Deploying in web app
After fitting the final model on all data, I deployed the model onto a web app that I built using React.js and Node.js. This web app allows the user to visually layout the geological features of a hypothetical forest, and input information about the forest in order to predict what the cover type of that forest is most likely to be. The source code for this web app is also included in the repo.