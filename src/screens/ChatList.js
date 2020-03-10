import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Container,
  Header,
  Title,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import app from '../configs/firebase';
import {useSelector} from 'react-redux';
import Axios from 'axios';

const url = 'http://192.168.1.135:8888/api/v1/users/';

const ChatList = props => {
  const [friend, setFriend] = useState([]);
  const user = useSelector(state => state.user.user);

  function format(data) {
    let word = '';
    data.forEach((x, i) => {
      if (i < data.length - 1) {
        word += `"${x}",`;
      } else {
        word += `"${x}"`;
      }
    });
    return `(${word})`;
  }

  const getFriend = async () => {
    app
      .firestore()
      .collection('users')
      .doc(await user.username)
      .collection('friends')
      .onSnapshot(async snapshot => {
        const source = [];
        await snapshot.forEach(doc => {
          if (doc) {
            source.push(doc.data());
          }
          // if (doc) {
          //   app
          //     .firestore()
          //     .collection('users')
          //     .doc(doc.data().username)
          //     .get()
          //     .then(doc2 => {
          //       console.log(doc2.data());
          //       source.push(doc2.data());
          //     });
          // }
        });
        console.log(source);
        setFriend(source);
        // Axios.post(url, {data: })
        //   .then(resolve => {
        //     console.log(resolve);
        //   })
        //   .catch(reject => console.log(reject));
      });
  };

  const moveToProfile = username => {
    Axios.get(url + username).then(resolve =>
      props.navigation.navigate('profile', {data: resolve.data[0]}),
    );
  };

  useEffect(() => {
    getFriend();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        style={{backgroundColor: 'rgba(33,150,243,1)'}}
        androidStatusBarColor="rgba(25,118,210,1)">
        <Left style={{flex: 1}} />
        <Body style={{flex: 1}}>
          <Title style={{alignSelf: 'center'}}>Messages</Title>
        </Body>
        <Right style={{flex: 1}} />
      </Header>
      {friend.map((x, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() =>
              props.navigation.navigate('chat-main', {receiver: x.username})
            }>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{uri: 'https://placeimg.com/140/140/any'}}
                  />
                </Left>
                <Body>
                  <Text style={{fontSize: 22}}>{x.username}</Text>
                </Body>
              </ListItem>
            </List>
          </TouchableOpacity>
        );
      })}
      <View style={styles.add}>
        <TouchableOpacity onPress={() => getFriend()}>
          <AntDesign name="pluscircle" color="rgba(33,150,243,1)" size={70} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 40,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 15,
    textAlign: 'right',
  },
  list: {
    width: '90%',
    backgroundColor: 'whitesmoke',
  },
  add: {
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
});

export default ChatList;
