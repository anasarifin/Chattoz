import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Maps = () => {
  const [maps2, setMaps] = useState([]);

  return (
    <>
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.4)" />
      <MapView
        initialRegion={{
          latitude: -6.391504,
          longitude: 106.82763,
          latitudeDelta: 0.05,
          longitudeDelta: 0.04,
        }}
        style={{height: '100%', width: '100%'}}
        onPress={e =>
          setMaps([...maps2, {coordinate: e.nativeEvent.coordinate}])
        }>
        {maps2.map((map, index) => {
          return (
            <Marker
              key={index}
              coordinate={map.coordinate}
              title={'Camp'}
              description={(index + 1).toString()}
            />
          );
        })}
      </MapView>
    </>
  );
};

export default Maps;
