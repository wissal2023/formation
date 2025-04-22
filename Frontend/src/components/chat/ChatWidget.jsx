import React from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const ChatWidget = () => {
  const handleNewUserMessage = (newMessage) => {
    console.log("Message reçu :", newMessage);
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Support"
      subtitle="Posez-nous vos questions"
      showCloseButton={true}
    />
  );
};

export default ChatWidget;
