import React from "react";
import { Form, Switch } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonButton from "../../../../components/CommonButton";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonRadioCardGroup, {
  type RadioCardOption,
} from "../../../../components/CommonRadioCardGroup";
import CommonCheckbox from "../../../../components/CommonCheckbox";
import { useNavigate, useLocation } from "react-router-dom";

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
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type");

  const onFinish = (values: unknown) => {
    const typedValues = values as TwoFactorAuthenticationFormValues;
    console.log("Form values:", typedValues);
    navigate(`/subscription?type=${type}`);
  };
  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Already have an account? <a href="/">Sign in</a>
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
        <div className="remember-forget">
          <Form.Item
            name="promotionalDeals"
            valuePropName="checked"
            style={{ marginBottom: "0px" }}
          >
            <div className="remember-me">
              <CommonCheckbox />
              <p>opt out of promotional deals</p>
            </div>
          </Form.Item>
        </div>
        <Form.Item  style={{ marginBottom: "0px" }}>
          <CommonButton bgColor="#62A8BF" color="#fff" bgHoverColor="#62A8BF">
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
