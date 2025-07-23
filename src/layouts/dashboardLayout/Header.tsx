import React, { useRef, useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownIcon,
  DropDownCheckIcon,
  HamburgerMenuIcon,
  LogoutIcon,
  DropDownLockIcon,
  DropDownFingerPrintIcon,
  DropDownCrownIcon,
  DropDownAvatarIcon,
  OrganizationSettingIcon,
} from "../../utils/svg";
import {
  TopBar,
  UserAvatar,
  CustomDropdown,
  CustomDropdownTrigger,
  CustomDropdownMenu,
  CustomDropdownOption,
  CustomDropdownCircle,
  PremiumButton,
  TokensLeft,
  MobileMenuIcon,
  AdsWrapper,
  AvatarWrapper,
  ButtonWrapper,
  DropDownWrapper,
  AvatarDropdownitemStyle,
} from "./style";
import CommonButton from "../../components/CommonButton";
import {
  IconWrapper,
  CommonMotionDropdown,
} from "../../components/CommonStyle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const featureOptions = [
  { value: "DocBot", label: "DocBot" },
  { value: "Feature Name", label: "Feature Name" },
];

const AvatarDropdownItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  color?: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <AvatarDropdownitemStyle onClick={onClick} label={label}>
    <IconWrapper>{icon}</IconWrapper>
    <p className="avatar-text">{label}</p>
  </AvatarDropdownitemStyle>
);

interface HeaderProps {
  setMobileSidebarOpen: (open: boolean) => void;
  setProfileModalOpen: (open: boolean) => void;
  setChangePasswordModalOpen: (open: boolean) => void;
  setTwoFactorModalOpen: (open: boolean) => void;
  adPosition: "top" | "right";
  setAdPosition: (position: "top" | "right") => void;
  showAd: boolean;
  setShowAd: (show: boolean) => void;
  type: string | null | unknown;
}

const Header: React.FC<HeaderProps> = ({
  setMobileSidebarOpen,
  setProfileModalOpen,
  setChangePasswordModalOpen,
  setTwoFactorModalOpen,
  adPosition,
  setAdPosition,
  showAd,
  setShowAd,
  type,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleClick = useCallback(
    (path: string) => () => navigate(path),
    [navigate]
  );

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
  };

  const AvatarDropdown = [
    {
      icon: <DropDownAvatarIcon />,
      label: "My Profile",
      onClick: () => {
        setProfileModalOpen(true);
        setAvatarDropdownOpen(false);
      },
    },
    ...(type === "enterprise"
      ? [
          {
            icon: <OrganizationSettingIcon />,
            label: "Organization Settings",
            onClick: () => {
              navigate("/organization-setting");
              setAvatarDropdownOpen(false);
            },
          },
        ]
      : []),
    {
      icon: <DropDownLockIcon />,
      label: "Change password",
      onClick: () => {
        setChangePasswordModalOpen(true);
        setAvatarDropdownOpen(false);
      },
    },
    {
      icon: <DropDownFingerPrintIcon />,
      label: "2 Factor Authentication ",
      onClick: () => {
        setTwoFactorModalOpen(true);
        setAvatarDropdownOpen(false);
      },
    },
    {
      icon: <DropDownCrownIcon />,
      label: "Manage subscription",
      onClick: () => {
        navigate("/manage-subscription");
        setAvatarDropdownOpen(false);
      },
    },
    {
      icon: <LogoutIcon />,
      label: "Logout",
      onClick: () => {
        handleLogout();
        setAvatarDropdownOpen(false);
      },
    },
  ];

  React.useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  React.useEffect(() => {
    if (!avatarDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target as Node)
      ) {
        setAvatarDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [avatarDropdownOpen]);

  return (
    <TopBar>
      <MobileMenuIcon className="mobile-menu-icon">
        <IconWrapper onClick={() => setMobileSidebarOpen(true)}>
          <HamburgerMenuIcon />
        </IconWrapper>
      </MobileMenuIcon>
      <CustomDropdown ref={dropdownRef}>
        <CustomDropdownTrigger onClick={() => setDropdownOpen((open) => !open)}>
          <span>{selectedFeature || "The Current Feature"}</span>
          <ArrowDownIcon />
        </CustomDropdownTrigger>
        <CommonMotionDropdown open={dropdownOpen} className="open">
          <CustomDropdownMenu className="open">
            {featureOptions?.map((option) => (
              <CustomDropdownOption
                key={option.value}
                className={selectedFeature === option.value ? "selected" : ""}
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
      {isAuthenticated ? (
        <>
          <PremiumButton>+ Premium</PremiumButton>

          <AvatarWrapper style={{ position: "relative" }}>
            <AdsWrapper>
              <CommonButton
                onClick={() =>
                  setAdPosition(adPosition === "top" ? "right" : "top")
                }
              >
                Ad: {adPosition}
              </CommonButton>
              <CommonButton onClick={() => setShowAd(!showAd)}>
                {showAd ? "Hide Ad" : "Show Ad"}
              </CommonButton>
            </AdsWrapper>
            <TokensLeft>Tokens left: 4</TokensLeft>
            <div ref={avatarDropdownRef} style={{ position: "relative" }}>
              <UserAvatar
                style={{ cursor: "pointer" }}
                onClick={() => setAvatarDropdownOpen((open) => !open)}
              >
                👤
              </UserAvatar>
              <CommonMotionDropdown open={avatarDropdownOpen} className="open">
                <DropDownWrapper>
                  {AvatarDropdown?.map((item) => (
                    <React.Fragment key={item.label}>
                      {item.label === "Logout" && (
                        <div
                          style={{
                            height: "1px",
                            backgroundColor: "#C8C8C8",
                          }}
                        />
                      )}
                      <AvatarDropdownItem
                        icon={item.icon}
                        label={item.label}
                        onClick={item.onClick}
                      />
                    </React.Fragment>
                  ))}
                </DropDownWrapper>
              </CommonMotionDropdown>
            </div>
          </AvatarWrapper>
        </>
      ) : (
        <ButtonWrapper>
          <CommonButton
            border="1px solid #000000"
            bgcolor="#fff"
            bghovercolor="#fff"
            borderRadius="100px"
            color="#000"
            height="32px"
            fontSize="14px"
            width="80px"
            onClick={handleClick("/login")}
          >
            Log in
          </CommonButton>
          <CommonButton
            bgcolor="#62A8BF"
            border="none"
            bghovercolor="#62A8BF"
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
  );
};

export default Header;
