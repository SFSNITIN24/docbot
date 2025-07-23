import styled from "styled-components";
import { AuthLogo } from "../utils/images";
import { IconWrapper } from "./CommonStyle";
import { BackArrowIcon } from "../utils/svg";
import React from "react";
import { useNavigate } from "react-router-dom";

interface UserAccountLayoutProps {
  children: React.ReactNode;
  chatUrl?: string;
  padding?: string;
}

const UserAccountLayout: React.FC<UserAccountLayoutProps> = ({
  children,
  chatUrl = "#",
  padding,
}) => {
  const navigate = useNavigate();

  return (
    <OrganizationContainer>
      <Header>
        <img src={AuthLogo} alt="auth logo" />
        <div className="avatar">👤</div>
      </Header>
      <Content padding={padding}>
        <ContentTop onClick={() => navigate(chatUrl)}>
          <IconWrapper>
            <BackArrowIcon />
          </IconWrapper>
          <ChatLink>Return Chat</ChatLink>
        </ContentTop>
        <ContentBottom>{children}</ContentBottom>
      </Content>
    </OrganizationContainer>
  );
};

export default UserAccountLayout;
const OrganizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  background: #f7f7f7;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 120px;
  border-bottom: 1px solid #b9b9b9;
  @media (max-width: 1024px) {
    padding: 10px 60px;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #888;
    cursor: pointer;
  }
`;
const Content = styled.div<{ padding?: string }>`
  margin-top: 80px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 80px);
  width: 100%;
  padding: ${({ padding }) => padding || "25px 120px"};
  overflow-y: auto;
  @media (max-width: 1024px) {
    padding: 10px 60px;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ContentTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #1c1c1c;
  width: 100%;
`;

const ChatLink = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  color: #1c1c1c;
`;

const ContentBottom = styled.div`
  width: 100%;
  margin-top: 32px;
`;
