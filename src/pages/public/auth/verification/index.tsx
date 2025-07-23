import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { loginSuccess, verifyTfa } from "../../../../store/slices/authSlice";
import { storeTFA } from "../../../../utils/tfa";
type PendingUser = {
  id: string;
  name: string;
  email: string;
  remember?: boolean;
};

const VerificationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);

  useEffect(() => {
    const data =
      localStorage.getItem("pendingUser") ||
      sessionStorage.getItem("pendingUser");
    if (data) {
      setPendingUser(JSON.parse(data));
    } else {
      navigate("/login");
    }
  }, [navigate]);
  const handleVerify = () => {
    if (!pendingUser) {
      console.error("Pending user or email missing.");
      return;
    }

    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }

    const token = "fake-jwt-token-123456789";

    dispatch(loginSuccess({ user: pendingUser, token }));
    dispatch(verifyTfa());

    if (pendingUser?.remember) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(pendingUser));
      storeTFA(pendingUser.email);
    } else {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(pendingUser));
    }

    localStorage.removeItem("pendingUser");
    sessionStorage.removeItem("pendingUser");

    navigate("/chat");
  };

  return (
    <AuthLayout
      dashboardUrl="/"
      topRightContent={
        <>
          Not a member yet? <a href="/join">JOIN NOW</a>
        </>
      }
      title="Verification"
      text="Please enter the 6-digit verification code sent <br/> +1 255-XXX-XXXX"
    >
      <FormWrapper>
        <OtpWrapper>
          <Input.OTP
            prefixCls="otp-box"
            size="large"
            formatter={(str) => str.toUpperCase()}
            type="tel"
            inputMode="numeric"
            value={otp}
            onChange={setOtp}
          />
        </OtpWrapper>

        <p>Resend Code</p>

        <CommonButton
          bgcolor="#62A8BF"
          color="#fff"
          bghovercolor="#62A8BF"
          onClick={handleVerify}
        >
          Verify <ArrowLeftIcon />
        </CommonButton>
      </FormWrapper>
    </AuthLayout>
  );
};

export default VerificationPage;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0%;
    text-align: right;
    color: #007bff;
  }
`;

const OtpWrapper = styled.div`
  background: #f8f8f8;
  display: flex;
  justify-content: center;

  .otp-box-input {
    width: 64px;
    height: 64px;
    background: #fff;
    border-radius: 9px;
    border: none;
    text-align: center;
    font-size: 1.5rem;
    transition: border 0.2s;
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }
  .otp-box-input:focus {
    border: 2px solid #62a8bf;
    outline: none;
  }
`;
