import React, { useState, useRef, useEffect } from "react";
import {
  MessageSendIcon,
  UploadFileInChatIcon,
} from "../../utils/svg";
import {
  Container,
  MainContent,
  MainSection,
  MessageInput,
  MessageInputWrapper,
  Footer,
  RightAdContainer,
  AdBanner,
  MainContentWrapper,
  BotImage,
  HelpText,
  ChatCard,
} from "./style";
import { AuthLogo } from "../../utils/images";
import ModalComponent from "../../components/CommonModal";
import CommonUpgradeModal from "../../components/CommonUpgradeModal";
import Profile from "../../pages/public/profile";
import ChangePassword from "../../pages/public/changePassword";
import TwoFactor from "../../pages/public/twoFactor";
import DashboardSidebar from "./Sidebar";
import { Circle } from "../../components/CommonCircle";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import AdminProfile from "../../pages/public/adminProfile";

const DashboardLayout: React.FC = () => {
 const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [adPosition, setAdPosition] = useState<"top" | "right">("top");
  const [showAd, setShowAd] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; text: string }[]
  >([]);
  
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "This is a response." },
      ]);
    }, 300);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && sidebarMinimized) {
      setSidebarMinimized(false);
    }
  }, [isMobile, sidebarMinimized]);

  return (
    <Container>
      {mobileSidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <DashboardSidebar
        sidebarMinimized={sidebarMinimized}
        setSidebarMinimized={setSidebarMinimized}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        isMobile={isMobile}
        openMenuKey={openMenuKey}
        setOpenMenuKey={setOpenMenuKey}
        setUpgradeModalOpen={setUpgradeModalOpen}
      />
      <MainSection>
        <Header
          setMobileSidebarOpen={setMobileSidebarOpen}
          setProfileModalOpen={setProfileModalOpen}
          setChangePasswordModalOpen={setChangePasswordModalOpen}
          setTwoFactorModalOpen={setTwoFactorModalOpen}
          adPosition={adPosition}
          setAdPosition={setAdPosition}
          showAd={showAd}
          setShowAd={setShowAd}
          type={type}
        />
        {showAd && adPosition === "top" && (
          <AdBanner>
            <div>Ad Space (Top)</div>
          </AdBanner>
        )}
        <MainContentWrapper showAd={showAd}>
          <MainContent>
            <ChatCard>
              {messages?.length === 0 ? (
                <>
                  <BotImage src={AuthLogo} alt="Bot" />
                  <HelpText>What can I help with ?</HelpText>
                </>
              ) : (
                messages?.map((msg, i) => (
                  <div
                    key={i}
                    className={
                      msg.type === "user" ? "user-message" : "bot-message"
                    }
                    style={{ margin: "8px 0" }}
                    ref={i === messages.length - 1 ? lastMessageRef : null}
                  >
                    <div className="message-text">{msg.text}</div>
                  </div>
                ))
              )}

              <MessageInputWrapper
                style={{
                  position: messages.length > 0 ? "sticky" : "static",
                  bottom: messages.length > 0 ? 0 : undefined,
                  zIndex: 10,
                  padding: "16px",
                  marginTop: messages.length === 0 ? "16px" : 0,
                }}
              >
                <UploadFileInChatIcon />
                <MessageInput
                  placeholder="Message DocBot AI Code"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Circle
                  bg="#62A8BF"
                  width="24px"
                  height="24px"
                  onClick={() => {
                    const input = document.querySelector(
                      "input[placeholder='Message DocBot AI Code']"
                    ) as HTMLInputElement;
                    handleSendMessage(input.value);
                    input.value = "";
                  }}
                >
                  <MessageSendIcon />
                </Circle>
              </MessageInputWrapper>
            </ChatCard>
          </MainContent>
          {showAd && adPosition === "right" && (
            <RightAdContainer>
              <div>Ad Space (Right)</div>
            </RightAdContainer>
          )}
        </MainContentWrapper>
        <Footer>
          DocBot A1 Coder can make mistakes. Check important info.
        </Footer>
      </MainSection>
      {upgradeModalOpen && (
        <ModalComponent
          openModal={upgradeModalOpen}
          setOpenModal={setUpgradeModalOpen}
        >
          <CommonUpgradeModal
            title="Upgrade Plan"
            description="Upgrade your plan to access {service_name}! Add {service_name} to your plan!”"
            onConfirm={() => {}}
            confirmText="Upgrade"
            cicleColor="#62A8BF"
            buttonColor="#62A8BF"
            bgHoverColor="#62A8BF"
            borderRadius="100px"
          />
        </ModalComponent>
      )}
      {profileModalOpen && (
        <ModalComponent
          openModal={profileModalOpen}
          setOpenModal={setProfileModalOpen}
          width={"468px"}
          height={"80vh"}
          overFlow="auto"
        >
          {type ==="enterprise" ? <AdminProfile /> : <Profile />}
        </ModalComponent>
      )}
      {changePasswordModalOpen && (
        <ModalComponent
          openModal={changePasswordModalOpen}
          setOpenModal={setChangePasswordModalOpen}
          width={"468px"}
        >
          <ChangePassword />
        </ModalComponent>
      )}
      {twoFactorModalOpen && (
        <ModalComponent
          openModal={twoFactorModalOpen}
          setOpenModal={setTwoFactorModalOpen}
          width={"468px"}
        >
          <TwoFactor />
        </ModalComponent>
      )}
    </Container>
  );
};

export default DashboardLayout;
