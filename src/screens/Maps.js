import React, {useState} from 'react';
import {StatusBar, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';

const Maps = () => {
  const [maps2, setMaps] = useState([]);

  return (
    <>
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.4)" />
      <MapView
        region={{
          latitude: -6.391504,
          longitude: 106.82763,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        zoomControlEnabled={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
        style={{height: '100%', width: '100%'}}
        onPress={e =>
          setMaps([...maps2, {coordinate: e.nativeEvent.coordinate}])
        }>
        {maps2.map((map, index) => {
          return (
            <Marker key={index} coordinate={map.coordinate}>
              <Callout>
                <Text>xxx</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </>
  );
};

export default Maps;
