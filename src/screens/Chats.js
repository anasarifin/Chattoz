import React, {useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

const Chats = () => {
  const [messages, setMessages] = useState([
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
  ]);

  const onSend = (message = []) => {
    setMessages(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={message => onSend(message)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chats;
