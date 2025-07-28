import React from "react";
import { Form, Spin, Switch } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonButton from "../../../../components/CommonButton";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonRadioCardGroup, {
  type RadioCardOption,
} from "../../../../components/CommonRadioCardGroup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { twoFactorAuthentication } from "../../../../service/Api_collecton";
import { updateRegisterData } from "../../../../store/slices/registeruserSlice";
import { useRegistrationGuard } from "../../../../hooks/useRegistrationGuard";
import { TwoFAMethod } from "../../../../enums";

const accountOptions: RadioCardOption[] = [
  {
    label: "Phone Number",
    value: TwoFAMethod.PHONE_OTP,
  },
  {
    label: "Authenticator App",
    value: TwoFAMethod.AUTHENTICATOR,
  },
];

type TwoFactorAuthenticationFormValues = {
  enableTwoFactor: string;
  accountType: TwoFAMethod;
  promotionalDeals: boolean;
};

const TwoFactorAuthenticationPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const registerUserDetail = useRegistrationGuard();

  const onFinish = async (values: unknown) => {
    const typedValues = values as TwoFactorAuthenticationFormValues;
    const params = new URLSearchParams();
    params.append("is2FAEnabled", typedValues.enableTwoFactor);
    params.append("method", typedValues.accountType);
    setLoading(true);
    const response = await twoFactorAuthentication(
      registerUserDetail?.id,
      params.toString()
    );
    setLoading(false);
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      dispatch(
        updateRegisterData({ ...registerUserDetail, ...response?.data?.user })
      );
      navigate(`/subscription?type=${registerUserDetail?.account_type}`);
    }
  };
  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Already have an account? <a href="/login">Sign in</a>
        </>
      }
      title="2 Factor Authentication"
      text="You need to enable Two-Factor Authentication for your account."
    >
      <Spin spinning={loading}>
        <FormWrapper
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={{
            enableTwoFactor: false,
            accountType: TwoFAMethod.PHONE_OTP,
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
            initialValue={TwoFAMethod.PHONE_OTP}
            valuePropName="value"
            trigger="onChange"
            style={{ marginBottom: "0px" }}
          >
            <CommonRadioCardGroup
              options={accountOptions}
              flexDirection="row"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px", marginTop: "20px" }}>
            <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
              Continue <ArrowLeftIcon />
            </CommonButton>
          </Form.Item>
        </FormWrapper>
      </Spin>
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
