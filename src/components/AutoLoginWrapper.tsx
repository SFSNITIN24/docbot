import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Spin } from "antd";

interface AutoLoginWrapperProps {
  children: React.ReactNode;
}

const AutoLoginWrapper: React.FC<AutoLoginWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, rememberMeToken } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAutoLogin = async () => {
      setIsChecking(true);

      if (user) {
        setIsChecking(false);
        return;
      }

      if (rememberMeToken) {
        navigate("/chat", { replace: true });
      }
      setIsChecking(false);
    };

    checkAutoLogin();
  }, [user, rememberMeToken, navigate]);

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AutoLoginWrapper;
