import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import { ArrowLeftIcon, EyeSlashIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import CommonSelect from "../../../../components/CommonSelect";
import { useNavigate, useLocation } from "react-router-dom";

type OrganizationFormValues = {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const OrganizationAdminInfoPage: React.FC = () => {
  const [countryCode, setCountryCode] = React.useState("+1");
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type");

  const onFinish = (values: unknown) => {
    const typedValues = values as OrganizationFormValues;

    const fullPhone = `${countryCode} ${typedValues.phone}`;
    const countryCodewithPlus = `${countryCode}`;
    console.log("Form values:", {
      ...typedValues,
      fullPhone,
      countryCodewithPlus,
    });
    navigate(`/two-factor-authentication?type=${type}`);
  };

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      topRightContent={
        <>
          Already have an account? <a href="/">Sign in</a>
        </>
      }
      title="Organization Admin Info"
      text="Enter the basic organization admin info"
    >
      <FormWrapper layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            label="First Name"
            type="text"
            placeholder="Organization Name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please enter your last name" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Please enter your User Name" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput type="text" placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput type="email" placeholder="Email Address" />
        </Form.Item>
        <Form.Item name="phone" style={{ marginBottom: "0px" }}>
          <PhoneRow>
            <CommonSelect
              style={{ maxWidth: 94 }}
              options={[
                {
                  value: "+1",
                  label: (
                    <>
                      <img
                        src="https://flagcdn.com/us.svg"
                        alt="US"
                        style={{
                          width: 20,
                          marginRight: 4,
                          verticalAlign: "middle",
                        }}
                      />
                      +1
                    </>
                  ),
                },
              ]}
              value={countryCode}
              onChange={(val) => setCountryCode(val)}
            />
            <CommonInput
              name="phone"
              type="tel"
              placeholder="Enter Phone Number"
              style={{ flex: 1 }}
            />
          </PhoneRow>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your email" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            type="password"
            placeholder="Password"
            eyeIcon={<EyeSlashIcon />}
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please enter your confirm password" },
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
            placeholder="Confirmation Password"
            eyeIcon={<EyeSlashIcon />}
            eyeOffIcon={<EyeSlashIcon />}
          />
        </Form.Item>

        <Form.Item  style={{ marginBottom: "0px" }}>
          <CommonButton bgColor="#62A8BF" color="#fff" bgHoverColor="#62A8BF">
            Continue <ArrowLeftIcon />
          </CommonButton>
        </Form.Item>
      </FormWrapper>
    </AuthLayout>
  );
};

export default OrganizationAdminInfoPage;

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
`;

const PhoneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
