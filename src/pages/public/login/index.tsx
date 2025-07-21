import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../components/AuthLayout";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  EyeSlashIcon,
  LockIcon,
} from "../../../utils/svg";
import CommonInput from "../../../components/CommonInput";
import CommonCheckbox from "../../../components/CommonCheckbox";
import CommonButton from "../../../components/CommonButton";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: unknown) => {
    const typedValues = values as LoginFormValues;
    console.log("Form values:", typedValues);
    navigate("/dashboard-layout")
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
          rules={[{ required: true, message: "Please enter your password" }]}
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
          <CommonButton bgColor="#62A8BF" color="#fff" bgHoverColor="#62A8BF">
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
