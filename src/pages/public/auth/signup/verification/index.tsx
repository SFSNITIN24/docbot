import React, { useEffect, useState } from "react";
import { Form, Input, Spin } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../../components/AuthLayout";
import { ArrowLeftIcon } from "../../../../../utils/svg";
import CommonButton from "../../../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../store/hooks";
import { useRegistrationGuard } from "../../../../../hooks/useRegistrationGuard";

const TwoFactorVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const registerUserDetail = useRegistrationGuard();

  useEffect(() => {
    if (window.location.pathname === "/reset" && (!user || !user.resetToken)) {
      navigate("/forgot", { replace: true });
    }
  }, [user, navigate]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }
    navigate(`/subscription?type=${registerUserDetail?.account_type}`);
  };

  const contactInfo =
    user?.twoFaMethod === "phone_otp"
      ? `${user?.phone_country_code ?? ""} ${user?.phone_number ?? ""}`
      : "";

  const verificationText =
    user?.twoFaMethod === "authenticator"
      ? "Please scan the QR code to verify your account."
      : `Please enter the 6-digit verification code sent to <br/> ${contactInfo}`;

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Already have an account? <a href="/login">Sign in</a>
        </>
      }
      title="Verification"
      text={verificationText}
    >
      <Spin spinning={false}>
        <FormWrapper>
          {user?.twoFaMethod === "authenticator" && (
            <QRCodeWrapper>
              <img
                src={user?.qr_code as string}
                alt="Scan this QR Code with your Authenticator App"
              />
            </QRCodeWrapper>
          )}
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
      </Spin>
    </AuthLayout>
  );
};

export default TwoFactorVerificationPage;

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
    cursor: pointer;
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
    box-shadow: 0px 4px 18.3px 0px #00000040;
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

const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  img {
    width: 150px;
    height: 150px;
    box-shadow: 0px 4px 18.3px 0px #00000040;
  }
`;