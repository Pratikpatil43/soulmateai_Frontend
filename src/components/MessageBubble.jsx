import React from "react";

const MessageBubble = ({ message }) => {
  return (
    <div className={`p-2 rounded my-1 ${message.sender === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-700 text-white self-start"}`}>
      {message.text}
    </div>
  );
};

export default MessageBubble;