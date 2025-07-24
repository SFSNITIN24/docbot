import { useEffect, useRef, useState } from "react";
import ChatCard from "./chatCard";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { createNewChat, sendMessage } from "../../../store/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const ChatPage = () => {
  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user: loggedUser } = useAppSelector((state) => state.auth);
  const { activeChatId, messages } = useAppSelector((state) => state.chat);
  const messagesForActiveChat = messages[activeChatId ?? ""] || [];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    if (!activeChatId) {
      const newId = uuidv4();
      dispatch(
        createNewChat({ chatId: newId, userId: loggedUser?.id as string, text })
      );
      navigate(`/chat/c/${newId}`);
    } else {
      dispatch(sendMessage({ text }));
    }
  };

  return (
    <ChatCard
      inputText={inputText}
      setInputText={setInputText}
      handleSendMessage={handleSendMessage}
      lastMessageRef={lastMessageRef}
      inputWrapperRef={inputWrapperRef}
      messages={messagesForActiveChat}
    />
  );
};

export default ChatPage;
