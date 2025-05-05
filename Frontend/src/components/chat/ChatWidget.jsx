// ChatWidget.jsx
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import LottieLogo from '../../../public/assets/img/lotti/chatBot.json';
import './styles.css';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
  
    try {
      const res = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),  // Assurez-vous que le format est correct
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      const botMessage = { text: data.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error during fetch:", err);  // Affiche l'erreur dans la console
      setMessages((prev) => [...prev, { text: 'Erreur de connexion', sender: 'bot' }]);
    }
  };
  

  return (
    <>
      <div className="lottie-launcher" onClick={toggleChat}>
        <Lottie animationData={LottieLogo} loop />
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <span>🤖 Assistant</span>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Écrivez un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Envoyer</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
