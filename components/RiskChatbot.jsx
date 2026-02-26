// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function RiskChatbot({ result }) {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { role: "bot", text: "Hello 👋 I am your AI Risk Advisor. Ask me about this prediction." }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages(prev => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post("/api/chat", {
//         question: input,
//         prediction: result
//       });

//       setMessages(prev => [
//         ...prev,
//         { role: "bot", text: res.data.reply }
//       ]);

//     } catch (err) {
//       setMessages(prev => [
//         ...prev,
//         { role: "bot", text: "Something went wrong." }
//       ]);
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           position: "fixed",
//           bottom: 30,
//           right: 30,
//           background: "#b8933f",
//           color: "#1a1814",
//           padding: "14px 18px",
//           borderRadius: "50px",
//           border: "none",
//           cursor: "pointer",
//           fontWeight: "bold",
//           zIndex: 9999
//         }}
//       >
//         💬
//       </button>

//       {open && (
//         <div style={{
//           position: "fixed",
//           bottom: 90,
//           right: 30,
//           width: 360,
//           height: 480,
//           background: "#1e1c18",
//           border: "1px solid rgba(184,147,63,0.3)",
//           borderRadius: 8,
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 9999
//         }}>
//           <div style={{
//             padding: 12,
//             borderBottom: "1px solid #333",
//             fontWeight: "bold",
//             color: "#f5f0e8"
//           }}>
//             AI Risk Assistant
//           </div>

//           <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
//             {messages.map((msg, i) => (
//               <div key={i} style={{
//                 marginBottom: 10,
//                 textAlign: msg.role === "user" ? "right" : "left"
//               }}>
//                 <span style={{
//                   background: msg.role === "user" ? "#b8933f" : "#333",
//                   padding: "6px 10px",
//                   borderRadius: 8,
//                   display: "inline-block",
//                   maxWidth: "80%",
//                   color: msg.role === "user" ? "#1a1814" : "#f5f0e8"
//                 }}>
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//             {loading && <div style={{ color: "#999" }}>Thinking...</div>}
//           </div>

//           <div style={{ display: "flex", borderTop: "1px solid #333" }}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               style={{
//                 flex: 1,
//                 padding: 10,
//                 border: "none",
//                 outline: "none",
//                 background: "#2a2620",
//                 color: "#f5f0e8"
//               }}
//               placeholder="Ask about this student's risk..."
//             />
//             <button
//               onClick={sendMessage}
//               style={{
//                 background: "#b8933f",
//                 border: "none",
//                 padding: "0 16px",
//                 cursor: "pointer",
//                 color: "#1a1814",
//                 fontWeight: "bold"
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function RiskChatbot({ result }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello 👋 I am your AI Risk Advisor. Ask me about this prediction." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        question: input,
        prediction: result
      });

      setMessages(prev => [
        ...prev,
        { role: "bot", text: res.data.reply }
      ]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Something went wrong." }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        /* ── FAB ── */
        .chatbot-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #b8933f;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(184,147,63,0.45), 0 2px 8px rgba(0,0,0,0.5);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .chatbot-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 32px rgba(184,147,63,0.6), 0 2px 8px rgba(0,0,0,0.5);
        }
        .chatbot-fab:active { transform: scale(0.96); }

        .fab-icon {
          font-size: 1.3rem;
          transition: transform 0.25s ease;
        }
        .fab-icon.open { transform: rotate(90deg) scale(0.85); }

        /* ── WINDOW ── */
        .chatbot-window {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 360px;
          height: 500px;
          z-index: 9998;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          border-radius: 6px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(184,147,63,0.25),
            0 24px 64px rgba(0,0,0,0.7),
            0 4px 16px rgba(0,0,0,0.4);
          animation: windowIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transform-origin: bottom right;
        }

        @keyframes windowIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        /* ── HEADER ── */
        .chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          background: #1a1814;
          border-bottom: 1px solid rgba(184,147,63,0.2);
          flex-shrink: 0;
        }

        .chat-header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(184,147,63,0.15);
          border: 1.5px solid rgba(184,147,63,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .chat-header-info { flex: 1; }

        .chat-header-title {
          font-size: 0.8rem;
          font-weight: 500;
          color: #f5f0e8;
          letter-spacing: 0.02em;
        }

        .chat-header-sub {
          font-size: 0.62rem;
          color: #7a7060;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 1px;
        }

        .online-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3ecfa0;
          box-shadow: 0 0 6px rgba(62,207,160,0.7);
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        .chat-close-btn {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background: rgba(245,240,232,0.05);
          border: 1px solid rgba(245,240,232,0.1);
          color: #7a7060;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .chat-close-btn:hover { background: rgba(245,240,232,0.1); color: #f5f0e8; }

        /* ── MESSAGES ── */
        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 14px 14px 6px;
          background: #1e1c18;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(184,147,63,0.2) transparent;
        }

        .chat-body::-webkit-scrollbar { width: 4px; }
        .chat-body::-webkit-scrollbar-track { background: transparent; }
        .chat-body::-webkit-scrollbar-thumb { background: rgba(184,147,63,0.25); border-radius: 4px; }

        .msg-row {
          display: flex;
          align-items: flex-end;
          gap: 7px;
          animation: msgIn 0.18s ease both;
        }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-row.user { flex-direction: row-reverse; }

        .msg-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          margin-bottom: 2px;
        }

        .msg-avatar.bot {
          background: rgba(184,147,63,0.12);
          border: 1px solid rgba(184,147,63,0.3);
          color: #b8933f;
        }

        .msg-avatar.user {
          background: rgba(155,127,232,0.12);
          border: 1px solid rgba(155,127,232,0.3);
          color: #9b7fe8;
        }

        .msg-bubble {
          max-width: 78%;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.8rem;
          line-height: 1.55;
          word-break: break-word;
        }

        .msg-bubble.bot {
          background: #2a2620;
          border: 1px solid rgba(184,147,63,0.18);
          color: #e8e0d0;
          border-bottom-left-radius: 3px;
        }

        .msg-bubble.user {
          background: #b8933f;
          color: #1a1814;
          border-bottom-right-radius: 3px;
          font-weight: 400;
        }

        /* ── TYPING INDICATOR ── */
        .typing-row {
          display: flex;
          align-items: flex-end;
          gap: 7px;
          animation: msgIn 0.18s ease both;
        }

        .typing-bubble {
          background: #2a2620;
          border: 1px solid rgba(184,147,63,0.18);
          border-radius: 10px;
          border-bottom-left-radius: 3px;
          padding: 10px 14px;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #b8933f;
          opacity: 0.5;
          animation: typingBounce 1.2s ease infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }

        /* ── INPUT BAR ── */
        .chat-footer {
          display: flex;
          align-items: center;
          gap: 0;
          background: #1a1814;
          border-top: 1px solid rgba(184,147,63,0.18);
          padding: 10px 12px;
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          padding: 9px 12px;
          background: rgba(245,240,232,0.05);
          border: 1px solid rgba(184,147,63,0.2);
          border-radius: 4px 0 0 4px;
          color: #f5f0e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .chat-input::placeholder { color: rgba(122,112,96,0.5); }

        .chat-input:focus {
          border-color: rgba(184,147,63,0.5);
          background: rgba(245,240,232,0.07);
        }

        .chat-send-btn {
          padding: 9px 16px;
          background: #b8933f;
          border: 1px solid #b8933f;
          border-radius: 0 4px 4px 0;
          color: #1a1814;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .chat-send-btn:hover { background: #d4aa5a; border-color: #d4aa5a; }
        .chat-send-btn:active { background: #a07830; }

        .send-arrow { font-size: 0.9rem; }

        .chat-hint {
          text-align: center;
          font-size: 0.58rem;
          color: rgba(122,112,96,0.45);
          letter-spacing: 0.06em;
          padding: 4px 12px 8px;
          background: #1a1814;
          flex-shrink: 0;
        }
      `}</style>

      {/* ── FAB ── */}
      <button className="chatbot-fab" onClick={() => setOpen(!open)} title="AI Risk Advisor">
        <span className={`fab-icon${open ? " open" : ""}`}>
          {open ? "✕" : "💬"}
        </span>
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">🤖</div>
            <div className="chat-header-info">
              <div className="chat-header-title">AI Risk Advisor</div>
              <div className="chat-header-sub">
                <span className="online-dot" />
                Online · Analysing prediction
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.role}`}>
                <div className={`msg-avatar ${msg.role}`}>
                  {msg.role === "bot" ? "🤖" : "U"}
                </div>
                <div className={`msg-bubble ${msg.role}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="typing-row">
                <div className="msg-avatar bot">🤖</div>
                <div className="typing-bubble">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-footer">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about this student's risk..."
            />
            <button className="chat-send-btn" onClick={sendMessage}>
              Send <span className="send-arrow">↑</span>
            </button>
          </div>
          <div className="chat-hint">ENTER to send · SHIFT+ENTER for new line</div>
        </div>
      )}
    </>
  );
}