import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Badge,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalAdd from 'react-native-modal';
import app from '../configs/firebase';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ChatFriend from './ChatFriend';

const url = 'http://100.24.32.116:9999/api/v1/users/';
const imgUrl = 'http://100.24.32.116:9999/public/img/';

const ChatList = props => {
  const [friends, setFriends] = useState([]);
  const [addFriends, setAddFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [modalFull, setModalFull] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  const friend = useSelector(state => state.user.friend);

  const getFriend = async () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        let friendList = [];
        snapshot.forEach(doc => {
          if (friend) {
            if (friend.includes(doc.data().username)) {
              friendList.push(doc.data());
            }
          }
        });
        setFriends(friendList);
        // Axios.post(url, {data: })
        //   .then(resolve => {
        //     console.log(resolve);
        //   })
        //   .catch(reject => console.log(reject));
      });
  };

  const getAddFriend = () => {
    app
      .firestore()
      .collection('users')
      .doc(user.username)
      .collection('request')
      .onSnapshot(snapshot => {
        let addFriendList = [];
        snapshot.forEach(doc => {
          addFriendList.push(doc.id);
        });
        setAddFriends(addFriendList);
      });
  };

  useEffect(() => {
    getFriend();
  }, [friends]);

  useEffect(() => {
    getAddFriend();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        style={{backgroundColor: 'rgba(33,150,243,1)'}}
        androidStatusBarColor="rgba(25,118,210,1)">
        <Body style={{flex: 1}}>
          <Title style={{alignSelf: 'flex-start', marginLeft: 20}}>
            Messages
          </Title>
        </Body>
        <Right>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setModalFull(true)}>
            <Ionicons
              name="md-person-add"
              size={24}
              color="white"
              style={{marginHorizontal: 10}}
            />
            {addFriends.length > 0 ? (
              <Badge info>
                <Text>{addFriends.length}</Text>
              </Badge>
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </Right>
      </Header>
      <List>
        {friends.map((x, i) => {
          return (
            <ListItem
              avatar
              onPress={() =>
                props.navigation.navigate('chat-main', {
                  receiver: x.username,
                  name: x.name,
                  image: imgUrl + x.image,
                })
              }>
              <Left>
                <Thumbnail source={{uri: imgUrl + x.image}} />
              </Left>
              <Body>
                <Text>{x.name}</Text>
                <Text note numberOfLines={1}>
                  Doing what you like will always keep you happy ...
                </Text>
                <Text
                  note
                  style={{
                    position: 'absolute',
                    fontSize: 12,
                    top: 15,
                    right: 0,
                  }}>
                  4:12 PM
                </Text>
              </Body>
            </ListItem>
            // </TouchableOpacity>
          );
        })}
      </List>
      <View style={styles.add}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <AntDesign name="pluscircle" color="rgba(33,150,243,1)" size={70} />
        </TouchableOpacity>
      </View>
      <Modal visible={modalFull} onRequestClose={() => setModalFull(false)}>
        <ChatFriend
          user={user}
          friend={addFriends}
          back={() => setModalFull(false)}
        />
      </Modal>
      <ModalAdd isVisible={modal} onBackButtonPress={() => setModal(false)}>
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 80,
            borderRadius: 5,
          }}>
          <TextInput
            placeholder="Search username here..."
            style={{fontSize: RFPercentage(2.5)}}
            onChange={e => setSearch(e.nativeEvent.text)}
          />
          {loading ? (
            <ActivityIndicator style={styles.icon} color="black" />
          ) : (
            <FontAwesome
              name="search"
              color="black"
              size={26}
              style={styles.icon}
              onPress={() => {
                if (search === user.username) {
                  ToastAndroid.show('Username not found !', ToastAndroid.SHORT);
                  return false;
                }
                if (friend.includes(search)) {
                  ToastAndroid.show(
                    'You are already be friend !',
                    ToastAndroid.SHORT,
                  );
                  return false;
                }
                setLoading(true);
                Axios.get(url + search).then(resolve => {
                  if (resolve.data.msg) {
                    ToastAndroid.show(
                      'Username not found !',
                      ToastAndroid.SHORT,
                    );
                    setLoading(false);
                  } else {
                    app
                      .firestore()
                      .collection('users')
                      .doc(search)
                      .collection('request')
                      .doc(user.username)
                      .set({})
                      .then(() => {
                        setModal(false);
                        setLoading(false);
                        ToastAndroid.show(
                          'Friend request has been send !',
                          ToastAndroid.SHORT,
                        );
                      });
                  }
                });
              }}
            />
          )}
        </View>
      </ModalAdd>
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
  icon: {
    position: 'absolute',
    right: 15,
  },
});

export default ChatList;
