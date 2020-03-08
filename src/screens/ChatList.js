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

const ChatList = props => {
  const [friend, setFriend] = useState([1, 2, 3, 4, 5, 6]);

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
            onPress={() => props.navigation.navigate('chat-main')}>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{uri: 'https://placeimg.com/140/140/any'}}
                  />
                </Left>
                <Body>
                  <Text>Kumar Pratiko</Text>
                </Body>
              </ListItem>
            </List>
          </TouchableOpacity>
        );
      })}
      <View style={styles.add}>
        <AntDesign name="pluscircle" color="rgba(33,150,243,1)" size={70} />
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
