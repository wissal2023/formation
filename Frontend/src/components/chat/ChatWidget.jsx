import React, { useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './styles.css'; 



const ChatWidget = () => {
  const [chatWindowOpen, setChatWindowOpen] = useState(true);
  const [messages, setMessages] = useState([]); // Garder les messages

  // Fonction pour gérer la fermeture du widget
  const handleClose = () => {
    console.log("Widget fermé !");
  };

  const handleToggle = () => {
    setChatWindowOpen(!chatWindowOpen);
  };

  const handleNewUserMessage = async (newMessage) => {
    console.log("Message reçu :", newMessage);

    // Ajouter le message de l'utilisateur dans le chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, user: 'user' },
    ]);

    // Envoyer la question à l'API Flask et récupérer la réponse
    const response = await fetch('http://127.0.0.1:5000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: newMessage }), // Utilisez newMessage pour poser la question
    });

    const data = await response.json();
    console.log("Réponse de l'API:", data.answer);

    // Ajouter la réponse de l'assistant dans le chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.answer, user: 'assistant' },
    ]);

    // Afficher la réponse dans le widget
    addResponseMessage(data.answer);
  };

  return (
<div className="App">
<Widget
  handleNewUserMessage={handleNewUserMessage}
  handleToggle={handleToggle}
  title="Bonjour"
  subtitle="Comment puis-je vous aider ?"
  showCloseButton={true}
  handleClose={handleClose}

/>
    </div>
  );
};

export default ChatWidget;
