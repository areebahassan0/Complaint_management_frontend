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
      {/* Chat Icon */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#03fcdf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}
        title="Chat with us"
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            width: 320,
            maxHeight: '60vh',
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            background: '#03fcdf',
            color: '#000',
            fontWeight: 'bold'
          }}>
            Chat with KE Support
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: 12,
            overflowY: 'auto',
            background: '#f7f7f7'
          }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  textAlign: m.sender === 'user' ? 'right' : 'left'
                }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: 16,
                  background: m.sender === 'user' ? '#03fcdf': '#e0e0e0',
                  color: m.sender === 'user' ? '#000' : '#000',
                  maxWidth: '80%'
                }}>
                  {m.text}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message…"
              style={{
                flex: 1,
                border: 'none',
                padding: '12px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                border: 'none',
                background: 'none',
                padding: '0 16px',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
