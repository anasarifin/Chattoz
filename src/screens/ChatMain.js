import React from 'react';
// import firebase from 'react-native-firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import app from '../configs/firebase';
import firebase from 'firebase';

// let itemsRef = db.ref('/chats');

class ChatMain extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      sender: 'yuna',
      receiver: 'john',
    };
  }

  send = text => {
    app
      .firestore()
      .collection('chats')
      .doc([this.state.sender, this.state.receiver].sort().join('|'))
      .collection('chat')
      .add({
        message: text,
        sender: this.state.sender,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(resolve => console.log(resolve))
      .catch(reject => console.log(reject));
  };

  componentDidMount() {
    app
      .firestore()
      .collection('chats')
      .doc('yuna|steve')
      .collection('chat')
      .onSnapshot(async snapshot => {
        const final = [];
        await snapshot.forEach(doc => {
          final.push({
            _id: 1,
            text: doc.data().message,
            createdAt: new Date(doc.data().time.toDate()),
            user: {
              _id: 1,
              name: doc.data().sender,
            },
          });
        });
        this.setState({
          messages: final,
        });
      });

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
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.send(messages[0].text)}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
        onPressAvatar={x => console.log(x)}
      />
    );
  }
}

export default ChatMain;
