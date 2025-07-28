import React, { useState } from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import { EnvelopeIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import { forgotPassword } from "../../../../service/Api_collecton";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../../store/slices/authSlice";
import { useAppDispatch } from "../../../../store/hooks";

type ForgotFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: unknown) => {
    const typedValues = values as ForgotFormValues;

    const payload = {
      email: typedValues.username,
    };
    setLoading(true);
    const response = await forgotPassword(payload);
    setLoading(false);
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      toast.success(response.message);
      dispatch(loginSuccess({ user: response.data }));
      navigate("/otp-verification");
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
      title="Forgot password?"
      text="Enter the email address you use on DocBot. We'll
send you a OTP to reset your password."
    >
      <Spin spinning={loading}>
        <FormWrapper layout="vertical" onFinish={onFinish}>
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
              type="email"
              placeholder="Enter Email"
              label="Email address"
              leftIcon={<EnvelopeIcon />}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
              Reset Password
            </CommonButton>
          </Form.Item>
        </FormWrapper>
      </Spin>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
