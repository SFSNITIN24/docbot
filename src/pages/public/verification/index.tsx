import React, { useState } from "react";
import { Form, Input } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../components/AuthLayout";
import { ArrowLeftIcon } from "../../../utils/svg";
import CommonButton from "../../../components/CommonButton";

const VerificationPage: React.FC = () => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    console.log("OTP entered:", otp);
  };

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Not a member yet? <a href="/join">JOIN NOW</a>
        </>
      }
      title="Verification"
      text="Please enter the 6-digit verification code sent +1 255-XXX-XXXX"
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
          bgColor="#62A8BF"
          color="#fff"
          bgHoverColor="#62A8BF"
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
