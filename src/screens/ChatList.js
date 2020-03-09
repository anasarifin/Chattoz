import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import app from '../configs/firebase';
import {useSelector} from 'react-redux';

const ChatList = props => {
  const [friend, setFriend] = useState([]);
  const user = useSelector(state => state.user.user);

  const getFriend = () => {
    app
      .firestore()
      .collection('users')
      .doc(user.username)
      .collection('friends')
      .onSnapshot(async snapshot => {
        const final = [];
        await snapshot.forEach(doc => {
          final.push(doc.data());
          // app
          //   .firestore()
          //   .collection('users')
          //   .doc(doc.data().username)
          //   .snapshot(doc2 => console.log(doc2));
        });
        setFriend(final);
      });
  };

  useEffect(() => console.log('OK bos !!!'), []);

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
                  <Text>{x.username}</Text>
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
