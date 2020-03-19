import React, {useState, useEffect} from 'react';
import {StatusBar, Button, Text, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import app from '../configs/firebase';

// firebase.firestore.GeoPoint(latitude, longitude)

const Maps = props => {
  const [ready, setReady] = useState(true);
  const [maps2, setMaps] = useState([]);
  const [coordinate, setCoordinate] = useState({lat: 0, lng: 0});
  const [myLoc, setMyLoc] = useState({});
  const [container, setContainer] = useState([]);
  const user = useSelector(state => state.user.user);

  const getLocation = () => {
    app
      .firestore()
      .collection('users')
      .doc(user.username)
      .collection('friends')
      .get()
      .then(snapshot => {
        let final = [];
        snapshot.forEach(doc => {
          if (doc) {
            final.push(doc.data().username);
          }
        });
        let final2 = [];
        final.forEach(x => {
          app
            .firestore()
            .collection('users')
            .doc(x)
            .get()
            .then(doc2 => {
              final2.push({
                latitude: doc2.data().location.O,
                longitude: doc2.data().location.F,
              });
            });
        });
        setMaps(final2);
      });
  };

  useEffect(() => {
    console.log(props.route.params.data);
  }, []);

  return (
    <>
      {ready ? (
        <>
          <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.4)" />
          <Button onPress={() => console.log(maps2)} title="Check" />
          <MapView
            initialRegion={{
              latitude: props.route.params.data.latitude,
              longitude: props.route.params.data.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            zoomControlEnabled={true}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsCompass={true}
            style={{height: '100%', width: '100%'}}>
            {[props.route.params.data, ...maps2].map((map, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={map}
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
