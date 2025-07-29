import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonRadioCardGroup, {
  type RadioCardOption,
} from "../../../../components/CommonRadioCardGroup";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../../components/AuthLayout";
import { updateRegisterData } from "../../../../store/slices/registeruserSlice";
import { useAppDispatch } from "../../../../store/hooks";
import CommonButton from "../../../../components/CommonButton";

const accountOptions: RadioCardOption[] = [
  {
    label: "Individual",
    description: "Sign up as an individual today",
    value: "individual",
  },
  {
    label: "Enterprise Account",
    description: "Sign up as an enterprise account",
    value: "organization_admin",
  },
];
type CreateAccountFormValues = {
  accountType: "individual" | "organization_admin";
};

const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    const typedValues = values as CreateAccountFormValues;
    if (typedValues.accountType === "organization_admin") {
      navigate("/organization-Info?type=organization_admin");
    } else if (typedValues.accountType === "individual") {
      navigate("/basic-Info?type=individual");
    }
    dispatch(updateRegisterData({ account_type: typedValues.accountType }));
    localStorage.setItem('registration_account_type', typedValues.accountType);
  };

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
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
