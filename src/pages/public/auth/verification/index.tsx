import React, { useEffect, useState } from "react";
import { Form, Input, Spin } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  loginSuccess,
  setToken,
} from "../../../../store/slices/authSlice";
import {
  verifyPasswordResetOtp,
  verifyTwoFactorAuthentication,
} from "../../../../service/Api_collecton";
import { toast } from "sonner";

const VerificationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const pathname = window.location.pathname;


  useEffect(() => {
    // If navigating to /reset, ensure user has resetToken
    if (window.location.pathname === "/reset" && (!user || !user.resetToken)) {
      navigate("/forgot", { replace: true });
    }
  }, [user, navigate]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }
    setLoading(true);
    if (user?.user_id) {
      const payload = {
        user_id: user?.user_id,
        code: otp,
        device_type: "web",
        device_id: "web-device-id",
      };
      const response = await verifyTwoFactorAuthentication(payload);
      setLoading(false);
      dispatch(loginSuccess({ user: response?.data?.user }));
      dispatch(setToken(response?.data?.token));
      navigate("/chat");
    } else {
      const payload = {
        email: user?.email,
        otp: otp,
      };
      const response = await verifyPasswordResetOtp(payload);
      setLoading(false);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        toast.success(response.message);
        dispatch(loginSuccess({ user: response?.data }));
        navigate("/reset");
      } else {
        toast.error(response?.message);
      }
    }
  };

  const contactInfo =
    pathname === "/otp"
      ? (user?.phone_country_code ?? "") + " " + (user?.phone_number ?? "")
      : user?.email ?? "";

  const verificationText = `Please enter the 6-digit verification code sent <br/> ${contactInfo}`;

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Not a member yet? <a href="/create-account">JOIN NOW</a>
        </>
      }
      title="Verification"
      text={verificationText}
    >
      <Spin spinning={loading}>
        {/* <>
          <p>Scan this QR code with Google Authenticator or Authy:</p>
          <img src={user?.qr_code} alt="2FA QR Code" width="200" height="200" />
        </> */}
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
      </Spin>
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
