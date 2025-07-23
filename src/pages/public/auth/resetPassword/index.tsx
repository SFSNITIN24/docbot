import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import { EyeSlashIcon, LockIcon } from "../../../../utils/svg";
import CommonInput from "../../../../components/CommonInput";
import CommonButton from "../../../../components/CommonButton";

type ResetFormValues = {
  password: string;
  reenterpassword: string;
};

const ResetPasswordPage: React.FC = () => {
  const onFinish = (values: unknown) => {
    const typedValues = values as ResetFormValues;
    console.log("Form values:", typedValues);
  };

  return (
    <AuthLayout
      dashboardUrl="/"
      topRightContent={
        <>
          Don’t have an account? <a href="/create-account">Sign up</a>
        </>
      }
      title="Reset Password"
      text="At least 9 characters, with uppercase and
lowercase letters."
    >
      <FormWrapper layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your New Password" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="New Password"
            leftIcon={<LockIcon />}
            eyeIcon={<EyeSlashIcon />}
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>
        <Form.Item
          name="reenterpassword"
          dependencies={["password"]}
          rules={[ 
            { required: true, message: "Please enter your Re-enter password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="Re-enter password"
            leftIcon={<LockIcon />}
            eyeIcon={<EyeSlashIcon />}
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>
        <Form.Item  style={{ marginBottom: "0px" }}>
          <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
            Submit
          </CommonButton>
        </Form.Item>
      </FormWrapper>
    </AuthLayout>
  );
};

export default ResetPasswordPage;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
