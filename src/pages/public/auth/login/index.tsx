import React, { useState } from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
} from "../../../../utils/svg";
import CommonCheckbox from "../../../../components/CommonCheckbox";
import CommonButton from "../../../../components/CommonButton";
import { useAppDispatch } from "../../../../store/hooks";
import {
  loginSuccess,
  setAuthenticated,
  setRememberMeToken,
  setToken,
} from "../../../../store/slices/authSlice";
import { userLogin } from "../../../../service/Api_collecton";

type LoginFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>("");

  const onFinish = async (values: unknown) => {
    const typedValues = values as LoginFormValues;
    const payload = {
      email: typedValues.username,
      password: typedValues.password,
      deviceId: uuidv4(),
      deviceType: "web",
      remember_me: typedValues.remember || false,
    };
    setLoading(true);
    const response = await userLogin(payload);
    setLoading(false);

    if (response?.statusCode === 200 || response?.statusCode === 201) {
      if (response.data.user?.is_2FA_enabled === false) {
        dispatch(loginSuccess({ user: response?.data?.user }));
        dispatch(setToken(response?.data?.token));
        dispatch(setAuthenticated(true));
        if (response?.data?.token) {
          dispatch(setRememberMeToken(response.data.token));
        }
        navigate("/chat");
      }
      dispatch(loginSuccess({ user: response.data }));
      toast.success(response.message);
      navigate("/otp");
    } else if (response?.statusCode === 401) {
      setResponseMessage(response.data.status);
      form.resetFields();
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Don't have an account? <a href="/create-account">Sign up</a>
        </>
      }
      title="Welcome Back!"
      text="Sign in to unlock the full potential of AI with us."
    >
      <Spin spinning={loading}>
        <FormWrapper layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username or email",
              },
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
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
            style={{ marginBottom: "0px" }}
          >
            <CommonInput
              type="password"
              placeholder="Password"
              leftIcon={<LockIcon />}
              eyeIcon={<EyeIcon />}
              eyeOffIcon={<EyeSlashIcon />}
            />
          </Form.Item>
          {responseMessage == "suspended" && (
            <div className="wrong-password">
              <p>Wrong Password</p>
              <span>
                You have 5 attempts to login before the account gets locked for
                24 hours. You can contact support to remove the lock. Add a
                message contact support@docbot.one or call XXX-XXX-XXXX to
                unlock your account.
              </span>
            </div>
          )}
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
      </Spin>
    </AuthLayout>
  );
};

export default LoginPage;

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .wrong-password {
    background-color: #ffeaea;
    padding: 8px;
    border-radius: 10px;
    font-family: "Manrope";
    display: flex;
    flex-direction: column;
    gap: 6px;
    p {
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      color: #fb4a49;
    }
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      color: #424242;
    }
  }
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
      cursor: pointer;
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
