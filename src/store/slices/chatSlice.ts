import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  chatId: string;
  sender: "user" | "system";
  message: string;
  markdownResponse: string;
  fileIds: string[];
  createdAt: string;
}

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>; // chatId -> Message[]
  activeChatId: string | null;
}

const initialState: ChatState = {
  chats: [],
  messages: {},
  activeChatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createNewChat(
      state,
      action: PayloadAction<{
        chatId: string;
        userId: string;
        text: string;
      }>
    ) {
      const { chatId, userId, text } = action.payload;
      const timestamp = new Date().toISOString();

      // Add chat metadata
      state.chats.unshift({
        id: chatId,
        userId,
        title: text.slice(0, 30),
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      // Add initial messages
      const userMessageId = uuidv4();
      const botMessageId = uuidv4();

      state.messages[chatId] = [
        {
          id: userMessageId,
          chatId,
          sender: "user",
          message: text,
          markdownResponse: "",
          fileIds: [],
          createdAt: timestamp,
        },
        {
          id: botMessageId,
          chatId,
          sender: "system",
          message: "This is a response.",
          markdownResponse: "This is a response.",
          fileIds: [],
          createdAt: timestamp,
        },
      ];

      state.activeChatId = chatId;
    },

    sendMessage(state, action: PayloadAction<{ text: string }>) {
      const chatId = state.activeChatId;
      if (!chatId) return;

      const chat = state.chats.find((c) => c.id === chatId);
      if (!chat) return;

      const timestamp = new Date().toISOString();
      const userMessageId = uuidv4();
      const botMessageId = uuidv4();

      state.messages[chatId] = state.messages[chatId] || [];

      state.messages[chatId].push({
        id: userMessageId,
        chatId,
        sender: "user",
        message: action.payload.text,
        markdownResponse: "",
        fileIds: [],
        createdAt: timestamp,
      });

      state.messages[chatId].push({
        id: botMessageId,
        chatId,
        sender: "system",
        message: "This is a response.",
        markdownResponse: "This is a response.",
        fileIds: [],
        createdAt: timestamp,
      });

      // Update title if it's still default or empty
      if (chat.title === "New Chat" || !chat.title.trim()) {
        chat.title = action.payload.text.slice(0, 30);
      }

      chat.updatedAt = timestamp;
    },

    setActiveChat(state, action: PayloadAction<string | null>) {
      state.activeChatId = action.payload;
    },

    renameChat(state, action: PayloadAction<{ id: string; title: string }>) {
      const chat = state.chats.find((c) => c.id === action.payload.id);
      if (chat) {
        chat.title = action.payload.title;
        chat.updatedAt = new Date().toISOString();
      }
    },

    deleteChat(state, action: PayloadAction<string>) {
      const chatId = action.payload;
      state.chats = state.chats.filter((c) => c.id !== chatId);
      delete state.messages[chatId];

      if (state.activeChatId === chatId) {
        state.activeChatId = state.chats.length ? state.chats[0].id : null;
      }
    },
  },
});

export const {
  createNewChat,
  sendMessage,
  setActiveChat,
  renameChat,
  deleteChat,
} = chatSlice.actions;

export default chatSlice.reducer;
