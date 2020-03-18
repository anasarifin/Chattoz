import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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
import {useSelector, useDispatch} from 'react-redux';
import app from '../configs/firebase';
import {getFriend} from '../redux/actions/user';

const url = 'http://100.24.32.116:9999/api/v1/users/';
const imgUrl = 'http://100.24.32.116:9999/public/img/';

const ChatFriend = props => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const user = useSelector(state => state.user.user);
  const request = props.route.params.data;
  const dispatch = useDispatch();

  const getFriendList = user => {
    app
      .firestore()
      .collection('users')
      .doc(user)
      .collection('friends')
      .get()
      .then(async snapshot => {
        const source = [];
        await snapshot.forEach(doc => {
          if (doc) {
            source.push(doc.id);
          }
        });
        if (source.length > 0) {
          dispatch(getFriend(source));
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        style={{backgroundColor: 'rgba(33,150,243,1)'}}
        androidStatusBarColor="rgba(25,118,210,1)">
        <Left style={{flex: 1}} />
        <Body style={{flex: 1}}>
          <Title style={{alignSelf: 'center'}}>Friend Request</Title>
        </Body>
        <Right style={{flex: 1}} />
      </Header>
      <List>
        {request.map((x, i) => {
          return (
            // <TouchableOpacity
            //   key={i}
            //   onPress={() => {
            //  props.navigation.navigate('chat-main', {
            //    receiver: x.username,
            //  });
            //   }}>
            <ListItem>
              <Body>
                <Text style={{textAlign: 'left'}}>{x}</Text>
              </Body>
              <Right style={{flexDirection: 'row', paddingRight: 15}}>
                <Text
                  style={{color: 'blue'}}
                  onPress={async () => {
                    await app
                      .firestore()
                      .collection('users')
                      .doc(user.username)
                      .collection('request')
                      .doc(x)
                      .delete();
                    await app
                      .firestore()
                      .collection('users')
                      .doc(user.username)
                      .collection('friends')
                      .doc(x)
                      .set({});
                    await app
                      .firestore()
                      .collection('users')
                      .doc(x)
                      .collection('friends')
                      .doc(user.username)
                      .set({});
                    getFriendList();
                  }}>
                  Accept
                </Text>
                <Text> | </Text>
                <Text
                  style={{color: 'red'}}
                  onPress={() => {
                    app
                      .firestore()
                      .collection('users')
                      .doc(user.username)
                      .collection('request')
                      .doc(x.username)
                      .delete();
                  }}>
                  Reject
                </Text>
              </Right>
            </ListItem>
            // </TouchableOpacity>
          );
        })}
      </List>
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

export default ChatFriend;
