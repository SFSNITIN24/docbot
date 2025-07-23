import React from "react";
import {
  AIIcon,
  ChatThreeDotIcon,
  NewChatPencilIcon,
  SearchIcon,
  SidebarExpandableIcon,
  SidebarFeaturesIcon,
  UpgradeIcon,
  ModalCrossIcon,
} from "../../utils/svg";
import { Circle } from "../../components/CommonCircle";
import {
  AI,
  ChatHistory,
  ChatNavItem,
  ChatNavText,
  DropdownItem,
  DropdownItemDelete,
  DropdownMenu,
  Logo,
  MoreIconWrapper,
  Nav,
  NavItem,
  NavText,
  SectionLabel,
  Sidebar,
  SidebarMiddle,
  SidebarTop,
  ToggleButton,
  UpgradePlan,
} from "./style";
import { AuthLogo } from "../../utils/images";
import { IconWrapper } from "../../components/CommonStyle";

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

interface SidebarProps {
  sidebarMinimized: boolean;
  setSidebarMinimized: (value: React.SetStateAction<boolean>) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (value: React.SetStateAction<boolean>) => void;
  isMobile: boolean;
  openMenuKey: string | null;
  setOpenMenuKey: (value: React.SetStateAction<string | null>) => void;
  setUpgradeModalOpen: (value: React.SetStateAction<boolean>) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({
  sidebarMinimized,
  setSidebarMinimized,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  isMobile,
  openMenuKey,
  setOpenMenuKey,
  setUpgradeModalOpen,
}) => {
  return (
    <Sidebar
      minimized={isMobile ? false : sidebarMinimized}
      className={mobileSidebarOpen ? "mobile-open" : ""}
      onClick={(e) => e.stopPropagation()}
      animate={{
        width: isMobile ? 260 : sidebarMinimized ? 60 : 260,
      }}
      initial={false}
      transition={{
        duration: 0.34,
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
      <UpgradePlan
        minimized={sidebarMinimized}
        onClick={() => setUpgradeModalOpen(true)}
      >
        <UpgradeIcon />

        <div className="upgrade-content">
          <p>Upgrade Plan</p>
          <span style={{ fontSize: 12 }}>
            More: Access to the best models
          </span>
        </div>
      </UpgradePlan>
    </Sidebar>
  );
};

export default DashboardSidebar; 