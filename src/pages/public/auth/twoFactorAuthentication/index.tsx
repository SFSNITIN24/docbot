import React from "react";
import { Form, Switch } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonButton from "../../../../components/CommonButton";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonRadioCardGroup, {
  type RadioCardOption,
} from "../../../../components/CommonRadioCardGroup";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";

const accountOptions: RadioCardOption[] = [
  {
    label: "Phone Number",
    value: "phone",
  },
  {
    label: "Authenticator App",
    value: "authenticator",
  },
];

type TwoFactorAuthenticationFormValues = {
  enableTwoFactor: boolean;
  accountType: "phone" | "authenticator";
  promotionalDeals: boolean;
};

const TwoFactorAuthenticationPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
   const UserType = useAppSelector((state) => state.auth.user?.type);

  const onFinish = (values: unknown) => {
    const typedValues = values as TwoFactorAuthenticationFormValues;
    console.log("Form values:", typedValues);
    navigate(`/subscription?type=${UserType}`);
  };
  return (
    <AuthLayout
      dashboardUrl="/"
      topRightContent={
        <>
          Already have an account? <a href="/login">Sign in</a>
        </>
      }
      title="2 Factor Authentication"
      text="You need to enable Two-Factor Authentication for your account."
    >
      <FormWrapper
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          enableTwoFactor: false,
          accountType: "phone",
          promotionalDeals: false,
        }}
      >
        <div className="two-factor-switch">
          <p>Enable Two-Factor Authentication</p>
          <Form.Item
            name="enableTwoFactor"
            valuePropName="checked"
            style={{ marginBottom: "0px" }}
            initialValue={false}
          >
            <StyledSwitch />
          </Form.Item>
        </div>
        <Form.Item
          name="accountType"
          initialValue="phone"
          valuePropName="value"
          trigger="onChange"
          style={{ marginBottom: "0px" }}
        >
          <CommonRadioCardGroup options={accountOptions} flexDirection="row" />
        </Form.Item>
        
        <Form.Item  style={{ marginBottom: "0px" ,marginTop:"20px"}}>
          <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
            Continue <ArrowLeftIcon />
          </CommonButton>
        </Form.Item>
      </FormWrapper>
    </AuthLayout>
  );
};

export default TwoFactorAuthenticationPage;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .two-factor-switch {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
    height: 64px;
    p {
      font-family: "Manrope";
      font-weight: 700;
      font-size: 16px;
      line-height: 150%;
      color: #1c1c1c;
      @media (max-width: 480px) {
        font-size: 14px;
      }
    }
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #1d3d47;
  }

  &.ant-switch-checked:hover {
    background-color: #1d3d47 !important;
  }
`;
