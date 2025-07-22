import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f7f7f7;
  .mobile-sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
`;

export const Sidebar = styled(motion.div)<{ minimized: boolean }>`
  background: #f9f9fa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  position: relative;
  padding-top: 12px;
  overflow: hidden;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1100;
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
    &.mobile-open {
      transform: translateX(0);
    }
  }
`;

export const SidebarTop = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  padding: 0px 16px;
`;

export const SidebarMiddle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0px 16px;
`;

export const Logo = styled.img<{ minimized: boolean }>`
  width: 45px;
  height: 50px;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 4px;
  font-size: 22px;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
`;

export const Nav = styled.ul<{ minimized: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  margin-top: 12px;
`;
export const AI = styled.ul<{ minimized: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  margin-top: 16px;
`;

export const NavItem = styled.li<{ minimized: boolean }>`
  padding: 10px;
  font-family: "Manrope";
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #1c1c1c;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-start;
  ${({ minimized }) =>
    minimized &&
    css`
      justify-content: center;
    `}
  &:hover {
    background: #e7e7e7;
    border-radius: 9px;
  }
`;
export const ChatNavItem = styled.li<{ minimized: boolean }>`
  padding: 10px;
  font-family: "Manrope";
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: #1c1c1c;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-start;
  ${({ minimized }) =>
    minimized &&
    css`
      justify-content: center;
      padding: 12px 0;
      font-size: 22px;
    `}
  &:hover {
    background: #e7e7e7;
    border-radius: 9px;
    padding: 10px;
  }
`;

export const NavText = styled.span<{ minimized: boolean }>`
  display: ${({ minimized }) => (minimized ? "none" : "inline")};
`;
export const ChatNavText = styled.span<{ minimized: boolean }>`
  display: ${({ minimized }) => (minimized ? "none" : "inline")};
`;

export const ChatHistory = styled.div<{ minimized: boolean }>`
  flex: 1;
  padding: 12px 0 0 0;
`;

export const SectionLabel = styled.div<{ minimized: boolean }>`
  font-family: "Manrope";
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #1c1c1c;
  display: ${({ minimized }) => (minimized ? "none" : "block")};
  margin-bottom: 6px;
`;

export const UpgradePlan = styled.div<{ minimized: boolean }>`
  width: 100%;
  height: 62px;
  padding: 12px;
  align-items: center;
  gap: 6px;
  background: #e7e7e7;
  font-family: Manrope;
  display: ${({ minimized }) => (minimized ? "none" : "flex")};
  z-index: 2;
  .upgrade-content {
    font-family: Manrope;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    flex-direction: column;
    color: #1c1c1c;
    p {
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0%;
    }
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      letter-spacing: 0%;
    }
  }
`;

export const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 12px 30px;
`;

export const TopBar = styled.div`
  height: 55px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PremiumButton = styled.button`
  background: #daeeff;
  color: #62a8bf;
  border: none;
  border-radius: 100px;
  padding: 10px;
  font-family: "Manrope";
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  margin-right: 16px;
  cursor: pointer;
`;

export const TokensLeft = styled.div`
  background: #ffe8e0;
  color: #ff7c54;
  border-radius: 16px;
  padding: 5px 10px;
  font-family: "Manrope";
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;

  margin-right: 12px;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #888;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BotImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 38px;
`;

export const HelpText = styled.div`
  font-family: "Manrope";
  font-weight: 700;
  font-size: 20px;
  color: #242424;
  line-height: 120%;
  margin-bottom: 16px;
`;

export const MessageInputWrapper = styled.div`
  min-width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f4f4f4cc;
  border-radius: 12px;
  padding: 16px 12px;
  @media (max-width: 768px) {
    min-width: 400px;
    max-width: 400px;
  }
  @media (max-width: 480px) {
    min-width: 100%;
    width: 100%;
    max-width: 100%;
  }
`;

export const MessageInput = styled.input`
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

export const MoreIconWrapper = styled.div`
  margin-left: auto;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  position: relative;
  ${ChatNavItem}:hover & {
    opacity: 1;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 32px;
  padding: 4px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  z-index: 10;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const DropdownItem = styled.div`
  padding: 8px 6px;
  cursor: pointer;
  color: black;
  border-radius: 6px;
  &:hover {
    background: #62a8bf;
    color: white;
  }
`;

export const DropdownItemDelete = styled(DropdownItem)`
  color: #fb4a49;
  background: #fff;
  border-radius: 6px;
  &:hover {
    background: #fb4a49;
    color: white;
  }
`;

export const CustomDropdown = styled.div`
  position: relative;
  display: inline-block;
  min-width: 140px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CustomDropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: "Manrope";
  font-weight: 500;
  font-size: 14px;
  color: #1c1c1c;
  min-width: 120px;
  user-select: none;
  line-height: 150%;
  gap: 8px;
  span {
    min-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CustomDropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
  min-width: 140px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-12px) scale(0.94);
  pointer-events: none;
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  &.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  &.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
`;

export const CustomDropdownOption = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
  font-family: "Manrope";
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #1c1c1c;
  background: transparent;
  &:hover {
    background: #f0f4f8;
    border-radius: 8px;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    p {
      font-weight: 400;
      color: #a0a7b1;
    }
  }
`;

export const CustomDropdownCircle = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #a0a7b1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: "Manrope";
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #1c1c1c;
  text-align: center;
`;

export const RightAdContainer = styled.div`
  width: 177px;
  min-width: 177px;
  background: #f5f5f5;
  margin-left: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
  font-size: 2rem;
  height: 100%;
`;

export const AdBanner = styled.div`
  width: 100%;
  height: 80px;
  background: #f5f5f5;
  margin-bottom: 24px;
  margin-top: 32px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
  font-size: 2rem;
`;

export const MobileMenuIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block !important;
  }
`;
export const MobileCloseIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block !important;
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AdsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
