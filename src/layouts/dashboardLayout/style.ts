
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f7f7f7;
  width: 100%;
  overflow: hidden;
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
  min-width: ${({ minimized }) => (minimized ? "60px" : "260px")};
  width: ${({ minimized }) => (minimized ? "60px" : "260px")};
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
  &:hover {
    background: #e7e7e7;
    padding: 4px;
    border-radius: 6px;
  }
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
export const ChatNavItem = styled.li<{
  minimized: boolean;
  urlChatId?: string;
}>`
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
  transition: opacity 0.3s ease;
`;
export const ChatNavText = styled.span<{ minimized: boolean }>`
  display: ${({ minimized }) => (minimized ? "none" : "inline")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  height: 100%;
  min-height: 0;
  gap: 32px;
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
  cursor: pointer;
  display: flex;
  gap:10px;
  align-items:center;
`;

export const TokensLeft = styled.div`
  background: #ffe8e0;
  color: #ff7c54;
  border-radius: 16px;
  padding: 5px 10px;
  font-family: "Manrope";
  font-weight: 500;
  font-size: 14px;
`;

export const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #e7e7e7;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
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


export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 10px;
  right: -30px;
  min-width: 220px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  padding: 12px;
  z-index: 200;
`;
export const AvatarDropdownitemStyle = styled.div<{ label?: string }>`
  height: 40px;
  padding: 8px 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ label }) => (label === "Logout" ? "#fb4a49" : "#1c1c1c")};
  .avatar-text {
    font-family: "Manrope";
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
  }
  &:hover {
    background: #62a8bf;
    color: ${({ label }) => (label === "Logout" ? "#fb4a49" : "#ffffff")};
  }
`;

export const OutletContainer = styled.div`
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  gap: 17px;

  @media (max-width: 1024px) {
    gap: 0;
  }
`;

export const LeftAd = styled.div`
  min-width: 177px;
  max-width: 177px;
  border-radius: 12px;
  background: #f5f5f5;
   display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 17px;
  overflow: hidden;
`;

export const TopAd = styled.div`
  width: 100%;
  height: 177px;
  border-radius: 12px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Chat = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;
