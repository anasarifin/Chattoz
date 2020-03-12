import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  Button,
  Text,
  Image,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import app from '../configs/firebase';

// firebase.firestore.GeoPoint(latitude, longitude)

const MapsPage = () => {
  const [ready, setReady] = useState(false);
  const [maps, setMaps] = useState([]);
  const [name, setFinal] = useState(['steve', 'paul']);
  const [coordinate, setCoordinate] = useState({lat: 0, lng: 0});
  const friend = useSelector(state => state.user.friend);

  const getLocation = () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        let final = [];
        snapshot.forEach(doc => {
          if (friend && doc) {
            if (friend.includes(doc.data().username) && doc.data().location) {
              final.push(doc.data());
            }
          }
        });
        setMaps(final);
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCoordinate({
          latitude: 0,
          longitude: 0,
        });
        setReady(true);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        setReady(true);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    getLocation();
  }, []);

  return (
    <>
      {ready ? (
        <>
          <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.4)" />
          <Button onPress={() => console.log(maps)} title="Check" />
          <MapView
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 100,
              longitudeDelta: 100,
            }}
            zoomControlEnabled={true}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsCompass={true}
            style={{height: '100%', width: '100%'}}>
            {maps.map((map, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: map.location.O,
                    longitude: map.location.F,
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

export default MapsPage;
