import pandas as pd

def getDistance(x):
    return pd.DataFrame((
        x.loc[:,'Horizontal_Distance_To_Hydrology']**2 + 
        x.loc[:,'Vertical_Distance_To_Hydrology']**2
    )**0.5)

def passthrough(x):
    return x