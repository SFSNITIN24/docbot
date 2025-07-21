import React from "react";
import { Form, Switch } from "antd";
import styled from "styled-components";
import CommonButton from "../../../components/CommonButton";
import CommonRadioCardGroup, { type RadioCardOption } from "../../../components/CommonRadioCardGroup";

type ChangeFormValues = {
    enableTwoFactor: boolean;
    accountType: string;
};
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
const TwoFactorPage: React.FC = () => {
    const [form] = Form.useForm();
  const onFinish = (values: unknown) => {
    const typedValues = values as ChangeFormValues;
    console.log("Form values:", typedValues);
  };

  return (
    <Container>
      <Header>
        <Title>
          2 Factor Authentication 
        </Title>       
      </Header>
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
        
        <Form.Item  style={{ marginBottom: "0px", marginTop: "32px"}}>
          <CommonButton bgColor="#62A8BF" color="#fff" bgHoverColor="#62A8BF">
           Update
          </CommonButton>
        </Form.Item>
      </FormWrapper>
      </Container>
  );
};

export default TwoFactorPage;
const Container = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  .two-factor-switch {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
    height: 64px;
    border: 1px solid #C8C8C8;
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
`
const Header = styled.div`
display:  flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  font-family: "Manrope";
  
  `
  const Title = styled.h2`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #212121;
`;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #1d3d47;
  }

  &.ant-switch-checked:hover {
    background-color: #1d3d47 !important;
  }
`;
