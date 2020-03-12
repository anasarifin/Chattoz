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
  Button,
  Thumbnail,
  Text,
  Modal,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import app from '../configs/firebase';
import {useSelector} from 'react-redux';
import Axios from 'axios';

const url = 'http://192.168.1.135:8888/api/v1/users/';
const imgUrl = 'http://192.168.1.135:8888/public/img/';

const ChatList = props => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const user = useSelector(state => state.user.user);
  const friend = useSelector(state => state.user.friend);

  const getFriend = async () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        let final = [];
        snapshot.forEach(doc => {
          if (friend) {
            if (friend.includes(doc.data().username)) {
              final.push(doc.data());
            }
          }
        });
        setFriends(final);
        // Axios.post(url, {data: })
        //   .then(resolve => {
        //     console.log(resolve);
        //   })
        //   .catch(reject => console.log(reject));
      });
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
      {friends.map((x, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() =>
              props.navigation.navigate('chat-main', {
                receiver: x.username,
              })
            }>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{uri: imgUrl + x.image}} />
                </Left>
                <Body>
                  <Text style={{fontSize: 22}}>{x.name}</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
            </List>
          </TouchableOpacity>
        );
      })}
      <View style={styles.add}>
        <TouchableOpacity onPress={() => console.log(friends)}>
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
