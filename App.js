import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [maps, setMaps] = useState([]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>wew</Text>
        <MapView
          initialRegion={{
            latitude: -6.391504,
            longitude: 106.82763,
            latitudeDelta: 0.05,
            longitudeDelta: 0.04,
          }}
          style={{height: '75%', width: '100%'}}
          onPress={e =>
            setMaps([...maps, {coordinate: e.nativeEvent.coordinate}])
          }>
          {maps.map((map, index) => {
            return (
              <Marker
                coordinate={map.coordinate}
                title={'Camp'}
                description={(index + 1).toString()}
              />
            );
          })}
          {/* <Marker
            coordinate={{latitude: -6.391504, longitude: 106.82763}}
            title={'Camp'}
            description={'Camp Depok'}
          /> */}
        </MapView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
