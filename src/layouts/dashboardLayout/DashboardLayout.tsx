import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Container,
  MainSection,
  Footer,
  OutletContainer,
  LeftAd,
  Center,
  TopAd,
  Chat,
} from "./style";
import { deleteChat, setActiveChat } from "../../store/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AdminProfile from "../../pages/public/adminProfile";
import Profile from "../../pages/private/profile";
import ChangePassword from "../../pages/public/changePassword";
import TwoFactor from "../../pages/private/twoFactor";
import Header from "./Header";
import DashboardSidebar from "./Sidebar";
import ModalComponent from "../../components/CommonModal";
import CommonUpgradeModal from "../../components/CommonUpgradeModal";
import CommonDeleteModal from "../../components/CommonDeleteModal";
import ChatPage from "../../pages/private/chat";

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownToastRef = useRef(false);

  const { user: loggedUser } = useAppSelector((state) => state.auth);
  const userType = loggedUser?.type;
  const { chats } = useAppSelector((state) => state.chat);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
  const [deleteChatModal, setDeleteChatModal] = useState(false);
  const [deleteChatId, setDeleteChatId] = useState<string | null>("");

  const params = new URLSearchParams(location.search);
  const model = params.get("model");
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname === "/chat" && (model === "auto" || model === null)) {
      navigate(`/chat?model=auto`);
    }
  }, [model, pathname]);

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

  const pathnameParts = pathname.split("/");
  const isChatDetailPath =
    pathnameParts[1] === "chat" && pathnameParts[2] === "c";
  const urlChatId = pathnameParts[3];

  useEffect(() => {
    if (isChatDetailPath && urlChatId) {
      const chatExists = chats.some((chat) => chat.id === urlChatId);

      if (!chatExists && !hasShownToastRef.current) {
        toast.warning("Unable to load this conversation.");
        hasShownToastRef.current = true;
        dispatch(setActiveChat(null));
        navigate("/chat?model=auto");
      }
    }
  }, [pathname, chats, navigate]);

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
        setDeleteChatModal={setDeleteChatModal}
        setDeleteChatId={setDeleteChatId}
      />
      <MainSection>
        <Header
          setMobileSidebarOpen={setMobileSidebarOpen}
          setProfileModalOpen={setProfileModalOpen}
          setChangePasswordModalOpen={setChangePasswordModalOpen}
          setTwoFactorModalOpen={setTwoFactorModalOpen}
          type={userType}
        />
        <OutletContainer>
          <LeftAd>left add</LeftAd>
          <Center>
            <TopAd>Top content</TopAd>
            <Chat>
              <ChatPage />
            </Chat>
          </Center>
          <LeftAd>right add</LeftAd>
        </OutletContainer>
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
            bghovercolor="#62A8BF"
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
          {userType === "enterprise" ? <AdminProfile /> : <Profile />}
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
      {deleteChatModal && (
        <ModalComponent
          openModal={deleteChatModal}
          setOpenModal={setDeleteChatModal}
          width={"468px"}
        >
          <CommonDeleteModal
            title="Delete Chat"
            description="Are you sure you want to DELETE this chat?"
            onConfirm={() => {
              if (deleteChatId !== null) {
                dispatch(deleteChat(deleteChatId));
              }
              setDeleteChatModal(false);
            }}
            onCancel={() => setDeleteChatModal(false)}
          />
        </ModalComponent>
      )}
    </Container>
  );
};

export default DashboardLayout;
