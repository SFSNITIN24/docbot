import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import { ArrowLeftIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import CommonSelect from "../../../../components/CommonSelect";
import { useNavigate  } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";

type OrganizationFormValues = {
  organizationType: string;
  organizationName: string;
};

const OrganizationInfoPage: React.FC = () => {
  const navigate = useNavigate();
   const UserType = useAppSelector((state) => state.auth.user?.type);

  const onFinish = (values: unknown) => {
    const typedValues = values as OrganizationFormValues;
    console.log("Form values:", typedValues);
    if (UserType === "individual") {
      navigate("/organization-admin-info?type=individual");
    } else {
      navigate("/two-factor-authentication?type=enterprise");
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
      title="Organization Info"
      text="Enter the basic organization info"
    >
      <FormWrapper layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="organizationName"
          rules={[
            { required: true, message: "Please enter your organization name" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="text"
            placeholder="Organization Name"
            label="Organization Name"
          />
        </Form.Item>
        <Form.Item
          name="organizationType"
          rules={[{ required: true, message: "Please select organization type" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonSelect
            placeholder="Organization Type"
            options={[
              { label: "Private", value: "private" },
              { label: "Public", value: "public" },
              { label: "Non-Profit", value: "nonprofit" },
            ]}
          />
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

export default OrganizationInfoPage;

const FormWrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
