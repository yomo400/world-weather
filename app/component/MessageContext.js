"use client";
import { createContext, useState, useContext } from "react";

const messages = {
  first: (
    <p className="my-20 text-center text-teal-500">
      場所をクリックしてください
    </p>
  ),
  loading: (
    <div className="animate-spin h-16 w-16 border-8 border-teal-500 rounded-full border-t-transparent my-16 mx-auto" />
  ),
  error: (
    <p className="my-20 text-center text-teal-500">
      エラーが出ています。
      <br />
      もう一度試してください。
    </p>
  ),
};
const MessageReadContext = createContext(messages);
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(messages);
  return (
    <MessageReadContext.Provider value={message}>
      {children}
    </MessageReadContext.Provider>
  );
};

export const useReadMessage = () => useContext(MessageReadContext);
