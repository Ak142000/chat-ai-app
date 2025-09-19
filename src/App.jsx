<<<<<<< HEAD
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
=======
import { useState, useEffect, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Sun, Moon, Copy, Image as ImageIcon, Mic, Volume2, Download } from "lucide-react"
import { chatWithAI } from "./api"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [listening, setListening] = useState(false)
  const endOfMessagesRef = useRef(null)
  const recognitionRef = useRef(null)

  // 🟢 Always clear messages when app starts
  useEffect(() => {
    setMessages([])
  }, [])

  // 🟢 Auto scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🎤 Setup Speech Recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => prev + (prev ? " " : "") + transcript)
    }

    recognitionRef.current = recognition
  }, [])

  // 🔊 Speak Text (TTS)
  const speakText = (text) => {
    if (!window.speechSynthesis) return alert("❌ Speech not supported")
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  const addMessage = (msg, isUser, type = "text") => {
    const newMsg = { content: msg, isUser, type, id: Date.now() + Math.random() }
    setMessages((prev) => [...prev, newMsg])
    if (!isUser && type === "text") {
      speakText(msg) // AI reply → auto speak
    }
  }

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text)
    alert("✅ Message copied!")
  }

  const sendMessage = async () => {
    const message = input.trim()
    if (!message) return
    addMessage(message, true)
    setInput("")
    setLoading(true)
    try {
      const reply = await chatWithAI(message)
      addMessage(reply, false)
    } catch (error) {
      addMessage(`❌ Error: ${error.message}`, false)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result
      addMessage(base64, true, "image")
      setLoading(true)
      try {
        const reply = await chatWithAI("What’s in this image?", base64)
        addMessage(reply, false)
      } catch (err) {
        addMessage(`❌ Error: ${err.message}`, false)
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // 🎤 Mic Toggle
  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("❌ Speech Recognition not supported")
      return
    }
    if (listening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }
  }

  // 📥 Download Chat as TXT
  const downloadChat = () => {
    const text = messages
      .map((msg) => (msg.isUser ? "👤 You: " : "🤖 AI: ") + (msg.type === "text" ? msg.content : "[Image]"))
      .join("\n\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "chat_history.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 gap-6 transition ${
        darkMode
          ? "bg-gradient-to-br from-sky-900 via-slate-950 to-emerald-900"
          : "bg-gradient-to-br from-gray-100 via-slate-200 to-emerald-100"
      }`}
    >
      {/* 🌙☀️ Theme Toggle */}
      <motion.button
        whileTap={{ rotate: 360, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 z-20 p-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-white shadow-lg hover:opacity-80 transition"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-lg">
        Simple Chat with AI
      </h1>

      {/* 📥 Download Button */}
      <button
        onClick={downloadChat}
        className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-2xl hover:opacity-80 transition flex items-center gap-2"
      >
        <Download size={18} /> Download Chat
      </button>

      {/* Messages */}
      <div className="w-full max-w-xl h-[450px] overflow-y-auto bg-gradient-to-r from-gray-900/90 to-gray-700/90 backdrop-blur-md border border-gray-600 rounded-2xl p-4 shadow-2xl">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            No messages yet. Start chatting!
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`group flex items-start gap-2 p-2 m-2 rounded-2xl max-w-xs ${
              msg.isUser
                ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white ml-auto text-right"
                : "bg-gradient-to-r from-emerald-600 to-indigo-600 text-white"
            }`}
          >
            {msg.type === "image" ? (
              <img src={msg.content} alt="Uploaded" className="rounded-xl max-w-[200px]" />
            ) : (
              <div className="whitespace-pre-wrap flex-1">{msg.content}</div>
            )}

            {/* Copy Button */}
            {msg.type === "text" && (
              <button
                onClick={() => copyMessage(msg.content)}
                className="opacity-0 group-hover:opacity-100 transition text-gray-300 hover:text-white"
              >
                <Copy size={18} />
              </button>
            )}

            {/* 🔊 Speaker Button for AI */}
            {!msg.isUser && msg.type === "text" && (
              <button
                onClick={() => speakText(msg.content)}
                className="opacity-0 group-hover:opacity-100 transition text-gray-300 hover:text-white"
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>
        ))}
        {loading && (
          <div className="p-3 m-2 rounded-2xl max-w-xs bg-gradient-to-r from-emerald-600 to-indigo-600 text-white animate-pulse">
            AI is typing...
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input + Buttons */}
      <div className="mt-2 flex gap-2 w-full max-w-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-5 py-2 bg-gradient-to-r from-sky-400 to-emerald-400 hover:opacity-80 text-white font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳" : "Send"}
        </button>

        {/* 📸 Upload */}
        <label className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold rounded-2xl cursor-pointer hover:opacity-80 transition">
          <ImageIcon size={20} />
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>

        {/* 🎤 Mic */}
        <button
          onClick={toggleMic}
          className={`px-4 py-2 rounded-2xl font-semibold flex items-center gap-1 transition ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:opacity-80"
          }`}
        >
          <Mic size={20} />
        </button>
      </div>

      {/* Footer */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mt-3"
      >
        Made with ❤️ by Ajith Kumar
      </motion.div>
    </div>
  )
}

export default App
>>>>>>> 59a520c11134bedcc2cc2a6d7489c97b6f6fd814
