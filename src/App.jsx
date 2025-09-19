import { useState, useRef, useEffect } from "react";
import { chatWithAI } from "./api"; // API file for OpenAI

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // 🌙 Dark mode state
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const fileInputRef = useRef(null);
  const chatBoxRef = useRef(null);

  // --- Send message ---
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await chatWithAI(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ No response from AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `📷 Sent an image: ${file.name}` },
      ]);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    if (!chatBoxRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    setShowScrollBtn(scrollHeight - scrollTop > clientHeight + 200);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode
          ? "bg-gradient-to-br from-blue-900 via-gray-900 to-green-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-slate-200 to-green-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="w-full p-4 text-center text-2xl font-bold animate-pulse relative">
        🤖 AI Chat
        {/* 🌙/☀️ Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Chat Box */}
      <div className="relative w-full max-w-3xl bg-black/30 dark:bg-black/40 rounded-2xl shadow-lg p-4 flex flex-col h-[70vh]">
        <div
          ref={chatBoxRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto space-y-3 pr-2"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] animate-fadeIn ${
                msg.role === "user"
                  ? "ml-auto bg-gradient-to-r from-blue-500 to-green-400 text-black"
                  : "mr-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-gray-700 px-4 py-2 rounded-xl animate-pulse">
              ⏳ Thinking...
            </div>
          )}
        </div>

        {/* Floating Scroll Button */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-20 right-5 p-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 shadow-lg hover:opacity-80 transition"
          >
            ⬇️
          </button>
        )}

        {/* Input Section */}
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl bg-black/40 border border-gray-700 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:opacity-80"
          >
            Send
          </button>

          <button
            onClick={() => fileInputRef.current.click()}
            className="p-3 bg-black/40 rounded-xl hover:bg-black/60"
          >
            🖼️
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />

          <button
            onClick={startListening}
            className="p-3 bg-black/40 rounded-xl hover:bg-black/60"
          >
            🎤
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-sm opacity-70">
        Made with ❤️ by Ajith Kumar
      </footer>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default App;
