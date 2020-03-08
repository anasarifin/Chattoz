import React, {useState, useEffect} from 'react';
import {StatusBar, Text, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Maps = () => {
  const [ready, setReady] = useState(false);
  const [maps2, setMaps] = useState([]);
  const [coordinate, setCoordinate] = useState({lat: 0, lng: 0});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCoordinate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setReady(true);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <>
      {ready ? (
        <>
          <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.4)" />
          <MapView
            initialRegion={{
              latitude: coordinate.lat,
              longitude: coordinate.lng,
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
                <Marker
                  key={index}
                  coordinate={map.coordinate}
                  image={{
                    uri:
                      'https://s.kaskus.id/c320x320/user/avatar/2011/05/09/avatar2921735_40.gif',
                  }}
                  style={{width: 10, height: 10}}>
                  <Callout>
                    <Text>xxx</Text>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default Maps;
