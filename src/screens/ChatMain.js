import React from 'react';
// import firebase from 'react-native-firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import {db} from '../configs/firebase';

// let itemsRef = db.ref('/chats');

class ChatMain extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const ref = db;
    console.log(ref);
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
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
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
      />
    );
  }
}

export default ChatMain;
