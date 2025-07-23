import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { AuthLogo } from "../../utils/images";
import { Circle } from "../../components/CommonCircle";
import { IconWrapper } from "../../components/CommonStyle";
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

const getNavItems = (navigate: ReturnType<typeof useNavigate>) => [
  {
    icon: <NewChatPencilIcon />,
    label: "New chat",
    onClick: () => navigate("/chat?model=auto"),
  },
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
      { label: "Suggest Monthly Contribusasasasasasasasasasa" },
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
  setDeleteChatModal: (value: React.SetStateAction<boolean>) => void;
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
  setDeleteChatModal
}) => {
  const navigate = useNavigate();
  const navItems = useMemo(() => getNavItems(navigate), [navigate]);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editedLabel, setEditedLabel] = useState<string>("");

  const handleRenameSubmit = useCallback(
    async (menuKey: string, newLabel: string) => {
      try {
        console.log("Renaming:", menuKey, "=>", newLabel);
        setEditingKey(null);
        // await API call here
      } catch (error) {
        console.error("Rename failed:", error);
        alert("Rename failed.");
      }
    },
    []
  );

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
            <NavItem
              key={item.label}
              minimized={sidebarMinimized}
              onClick={item.onClick}
            >
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
                  const isEditing = editingKey === menuKey;
                  return (
                    <ChatNavItem
                      key={item.label}
                      minimized={sidebarMinimized}
                      style={{ position: "relative" }}
                      onMouseLeave={() => setOpenMenuKey(null)}
                    >
                      {isEditing ? (
                        <input
                          value={editedLabel}
                          autoFocus
                          onChange={(e) => setEditedLabel(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameSubmit(menuKey, editedLabel);
                            }
                          }}
                          onBlur={() => setEditingKey(null)}
                          style={{
                            flex: 1,
                            fontSize: 12,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                          }}
                        />
                      ) : (
                        <ChatNavText minimized={sidebarMinimized}>
                          {item.label}
                        </ChatNavText>
                      )}

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
                              setEditingKey(menuKey);
                              setEditedLabel(item.label);
                              setOpenMenuKey(null);
                            }}
                          >
                            Rename
                          </DropdownItem>
                          <DropdownItemDelete
                            onClick={() => {
                              setDeleteChatModal(true);
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
          <span>More: Access to the best models</span>
        </div>
      </UpgradePlan>
    </Sidebar>
  );
};

export default DashboardSidebar;
