import React from 'react';
// import firebase from 'react-native-firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import app from '../configs/firebase';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, SafeAreaView} from 'react-native';

// let itemsRef = db.ref('/chats');

class ChatMain extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      receiver: 'steve',
    };
  }

  check = () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => console.log(snapshot.data()));
  };

  send = text => {
    const merge = [
      this.props.user.user.username,
      this.props.route.params.receiver,
    ].sort();
    app
      .firestore()
      .collection('chats')
      .doc(merge.join('|'))
      .collection('chat')
      .add({
        message: text,
        sender: this.props.user.user.username,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(resolve => console.log(resolve))
      .catch(reject => console.log(reject));
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
          console.log(doc.data());
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
      title: this.props.route.params.receiver,
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
            <Button transparent>
              <Icon name="menu" />
            </Button>
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

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatMain);
