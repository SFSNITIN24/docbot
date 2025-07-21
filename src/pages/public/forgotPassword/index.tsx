import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../components/AuthLayout";
import { EnvelopeIcon } from "../../../utils/svg";
import CommonInput from "../../../components/CommonInput";
import CommonButton from "../../../components/CommonButton";

type ForgotFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

const ForgotPasswordPage: React.FC = () => {
  const onFinish = (values: unknown) => {
    const typedValues = values as ForgotFormValues;
    console.log("Form values:", typedValues);
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
      text="Enter the email address you use on Learning+. We'll
send you a OTP to reset your password."
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
            type="email"
            placeholder="Enter Email"
            label="Email address"
            leftIcon={<EnvelopeIcon />}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <CommonButton bgColor="#62A8BF" color="#fff" bgHoverColor="#62A8BF">
            Reset Password
          </CommonButton>
        </Form.Item>
      </FormWrapper>
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
