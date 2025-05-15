import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/chatbot.service';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { sender: 'user'|'bot', text: string }
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');

    try {
        const result = await sendMessage(input);

        if (result.status) {
            // Make sure the bot's reply is a string
            setMessages((msgs) => [
                ...msgs,
                { sender: 'bot', text: result.data?.reply || 'Bot did not send a valid reply.' }
            ]);
        } else {
            // Service returned an error object or status = false
            setMessages((msgs) => [
                ...msgs,
                { sender: 'bot', text: result.message || 'Sorry, something went wrong.' }
            ]);
        }

    } catch (err) {
        // Network or server error
        setMessages((msgs) => [
            ...msgs,
            { sender: 'bot', text: 'Sorry, something went wrong.' }
        ]);
    }
};

  return (
    <>
      {/* Modern Chat Icon */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1976d2 0%, #1a237e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
          zIndex: 1000,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          border: '2px solid rgba(255, 255, 255, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(25, 118, 210, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(25, 118, 210, 0.3)';
        }}
        title="Chat with KE Support"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 108,
            right: 32,
            width: 360,
            height: '480px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            border: '1px solid rgba(25, 118, 210, 0.1)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1976d2 0%, #1a237e 100%)',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Chat with KE Support</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            background: '#f8f9fa'
          }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: m.sender === 'user' 
                    ? 'linear-gradient(135deg, #1976d2 0%, #1a237e 100%)'
                    : '#fff',
                  color: m.sender === 'user' ? '#fff' : '#333',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  fontSize: '0.95rem',
                  lineHeight: '1.4'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            background: '#fff',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: '1px solid #e0e0e0',
                borderRadius: '24px',
                padding: '12px 20px',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1976d2';
                e.target.style.boxShadow = '0 0 0 2px rgba(25, 118, 210, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1a237e 100%)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
