import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  EyeSlashIcon,
  LockIcon,
} from "../../../../utils/svg";
import CommonCheckbox from "../../../../components/CommonCheckbox";
import CommonButton from "../../../../components/CommonButton";
import { checkTFA } from "../../../../utils/tfa";
import { useAppDispatch } from "../../../../store/hooks";
import { loginSuccess, verifyTfa } from "../../../../store/slices/authSlice";

type LoginFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    const typedValues = values as LoginFormValues;

    const dummyUser = {
      id: "Nitin587",
      name: "Nitin Kumar",
      email: typedValues.username,
      remember: typedValues.remember,
      type: "enterprise",
    };

    const token = "fake-jwt-token-123456789";
    const trusted = checkTFA();
    const isTrustedUser = trusted === typedValues.username;

    if (isTrustedUser) {
      dispatch(loginSuccess({ user: dummyUser, token }));
      dispatch(verifyTfa());

      if (typedValues.remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(dummyUser));
        localStorage.setItem("loginTimestamp", Date.now().toString());
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(dummyUser));
      }

      navigate("/chat");
    } else {
      if (typedValues.remember) {
        localStorage.setItem("pendingUser", JSON.stringify(dummyUser));
      } else {
        sessionStorage.setItem("pendingUser", JSON.stringify(dummyUser));
      }

      navigate("/otp");
    }
  };

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Don’t have an account? <a href="/create-account">Sign up</a>
        </>
      }
      title="Welcome Back!"
      text="Sign in to unlock the full potential of AI with us."
    >
      <FormWrapper layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please enter your username or email" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="text"
            placeholder="Username or Email"
            label="Username/Email address"
            leftIcon={<EnvelopeIcon />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="Password"
            leftIcon={<LockIcon />}
            eyeIcon={<EyeSlashIcon />}
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>
        <div className="remember-forget">
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: "0px" }}
          >
            <div className="remember-me">
              <CommonCheckbox />
              <p>Remember for 30 days</p>
            </div>
          </Form.Item>
          <a href="/forgot">Forgot password?</a>
        </div>

        <Form.Item style={{ marginBottom: "0px" }}>
          <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
            Sign in <ArrowLeftIcon />
          </CommonButton>
        </Form.Item>
      </FormWrapper>
    </AuthLayout>
  );
};

export default LoginPage;

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .remember-forget {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    a {
      font-family: "Manrope";
      font-weight: 500;
      font-size: 16px;
      line-height: 150%;
      text-align: right;
      color: #62a8bf;
      text-decoration: none;
      @media (max-width: 480px) {
        font-size: 14px;
      }
    }
    .remember-me {
      display: flex;
      align-items: center;
      font-family: "Manrope";
      font-weight: 500;
      font-size: 16px;
      color: #1c1c1c;
      gap: 2px;
      @media (max-width: 480px) {
        font-size: 14px;
      }
    }
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: normal;
    }
  }
`;
