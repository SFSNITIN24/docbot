import React from "react";
import styled from "styled-components";
import { AuthLogo } from "../utils/images";
import type { AuthLayoutProps } from "./AuthLayout.interface";
import { BackArrowIcon } from "../utils/svg";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  dashboardUrl = "#",
  topRightContent,
  title,
  text,
  formMaxWidth,
  otherText,
}) => {
  return (
    <Container>
      <ContentSection>
        <Header>
          <HeaderLeft href={dashboardUrl}>
            <IconWrapper>
              <BackArrowIcon />
            </IconWrapper>
            <DashboardLink>Return Dashboard</DashboardLink>
          </HeaderLeft>
          <TopRightContent>{topRightContent}</TopRightContent>
        </Header>
        <CenteredForm>
          <FormWrapper maxWidth={formMaxWidth}>
            <img src={AuthLogo} alt="auth logo" />
            <TextWrapper>
              {title && <p className="title">{title}</p>}
              {text && <p className="text" dangerouslySetInnerHTML={{ __html: text }} />}
              {otherText &&  <p className="other" dangerouslySetInnerHTML={{ __html: otherText }} />}
            </TextWrapper>
            <Content>{children}</Content>
          </FormWrapper>
        </CenteredForm>
        <Footer>Copyright 2020-2025 DOCBOT. All rights Reserved</Footer>
      </ContentSection>
    </Container>
  );
};

export default AuthLayout;
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;
const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 24px;
`;

const HeaderLeft = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  color: #1c1c1c;
  text-decoration: none;
`;

const DashboardLink = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  color: #1c1c1c;
  @media (max-width: 480px) {
    display: none;
  }
`;

const TopRightContent = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #424242;
  @media (max-width: 768px) {
    font-size: 12px;
  }

  a {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #62a8bf;
    text-decoration: none;
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;
const ContentSection = styled.div`
  flex: 1;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  align-items: stretch;
  min-height: 100vh;
  padding: 36px 46px;

  @media (max-width: 768px) {
    padding: 24px 34px;
  }
  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const CenteredForm = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div<{ maxWidth?: string }>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || "420px"};
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 120%;
    text-align: center;
    color: #212121;
    font-family: "Manrope";
    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
  .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: #424242;
    font-family: "Manrope";
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  .other {
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
    letter-spacing: 0%;
    text-align: center;
    color: #1c1c1c;
    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const Footer = styled.footer`
  text-align: center;
  font-family: "Manrope";
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #3d3d3d;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
