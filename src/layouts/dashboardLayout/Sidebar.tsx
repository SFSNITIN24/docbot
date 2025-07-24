import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { renameChat, setActiveChat } from "../../store/slices/chatSlice";

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
  setDeleteChatId: (value: React.SetStateAction<string | null>) => void;
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
  setDeleteChatModal,
  setDeleteChatId,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chat);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editedLabel, setEditedLabel] = useState<string>("");

  const navItems = useMemo(
    () => [
      {
        icon: <NewChatPencilIcon />,
        label: "New chat",
        onClick: () => {
          dispatch(setActiveChat(null));
          navigate("/chat?model=auto");
        },
      },
      { icon: <SearchIcon />, label: "Search chats" },
      { icon: <SidebarFeaturesIcon />, label: "Features" },
    ],
    [dispatch, navigate]
  );

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

  const groupedChats = useMemo(() => {
    const groups: Record<string, typeof chats> = {};

    chats.forEach((chat) => {
      const dayLabel = dayjs(chat.createdAt).isSame(dayjs(), "day")
        ? "Today"
        : dayjs(chat.createdAt).isSame(dayjs().subtract(1, "day"), "day")
        ? "Yesterday"
        : dayjs(chat.createdAt).format("DD MMM YYYY");

      if (!groups[dayLabel]) groups[dayLabel] = [];
      groups[dayLabel].push(chat);
    });

    return groups;
  }, [chats]);

  const handleRenameSubmit = useCallback(
    (id: string, newTitle: string) => {
      dispatch(renameChat({ id, title: newTitle }));
      setEditingKey(null);
    },
    [dispatch]
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
      transition={{ duration: 0.34, ease: "easeInOut" }}
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
            {Object.entries(groupedChats)?.map(([label, items]) => (
              <React.Fragment key={label}>
                <SectionLabel minimized={sidebarMinimized}>
                  {label}
                </SectionLabel>
                {items?.map((item) => {
                  const menuKey = item.id;
                  const isEditing = editingKey === menuKey;
                  return (
                    <ChatNavItem
                      key={item.id}
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
                        <ChatNavText
                          minimized={sidebarMinimized}
                          onClick={() => {
                            dispatch(setActiveChat(item.id));
                            navigate(`/chat/c/${item.id}`);
                          }}
                        >
                          {item.title}
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
                              setEditedLabel(item.title);
                              setOpenMenuKey(null);
                            }}
                          >
                            Rename
                          </DropdownItem>
                          <DropdownItemDelete
                            onClick={() => {
                              setDeleteChatModal(true);
                              setDeleteChatId(item.id);
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
