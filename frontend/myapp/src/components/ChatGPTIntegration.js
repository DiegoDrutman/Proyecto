import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F5F5DC; /* Light beige background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.h2`
  color: #8B4513; /* Dark brown text */
  text-align: center;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto; /* Allow scrolling */
  margin-bottom: 20px;
`;

const MessageItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isUser ? '#FFF8DC' : '#FFFFFF')}; /* Different background for user and bot messages */
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  max-width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    max-width: 100%; /* Adjust for smaller screens */
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #DDD;
  border-radius: 5px;
`;

const SendButton = styled.button`
  background-color: #A0522D; /* Sienna */
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #8B4513; /* Darker on hover */
  }
`;

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
