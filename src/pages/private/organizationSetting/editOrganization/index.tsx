import { Form } from "antd";
import styled from "styled-components";
import CommonButton from "../../../../components/CommonButton";
import CommonInput from "../../../../components/CommonInput";
import CommonSelect from "../../../../components/CommonSelect";

type OrganizationFormValues = {
  organizationType: string;
  organizationName: string;
};

const EditOrganization = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    const typedValues = values as OrganizationFormValues;
    console.log({ ...typedValues });
  };
  return (
    <EditOrganizationWrapper>
      <Title>Organization Details</Title>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
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
            inputBorder="1px solid #D9D9D9"
          />
        </Form.Item>
        <Form.Item
          name="organizationType"
          rules={[
            { required: true, message: "Please select organization type" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonSelect
            placeholder="Organization Type"
            options={[
              { label: "Private", value: "private" },
              { label: "Public", value: "public" },
              { label: "Non-Profit", value: "nonprofit" },
            ]}
            border="1px solid #D9D9D9"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <CommonButton
            bgcolor="#62A8BF"
            color="#fff"
            bghovercolor="#62A8BF"
            borderRadius="100px"
          >
            Update
          </CommonButton>
        </Form.Item>
      </StyledForm>
    </EditOrganizationWrapper>
  );
};

export default EditOrganization;

const EditOrganizationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
const Title = styled.h2`
  font-family: "Manrope";
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #212121;
`;
const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
