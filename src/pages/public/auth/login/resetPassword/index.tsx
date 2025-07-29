import React, { useState, useEffect } from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../../components/AuthLayout";
import { EyeIcon, EyeSlashIcon, LockIcon } from "../../../../../utils/svg";
import CommonInput from "../../../../../components/CommonInput";
import CommonButton from "../../../../../components/CommonButton";
import { resetPassword } from "../../../../../service/Api_collecton";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { logout } from "../../../../../store/slices/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ResetFormValues = {
  password: string;
  reenterpassword: string;
};

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: unknown) => {
    const typedValues = values as ResetFormValues;
    const payload = {
      email: user?.email,
      resetToken: user?.resetToken,
      newPassword: typedValues.password,
    };
    setLoading(true);
    const response = await resetPassword(payload);
    setLoading(false);
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      toast.success(response.message);
      dispatch(logout());
      navigate("/login");
    } else {
      toast.error(response?.message);
    }
  };

  useEffect(() => {
    if (!user || !user.resetToken) {
      navigate("/forgot", { replace: true });
    }
  }, [user, navigate]);

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Don’t have an account? <a href="/create-account">Sign up</a>
        </>
      }
      title="Reset Password"
      text="Enter a new password, not less than 8 characters."
    >
      <Spin spinning={loading}>
      <FormWrapper layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your New Password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="New Password"
            leftIcon={<LockIcon />}
            eyeIcon={<EyeIcon />}
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
            eyeIcon={<EyeIcon />}
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
            Submit
          </CommonButton>
        </Form.Item>
      </FormWrapper>
      </Spin>
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
