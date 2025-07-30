import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import { EyeIcon, EyeSlashIcon, LockIcon } from "../../../utils/svg";
import CommonInput from "../../../components/CommonInput";
import CommonButton from "../../../components/CommonButton";

type ChangeFormValues = {
  oldpassword: string;
  password: string;
  reenterpassword: string;
};

const ChnagePasswordPage: React.FC = () => {
  const onFinish = (values: unknown) => {
    const typedValues = values as ChangeFormValues;
    console.log("Form values:", typedValues);
  };

  return (
    <Container>
      <Header>
        <Title>Change Password</Title>
        <Description>
          Enter a new password, not less than 8 characters.
        </Description>
      </Header>

      <FormWrapper layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="oldpassword"
          rules={[
            { required: true, message: "Please enter your Old Password" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="Old Password"
            leftIcon={<LockIcon />}
            eyeIcon={<EyeIcon />}
            eyeOffIcon={<EyeSlashIcon />}
            inputBorder="1px solid #D9D9D9"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your New Password" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="New Password"
            leftIcon={<LockIcon />}
            eyeIcon={<EyeIcon />}
            eyeOffIcon={<EyeSlashIcon />}
            inputBorder="1px solid #D9D9D9"
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
            inputBorder="1px solid #D9D9D9"
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px", marginTop: "20px" }}>
          <CommonButton
            bgcolor="#62A8BF"
            color="#fff"
            bghovercolor="#62A8BF"
            borderRadius="100px"
          >
            Update
          </CommonButton>
        </Form.Item>
      </FormWrapper>
    </Container>
  );
};

export default ChnagePasswordPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  font-family: "Manrope";
`;
const Title = styled.h2`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #212121;
`;
const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #424242;
`;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
