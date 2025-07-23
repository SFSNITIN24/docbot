import React from "react";
import { Form } from "antd";
import styled from "styled-components";

import CommonButton from "../../../../components/CommonButton";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonRadioCardGroup, {
  type RadioCardOption,
} from "../../../../components/CommonRadioCardGroup";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../../components/AuthLayout";

const accountOptions: RadioCardOption[] = [
  {
    label: "Individual",
    description: "Sign up as an individual today",
    value: "individual",
  },
  {
    label: "Enterprise Account",
    description: "Sign up as an enterprise account",
    value: "enterprise",
  },
];
type CreateAccountFormValues = {
  accountType: "individual" | "enterprise";
};

const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    const typedValues = values as CreateAccountFormValues;
    if (typedValues.accountType === "individual") {
      navigate("/organization-Info?type=individual");
    } else if (typedValues.accountType === "enterprise") {
      navigate("/basic-Info?type=enterprise");
    }
  };

  return (
    <AuthLayout
      dashboardUrl="/"
      topRightContent={
        <>
          Already have an account? <a href="/login">Sign in</a>
        </>
      }
      title="Create a Account"
      text="Join our platform today and unlock the power of our awesome AI!"
    >
      <FormWrapper layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="accountType"
          initialValue="individual"
          valuePropName="value"
          trigger="onChange"
        >
          <CommonRadioCardGroup options={accountOptions}  flexDirection="column"/>
        </Form.Item>
        <Form.Item  style={{ marginBottom: "0px" }}>
          <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
            Continue <ArrowLeftIcon />
          </CommonButton>
        </Form.Item>
      </FormWrapper>
    </AuthLayout>
  );
};

export default CreateAccountPage;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
