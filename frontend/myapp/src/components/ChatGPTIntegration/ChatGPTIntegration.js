// src/components/RecipeChatIntegration/RecipeChatIntegration.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  ChatContainer,
  ChatHeader,
  MessageList,
  MessageItem,
  InputContainer,
  InputField,
  SendButton,
} from './RecipeChatIntegration.styles'; // Importar estilos

const RecipeChatIntegration = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async () => {
    if (!input) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: input,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setError('Error: Unable to fetch response');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Unable to fetch response', isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>Recipe Chat</ChatHeader>
      <MessageList>
        {messages.map((message, index) => (
          <MessageItem key={index} isUser={message.isUser}>
            {message.text}
          </MessageItem>
        ))}
      </MessageList>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <InputContainer>
        <InputField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about recipes..."
          disabled={loading}
        />
        <SendButton onClick={handleSendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default RecipeChatIntegration;
