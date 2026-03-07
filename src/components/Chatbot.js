// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const getResponses = (role) => {
  const common = [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      reply: "Hello! I'm the GramVantage assistant. How can I help you today?",
    },
    {
      keywords: ["what is gramvantage", "about", "what is this"],
      reply:
        "GramVantage is a platform connecting village citizens, government officials, and NGOs for rural development, governance, and community collaboration.",
    },
    {
      keywords: ["login", "sign in", "how to login"],
      reply:
        "To login, go to the homepage and select your role — Citizen, Official, or NGO — then enter your credentials.",
    },
    {
      keywords: ["signup", "register", "create account", "new account"],
      reply:
        "To register, click Sign Up on the homepage. Citizens need a mobile number and Aadhar. Officials and NGOs need a 5-digit organization code.",
    },
    {
      keywords: ["logout", "sign out"],
      reply:
        "You can logout from the menu or profile section. Your session will end and you will be redirected to the homepage.",
    },
    {
      keywords: ["contact", "support", "help"],
      reply:
        "For support, please reach out through the contact section on the homepage.",
    },
    {
      keywords: ["navigate", "where", "how to go", "find", "section"],
      reply:
        "Use the navigation menu at the top to switch between sections. Your dashboard is the main hub after login.",
    },
  ];

  const citizenResponses = [
    {
      keywords: ["scheme", "schemes", "government scheme", "welfare"],
      reply:
        "You can view available government schemes in the Schemes section. It lists all active welfare programs you may be eligible for.",
    },
    {
      keywords: ["agriculture", "farming", "crop", "agricultural"],
      reply:
        "Visit the Agricultural Connect section for farming assistance, crop info, and agricultural support services.",
    },
    {
      keywords: ["news", "announcement", "village news", "updates"],
      reply:
        "Check your Citizen Dashboard for the latest village news and local announcements.",
    },
    {
      keywords: ["project", "ongoing", "development"],
      reply:
        "Ongoing village development projects are listed in your dashboard under the Projects section.",
    },
    {
      keywords: ["job", "employment", "work", "vacancy"],
      reply:
        "Visit the Jobs Available section to see employment opportunities in your area.",
    },
    {
      keywords: ["dashboard", "home", "main page"],
      reply:
        "Your Citizen Dashboard is your main hub. It shows news, schemes, projects, and other village updates.",
    },
    {
      keywords: ["community", "network", "connect"],
      reply:
        "The Community Network section lets you connect with others in your village and stay engaged with local initiatives.",
    },
  ];

  const officialResponses = [
    {
      keywords: ["scheme", "schemes", "administer", "manage scheme"],
      reply:
        "Go to Scheme Administration in your dashboard to manage, approve, or update government schemes.",
    },
    {
      keywords: ["pending", "application", "approval"],
      reply:
        "Pending applications from citizens are available under the Pending Applications section in your dashboard.",
    },
    {
      keywords: ["ngo", "collaborate", "collaboration"],
      reply:
        "You can coordinate with NGOs through the Collaboration section in your Official Dashboard.",
    },
    {
      keywords: ["village", "data", "stats", "monitor"],
      reply:
        "Village statistics and data monitoring tools are available directly on your Official Dashboard.",
    },
    {
      keywords: ["dashboard", "home", "main page"],
      reply:
        "Your Official Dashboard is your main hub for monitoring village data, managing schemes, and coordinating with NGOs.",
    },
    {
      keywords: ["department", "inter-department", "coordinate"],
      reply:
        "Use the Collaboration section to coordinate between departments and manage inter-departmental activities.",
    },
  ];

  const ngoResponses = [
    {
      keywords: ["project", "publish", "add project", "new project"],
      reply:
        "You can publish and manage your NGO projects from the Projects section in your NGO Dashboard.",
    },
    {
      keywords: ["collaborate", "collaboration", "government", "official"],
      reply:
        "Use the NGO Collaboration section to connect and coordinate with government departments.",
    },
    {
      keywords: ["program", "programs", "initiative"],
      reply:
        "Your active programs and initiatives are managed under the Programs section in your dashboard.",
    },
    {
      keywords: ["crowdfund", "funding", "crowdfunding", "raise"],
      reply:
        "The Crowdfunding section allows your NGO to raise funds for community projects.",
    },
    {
      keywords: ["dashboard", "home", "main page"],
      reply:
        "Your NGO Dashboard is your main hub for managing projects, collaborations, and programs.",
    },
    {
      keywords: ["impact", "track", "participation"],
      reply:
        "You can track project impact and participation from the Project Management section in your dashboard.",
    },
  ];

  if (role === "citizen") return [...common, ...citizenResponses];
  if (role === "official") return [...common, ...officialResponses];
  if (role === "ngo") return [...common, ...ngoResponses];
  return common;
};

const getWelcomeMessage = (role) => {
  if (role === "citizen")
    return " Welcome! I'm your GramVantage assistant. Ask me about schemes, agriculture, village news, jobs, or how to navigate the site.";
  if (role === "official")
    return " Welcome, Official! I can help you navigate scheme administration, pending applications, village data, and NGO collaboration.";
  if (role === "ngo")
    return " Welcome! I can help you manage projects, programs, collaborations, and crowdfunding on GramVantage.";
  return " Welcome to GramVantage! I can help you navigate the platform. Try asking about login, signup, or available features.";
};

const getBotReply = (input, role) => {
  const lower = input.toLowerCase();
  const responses = getResponses(role);
  const match = responses.find((r) =>
    r.keywords.some((k) => lower.includes(k)),
  );
  return match
    ? match.reply
    : "I'm not sure about that. Try asking about your dashboard, available schemes, projects, or how to navigate a specific section.";
};

const Chatbot = () => {
  const role = localStorage.getItem("userType");
  const [messages, setMessages] = useState([
    { sender: "bot", text: getWelcomeMessage(role) },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isMinimized && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const reply = getBotReply(input, role);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);

    setInput("");
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`chatbot-container ${isMinimized ? "minimized" : ""}`}
      onClick={isMinimized ? toggleMinimize : undefined}
    >
      <div className="chat-icon">💬</div>
      <div className="chat-content">
        <div className="chatbot-header">
          <h3>Chat Assistant</h3>
          <button className="minimize-button" onClick={toggleMinimize}>
            −
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <button className="chatbot-send" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
