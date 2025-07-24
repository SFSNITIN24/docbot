import styled from "styled-components";
import { AuthLogo } from "../../../../utils/images";
import { MessageSendIcon, UploadFileInChatIcon } from "../../../../utils/svg";
import { Circle } from "../../../../components/CommonCircle";
import React from "react";

export interface Message {
  sender: string;
  message: string;
}

interface ChatCardProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (text: string) => void;
  lastMessageRef: React.RefObject<HTMLDivElement | null>;
  inputWrapperRef: React.RefObject<HTMLDivElement | null>;
  messages: Message[];
}

const ChatCard: React.FC<ChatCardProps> = ({
  inputText,
  setInputText,
  handleSendMessage,
  lastMessageRef,
  inputWrapperRef,
  messages,
}) => {
  return (
    <Wrapper>
      {messages.length === 0 ? (
        <NoMessageContainer>
          <BotImage src={AuthLogo} alt="Bot" />
          <HelpText>What can I help with?</HelpText>

          <InputWrapper ref={inputWrapperRef}>
            <UploadFileInChatIcon />
            <MessageInput
              placeholder="Message DocBot AI Code"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputText.trim()) {
                  handleSendMessage(inputText.trim());
                  setInputText("");
                }
              }}
            />
            <Circle
              bg="#62A8BF"
              width="24px"
              height="24px"
              onClick={() => {
                if (inputText.trim()) {
                  handleSendMessage(inputText.trim());
                  setInputText("");
                }
              }}
            >
              <MessageSendIcon />
            </Circle>
          </InputWrapper>
        </NoMessageContainer>
      ) : (
        <>
          <MessageList hasMessages={true}>
            {messages.map((msg, i) => (
              <MessageRow
                key={i}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
                ref={i === messages.length - 1 ? lastMessageRef : null}
              >
                <div className="message-text">{msg.message}</div>
              </MessageRow>
            ))}
          </MessageList>

          <InputWrapper ref={inputWrapperRef}>
            <UploadFileInChatIcon />
            <MessageInput
              placeholder="Message DocBot AI Code"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputText.trim()) {
                  handleSendMessage(inputText.trim());
                  setInputText("");
                }
              }}
            />
            <Circle
              bg="#62A8BF"
              width="24px"
              height="24px"
              onClick={() => {
                if (inputText.trim()) {
                  handleSendMessage(inputText.trim());
                  setInputText("");
                }
              }}
            >
              <MessageSendIcon />
            </Circle>
          </InputWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ChatCard;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const MessageList = styled.div<{ hasMessages: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${({ hasMessages }) => (hasMessages ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  justify-content: ${({ hasMessages }) =>
    hasMessages ? "flex-start" : "center"};
  align-items: center;
  gap: 12px;
`;

const MessageRow = styled.div`
  width: 100%;
  display: flex;

  &.user-message {
    justify-content: flex-end;
    .message-text {
      background-color: #e7e7e7;
    }
  }

  &.bot-message {
    justify-content: flex-start;
    .message-text {
      background-color: transparent;
    }
  }

  .message-text {
    border-radius: 6px 0px 6px 6px;
    padding: 10px 16px;
    font-family: "Manrope";
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #1c1c1c;
    white-space: pre-wrap;
    word-break: break-word;
    max-width: 70%;
    box-sizing: border-box;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f4f4f4cc;
  border-radius: 12px;
  padding: 16px 12px;
  width: 100%;
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: "Manrope";
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  &::placeholder {
    color: #a9a9a9;
  }
`;

const BotImage = styled.img`
  width: 120px;
  height: 120px;
`;

const HelpText = styled.div`
  font-family: "Manrope";
  font-weight: 700;
  font-size: 20px;
  color: #242424;
  line-height: 120%;
  margin-top: 16px;
`;

const NoMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:16px;
`;
