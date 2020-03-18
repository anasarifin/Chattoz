import React from 'react';
// import firebase from 'react-native-firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import app from '../configs/firebase';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {
  Root,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  ActionSheet,
} from 'native-base';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Axios from 'axios';

// let itemsRef = db.ref('/chats');
const url = 'http://100.24.32.116:9999/api/v1/users/';

class ChatMain extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  check = () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => console.log(snapshot.data()));
  };

  send = text => {
    const me = this.props.user.user.username;
    const you = this.props.route.params.receiver;
    const merge = [me, you].sort();
    app
      .firestore()
      .collection('chats')
      .doc(merge.join('|'))
      .collection('chat')
      .add({
        message: text,
        sender: me,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(resolve => console.log(resolve))
      .catch(reject => console.log(reject));

    // app
    //   .firestore()
    //   .collection('users')
    //   .doc(you)
    //   .collection('friends')
    //   .doc(me)
    //   .set({
    //     last_message: text,
    //     last_time: firebase.firestore.Timestamp.fromDate(new Date()),
    //   })
    //   .then(resolve => console.log(resolve))
    //   .catch(reject => console.log(reject));
  };

  getChat = () => {
    const username = this.props.user.user.username;
    const merge = [username, this.props.route.params.receiver].sort();
    app
      .firestore()
      .collection('chats')
      .doc(merge.join('|'))
      .collection('chat')
      .orderBy('time', 'desc')
      .onSnapshot(async snapshot => {
        const final = [];
        await snapshot.forEach(doc => {
          final.push({
            _id: 1,
            text: doc.data().message,
            createdAt: new Date(doc.data().time.toDate()),
            user: {
              _id: doc.data().sender === username ? 1 : 2,
              name: doc.data().sender,
            },
          });
        });
        this.setState({
          messages: final,
        });
      });
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.name,
    });
    this.getChat();

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 1,
    //       },
    //     },
    //     {
    //       _id: 1,
    //       text: 'Hello dshit!',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 3,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <>
        <Header
          style={{backgroundColor: 'rgba(33,150,243,1)'}}
          androidStatusBarColor="rgba(25,118,210,1)">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.route.params.receiver}</Title>
          </Body>
          <Right>
            <Root>
              <Entypo
                size={30}
                name={'menu'}
                color={'white'}
                style={styles.menu}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: ['View Profile', 'View Location'],
                      // title: 'Testing ActionSheet',
                    },
                    buttonIndex => {
                      if (buttonIndex === 0) {
                        Axios.get(url + this.props.route.params.receiver).then(
                          resolve => {
                            this.props.navigation.navigate('profile-friend', {
                              data: resolve.data[0],
                            });
                          },
                        );
                      } else if (buttonIndex === 1) {
                        app
                          .firestore()
                          .collection('users')
                          .doc(this.props.route.params.receiver)
                          .get()
                          .then(resolve => {
                            this.props.navigation.navigate('maps-friend', {
                              data: {
                                latitude: resolve.data().location.O,
                                longitude: resolve.data().location.F,
                              },
                            });
                          });
                      }
                    },
                  )
                }
              />
            </Root>
          </Right>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.send(messages[0].text)}
          user={{
            _id: 1,
          }}
          alwaysShowSend={true}
          onPressAvatar={x => this.check()}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 0,
    top: -15,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatMain);
