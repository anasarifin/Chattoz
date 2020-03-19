import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  Button,
  Text,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import app from '../configs/firebase';

const imgUrl = 'http://100.24.32.116:9999/public/img/';

const MapsPage = () => {
  const [ready, setReady] = useState(false);
  const [maps, setMaps] = useState([]);
  const [coordinate, setCoordinate] = useState(false);
  const friend = useSelector(state => state.user.friend);
  const user = useSelector(state => state.user.user);

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
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        app
          .firestore()
          .collection('users')
          .doc(user.username)
          .update({
            location: new firebase.firestore.GeoPoint(
              position.coords.latitude,
              position.coords.longitude,
            ),
          })
          .then(resolve => console.log(resolve))
          .catch(reject => console.log(reject));
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
          <StatusBar backgroundColor="rgba(25,118,210,1)" />
          {/* <Button onPress={() => console.log(maps)} title="Check" /> */}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MapView
              initialRegion={{
                latitude: coordinate ? coordinate.latitude : 0,
                longitude: coordinate ? coordinate.longitude : 0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              zoomControlEnabled={true}
              showsMyLocationButton={true}
              showsUserLocation={true}
              showsCompass={true}
              style={{height: '100%', width: '100%'}}>
              {maps.map((map, index) => {
                console.log(map);
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: map.location.U || map.location.O,
                      longitude: map.location.k || map.location.F,
                    }}>
                    {map.image ? (
                      <Image
                        source={{uri: imgUrl + map.image}}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 40 / 2,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <></>
                    )}

                    <Callout>
                      <View style={{width: 100}}>
                        <Text>{map.name}</Text>
                      </View>
                    </Callout>
                  </Marker>
                );
              })}
            </MapView>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

export default MapsPage;
