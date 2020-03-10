import React, {useState, useEffect} from 'react';
import {StatusBar, Button, Text, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import app from '../configs/firebase';

// firebase.firestore.GeoPoint(latitude, longitude)

const Maps = () => {
  const [ready, setReady] = useState(false);
  const [maps2, setMaps] = useState([]);
  const [coordinate, setCoordinate] = useState({lat: 0, lng: 0});
  const [cont, setCont] = useState([]);
  const user = useSelector(state => state.user.user);

  const getLocation = async () => {
    app
      .firestore()
      .collection('users')
      .doc(await user.username)
      .collection('friends')
      .onSnapshot(async snapshot => {
        let final = [];
        await snapshot.forEach(doc => {
          if (doc) {
            final.push(doc.data().username);
          }
          // if (doc) {
          //   app
          //     .firestore()
          //     .collection('users')
          //     .doc(doc.data().username)
          //     .get()
          //     .then(doc2 => {
          //       setCont(...cont, doc2.data().location);
          //     });
          // }
        });
        let final2 = [];
        await final.forEach(x => {
          app
            .firestore()
            .collection('users')
            .doc(x)
            .get()
            .then(doc2 => {
              final2.push(doc2.data().location);
            });
        });
        setReady(true);
        setCont(final2);
        // Axios.post(url, {data: })
        //   .then(resolve => {
        //     console.log(resolve);
        //   })
        //   .catch(reject => console.log(reject));
      });
  };

  useEffect(() => {
    getLocation();
    // Geolocation.getCurrentPosition(
    //   position => {
    //     setCoordinate({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     });
    //     setReady(true);
    //   },
    //   error => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //   },
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );
  }, []);

  return (
    <>
      {ready ? (
        <>
          <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.4)" />
          <Button onPress={() => console.log(cont)} title="Check" />
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
