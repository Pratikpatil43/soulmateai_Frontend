import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart } from "react-icons/fa"; // Heart icon for send button
import Navbar from "../components/Navbar";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [genderSelected, setGenderSelected] = useState(false);
  const [modeSelected, setModeSelected] = useState(false);
  const [showModal, setShowModal] = useState(false); // state for the logout confirmation modal
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/chat", {
          headers: { Authorization: token },
        });

        if (res.data.length === 0) {
          setChats([]);
        } else {
          setChats(res.data);
          setGenderSelected(true);
          setModeSelected(true);
        }
      } catch (err) {
        console.error("Error fetching chats", err);
      }
    };

    fetchChats();
  }, [navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const token = sessionStorage.getItem("token");
      let responseMessage = "";

      if (!genderSelected) {
        if (message.toLowerCase().includes("boy")) {
          responseMessage = "Great! Now, how do you want to talk to me? 1️⃣ Casual 💬 | 2️⃣ Romantic ❤️ | 3️⃣ Deep 🧠 | 4️⃣ Flirty 😘 | 5️⃣ Funny 😂";
        } else if (message.toLowerCase().includes("girl")) {
          responseMessage = "Lovely! Now, how do you want to talk to me? 1️⃣ Casual 💬 | 2️⃣ Romantic ❤️ | 3️⃣ Deep 🧠 | 4️⃣ Flirty 😘 | 5️⃣ Funny 😂";
        } else {
          responseMessage = "Please choose a valid option: are you 👦 Boy or 👧 Girl";
          setChats([...chats, { message, response: responseMessage }]);
          setMessage("");
          return;
        }
        setGenderSelected(true);
        setChats([...chats, { message, response: responseMessage }]);
        setMessage("");
        return;
      }

      if (!modeSelected) {
        if (message.includes("1") || message.toLowerCase().includes("casual")) {
          responseMessage = "Great! We'll chat in a casual way. 😊";
        } else if (message.includes("2") || message.toLowerCase().includes("romantic")) {
          responseMessage = "Ohh! Let's talk romantically. ❤️, please start the conversation";
        } else if (message.includes("3") || message.toLowerCase().includes("deep")) {
          responseMessage = "Nice! Deep conversations..start it in deep 🧠";
        } else if (message.includes("4") || message.toLowerCase().includes("flirty")) {
          responseMessage = "Ooooh! Let’s get flirty. 😘";
        } else if (message.includes("5") || message.toLowerCase().includes("funny")) {
          responseMessage = "Haha! Let's have some laughs. 😂";
        } else {
          responseMessage = "Please select a valid option: 1️⃣ Casual | 2️⃣ Romantic | 3️⃣ Deep | 4️⃣ Flirty | 5️⃣ Funny";
          setChats([...chats, { message, response: responseMessage }]);
          setMessage("");
          return;
        }
        setModeSelected(true);
        setChats([...chats, { message, response: responseMessage }]);
        setMessage("");
        return;
      }

      const newChats = [...chats, { message, response: "🤔 Thinking..." }];
      setChats(newChats);
      setMessage("");

      setTimeout(async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/chat",
            { message },
            { headers: { Authorization: token } }
          );

          setChats([...newChats.slice(0, -1), { message, response: res.data.ai }]);
        } catch (err) {
          console.error("Error sending message", err);
          setChats([...newChats.slice(0, -1), { message, response: "Oops! Something went wrong. Try again." }]);
        }
      }, 5000);
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Handle logout with flirty confirmation
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear token or logout logic here
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="container vh-100 d-flex flex-column" style={{ backgroundColor: "#ffe4e1" }}>
      <Navbar />

      <div className="chat-box flex-grow-1 overflow-auto p-3 border rounded shadow" style={{ maxHeight: "70vh", backgroundColor: "#fff5f7" }}>
        {chats.length === 0 ? (
          <div className="text-center text-secondary mt-5" style={{ fontSize: "18px", fontWeight: "bold" }}>
            Start conversation with your AI soulmate 💕 💬
          </div>
        ) : (
          chats.map((chat, index) => (
            <div key={index} className="mb-3">
              {chat.message && (
                <div className="text-end">
                  <strong className="text-danger">You: {chat.message}</strong>
                </div>
              )}
              <div className="text-start text-secondary"><b style={{ color: "black" }}>💖 SoulmateAI : </b>{chat.response}</div>
            </div>
          ))
        )}
        <div ref={chatEndRef}></div>
      </div>

      <form onSubmit={handleSend} className="mt-3 d-flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-control me-2"
          placeholder={!genderSelected ? "are you 👦 Boy or 👧 Girl?" : !modeSelected ? "choose options 1️⃣ 2️⃣ 3️⃣ 4️⃣ or 5️⃣?" : "Type your message... 💬"}
          style={{ borderRadius: "20px", padding: "10px" }}
        />
        <button type="submit" className="btn btn-danger rounded-circle">
          <FaHeart size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
