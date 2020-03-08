import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Container,
  Header,
  Content,
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

  useEffect(() => {
    console.log(app.database());
  }, []);

  // useEffect(() => console.log('OK bos !!!'), []);

  return (
    <SafeAreaView style={styles.container}>
      {friend.map((x, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => props.navigation.navigate('chat-main')}>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{uri: 'Image URL'}} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                </Body>
              </ListItem>
            </List>
          </TouchableOpacity>
        );
      })}
      <View style={styles.add}>
        <AntDesign name="pluscircle" size={60} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
