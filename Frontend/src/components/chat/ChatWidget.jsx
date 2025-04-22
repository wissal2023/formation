import React from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';  
import './styles.css'; 

const ChatWidget = () => {
  const handleNewUserMessage = (newMessage) => {
    console.log("Message reçu :", newMessage);
  };

  // Fonction pour gérer la fermeture du widget
  const handleClose = () => {
    console.log("Widget fermé !");
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Support"
      subtitle="Posez-nous vos questions"
      showCloseButton={true}  // Désactivez temporairement le bouton de fermeture
      handleClose={handleClose}  // Ajoutez cette méthode pour gérer la fermeture si nécessaire
      className="votre-classe-personnalisee" 
    />
  );
};

export default ChatWidget;
