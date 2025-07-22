import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AIIcon,
  ArrowDownIcon,
  ChatThreeDotIcon,
  DropDownCheckIcon,
  MessageSendIcon,
  NewChatPencilIcon,
  SearchIcon,
  SidebarExpandableIcon,
  SidebarFeaturesIcon,
  UpgradeIcon,
  UploadFileInChatIcon,
  HamburgerMenuIcon,
  ModalCrossIcon,
} from "../../utils/svg";
import { Circle } from "../../components/CommonCircle";
import {
  AI,
  BotImage,
  ChatCard,
  ChatHistory,
  ChatNavItem,
  ChatNavText,
  Container,
  DropdownItem,
  DropdownItemDelete,
  DropdownMenu,
  HelpText,
  Logo,
  MainContent,
  MainSection,
  MessageInput,
  MessageInputWrapper,
  MoreIconWrapper,
  Nav,
  NavItem,
  NavText,
  PremiumButton,
  SectionLabel,
  Sidebar,
  SidebarMiddle,
  SidebarTop,
  ToggleButton,
  TokensLeft,
  TopBar,
  UpgradePlan,
  UserAvatar,
  CustomDropdown,
  CustomDropdownTrigger,
  CustomDropdownMenu,
  CustomDropdownOption,
  CustomDropdownCircle,
  Footer,
  RightAdContainer,
  AdBanner,
  MobileMenuIcon,
  AdsWrapper,
  AvatarWrapper,
  ButtonWrapper,
} from "./style";
import { AuthLogo } from "../../utils/images";
import CommonButton from "../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import {
  IconWrapper,
  CommonMotionDropdown,
} from "../../components/CommonStyle";

const navItems = [
  { icon: <NewChatPencilIcon />, label: "New chat" },
  { icon: <SearchIcon />, label: "Search chats" },
  { icon: <SidebarFeaturesIcon />, label: "Features" },
];
const aiItems = [
  {
    icon: (
      <Circle bg="#E7E7E7" width="20px" height="20px">
        <AIIcon />
      </Circle>
    ),
    label: "DocBot",
  },
  {
    icon: (
      <Circle bg="#E7E7E7" width="20px" height="20px">
        <AIIcon />
      </Circle>
    ),
    label: "Other Feature",
  },
];

const chatHistoryGroups = [
  {
    label: "Today",
    items: [
      { label: "Suggest Monthly Contribu..." },
      { label: "What Medic We app..." },
      { label: "Other Chat name" },
    ],
  },
  {
    label: "Yesterday",
    items: [{ label: "Other Chat name" }],
  },
];

const featureOptions = [
  { value: "DocBot", label: "DocBot" },
  { value: "Feature Name", label: "Feature Name" },
];

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adPosition, setAdPosition] = useState<"top" | "right">("top");
  const [showAd, setShowAd] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );

  const login = false;

  const handleClick = useCallback(
    (path: string) => () => navigate(path),
    [navigate]
  );

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

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <Container>
      {mobileSidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <Sidebar
        minimized={isMobile ? false : sidebarMinimized}
        className={mobileSidebarOpen ? "mobile-open" : ""}
        onClick={(e) => e.stopPropagation()}
        animate={{
          width: isMobile ? 260 : sidebarMinimized ? 60 : 260,
        }}
        initial={false}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      >
        <SidebarTop>
          {!sidebarMinimized && (
            <Logo src={AuthLogo} alt="Logo" minimized={sidebarMinimized} />
          )}
          {isMobile ? (
            <IconWrapper onClick={() => setMobileSidebarOpen(false)}>
              <ModalCrossIcon color="black" />
            </IconWrapper>
          ) : (
            <ToggleButton
              aria-label={
                sidebarMinimized ? "Expand sidebar" : "Minimize sidebar"
              }
              onClick={() => setSidebarMinimized((m) => !m)}
              title={sidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
            >
              <SidebarExpandableIcon />
            </ToggleButton>
          )}
        </SidebarTop>
        <SidebarMiddle>
          <Nav minimized={sidebarMinimized}>
            {navItems?.map((item) => (
              <NavItem key={item.label} minimized={sidebarMinimized}>
                <span>{item.icon}</span>
                <NavText minimized={sidebarMinimized}>{item.label}</NavText>
              </NavItem>
            ))}
          </Nav>
          <AI minimized={sidebarMinimized}>
            {aiItems?.map((item) => (
              <NavItem key={item.label} minimized={sidebarMinimized}>
                <span>{item.icon}</span>
                <NavText minimized={sidebarMinimized}>{item.label}</NavText>
              </NavItem>
            ))}
          </AI>
          {!sidebarMinimized && (
            <ChatHistory minimized={sidebarMinimized}>
              {chatHistoryGroups?.map((group) => (
                <React.Fragment key={group.label}>
                  <SectionLabel minimized={sidebarMinimized}>
                    {group.label}
                  </SectionLabel>
                  {group?.items?.map((item, idx) => {
                    const menuKey = `${group.label}-${idx}`;
                    return (
                      <ChatNavItem
                        key={item.label}
                        minimized={sidebarMinimized}
                        style={{ position: "relative" }}
                        onMouseLeave={() => setOpenMenuKey(null)}
                      >
                        <ChatNavText minimized={sidebarMinimized}>
                          {item.label}
                        </ChatNavText>
                        <MoreIconWrapper
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuKey((prev) =>
                              prev === menuKey ? null : menuKey
                            );
                          }}
                          style={{
                            visibility:
                              openMenuKey === menuKey ? "visible" : undefined,
                          }}
                        >
                          <ChatThreeDotIcon />
                        </MoreIconWrapper>
                        {openMenuKey === menuKey && (
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => {
                                /* handleRename */
                              }}
                            >
                              Rename
                            </DropdownItem>
                            <DropdownItemDelete
                              onClick={() => {
                                /* handleDelete */
                              }}
                            >
                              Delete
                            </DropdownItemDelete>
                          </DropdownMenu>
                        )}
                      </ChatNavItem>
                    );
                  })}
                </React.Fragment>
              ))}
            </ChatHistory>
          )}
        </SidebarMiddle>
        <UpgradePlan minimized={sidebarMinimized}>
          <UpgradeIcon />

          <div className="upgrade-content">
            <p>Upgrade Plan</p>
            <span style={{ fontSize: 12 }}>
              More: Access to the best models
            </span>
          </div>
        </UpgradePlan>
      </Sidebar>
      <MainSection>
        <TopBar>
          <MobileMenuIcon className="mobile-menu-icon">
            <IconWrapper onClick={() => setMobileSidebarOpen(true)}>
              <HamburgerMenuIcon />
            </IconWrapper>
          </MobileMenuIcon>
          <CustomDropdown ref={dropdownRef}>
            <CustomDropdownTrigger
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <span>{selectedFeature || "The Current Feature"}</span>
              <ArrowDownIcon />
            </CustomDropdownTrigger>
            <CommonMotionDropdown open={dropdownOpen} className="open">
              <CustomDropdownMenu className="open">
                {featureOptions?.map((option) => (
                  <CustomDropdownOption
                    key={option.value}
                    className={
                      selectedFeature === option.value ? "selected" : ""
                    }
                    onClick={() => {
                      setSelectedFeature(option.value);
                      setDropdownOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {selectedFeature === option.value ? (
                      <DropDownCheckIcon />
                    ) : (
                      <CustomDropdownCircle />
                    )}
                  </CustomDropdownOption>
                ))}
              </CustomDropdownMenu>
            </CommonMotionDropdown>
          </CustomDropdown>
          {login ? (
            <>
              <PremiumButton>+ Premium</PremiumButton>

              <AvatarWrapper>
                <AdsWrapper>
                  <button
                    onClick={() =>
                      setAdPosition(adPosition === "top" ? "right" : "top")
                    }
                    style={{
                      padding: "4px 8px",
                      background: "#f0f0f0",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Ad: {adPosition}
                  </button>
                  <button
                    onClick={() => setShowAd(!showAd)}
                    style={{
                      padding: "4px 8px",
                      background: showAd ? "#e0f0e0" : "#f0e0e0",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {showAd ? "Hide Ad" : "Show Ad"}
                  </button>
                </AdsWrapper>
                <TokensLeft>Tokens left: 4</TokensLeft>
                <UserAvatar>👤</UserAvatar>
              </AvatarWrapper>
            </>
          ) : (
            <ButtonWrapper>
              <CommonButton
                border="1px solid #000000"
                bgColor="#fff"
                bgHoverColor="#fff"
                borderRadius="100px"
                color="#000"
                height="32px"
                fontSize="14px"
                width="80px"
                onClick={handleClick("/")}
              >
                Log in
              </CommonButton>
              <CommonButton
                bgColor="#62A8BF"
                border="none"
                bgHoverColor="#62A8BF"
                borderRadius="100px"
                height="32px"
                fontSize="14px"
                width="80px"
                onClick={handleClick("/create-account")}
              >
                Sign up
              </CommonButton>
            </ButtonWrapper>
          )}
        </TopBar>
        {showAd && adPosition === "top" && (
          <AdBanner>
            <div>Ad Space (Top)</div>
          </AdBanner>
        )}
        {adPosition === "right" ? (
          <div style={{ display: "flex", flex: 1 }}>
            <MainContent>
              <ChatCard>
                <BotImage src={AuthLogo} alt="Bot" />
                <HelpText>What can I help with ?</HelpText>
                <MessageInputWrapper>
                  <UploadFileInChatIcon />
                  <MessageInput placeholder="Message DocBot AI Code" />
                  <Circle bg="#62A8BF" width="24px" height="24px">
                    <MessageSendIcon />
                  </Circle>
                </MessageInputWrapper>
              </ChatCard>
            </MainContent>
            {showAd && (
              <RightAdContainer>
                <div>Ad Space (Right)</div>
              </RightAdContainer>
            )}
          </div>
        ) : (
          <MainContent>
            <ChatCard>
              <BotImage src={AuthLogo} alt="Bot" />
              <HelpText>What can I help with ?</HelpText>
              <MessageInputWrapper>
                <UploadFileInChatIcon />
                <MessageInput placeholder="Message DocBot AI Code" />
                <Circle bg="#62A8BF" width="24px" height="24px">
                  <MessageSendIcon />
                </Circle>
              </MessageInputWrapper>
            </ChatCard>
          </MainContent>
        )}
        <Footer>
          DocBot A1 Coder can make mistakes. Check important info.
        </Footer>
      </MainSection>
    </Container>
  );
};

export default DashboardLayout;
