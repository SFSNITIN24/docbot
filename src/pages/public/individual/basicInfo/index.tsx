import React from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import CommonSelect from "../../../../components/CommonSelect";
import { useAppDispatch } from "../../../../store/hooks";
import {
  resetRegisterUser,
  updateRegisterData,
} from "../../../../store/slices/registeruserSlice";
import { userRegister } from "../../../../service/Api_collecton";
import { useRegistrationGuard } from "../../../../hooks/useRegistrationGuard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
type OrganizationFormValues = {
  firstName: string;
  lastName: string;
  organizationName: string;
  organizationType: string;
  email: string;
  phone: string;
  password: string;
};

const BasicInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [countryCode, setCountryCode] = React.useState("+1");
  const [loading, setLoading] = React.useState(false);
  const registerUserDetail = useRegistrationGuard();

  const onFinish = async (values: unknown) => {
    const typedValues = values as OrganizationFormValues;
    const countryCodewithPlus = `${countryCode}`;
    const payload = {
      account_type: registerUserDetail?.account_type,
      first_name: typedValues.firstName,
      last_name: typedValues.lastName,
      organization_name: typedValues.organizationName,
      organization_type: typedValues.organizationType,
      email: typedValues.email,
      phone_country_code: countryCodewithPlus,
      phone_number: typedValues.phone,
      password: typedValues.password,
    };
    setLoading(true);
    const response = await userRegister(payload);
    setLoading(false);
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      dispatch(resetRegisterUser());
      dispatch(updateRegisterData(response?.data?.user));
      toast.success(response.message);
      navigate(
        `/two-factor-authentication?type=${registerUserDetail?.account_type}`
      );
    } else {
      toast.error(response?.message);
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
      title="Basic Account Info"
      text="Enter the basic account Info"
    >
      <Spin spinning={loading}>
        <FormWrapper layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
            style={{ marginBottom: "0px" }}
          >
            <CommonInput
              type="text"
              placeholder="First Name"
              label="First Name"
              inputBorder="1px solid #D9D9D9"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
            style={{ marginBottom: "0px" }}
          >
            <CommonInput
              type="text"
              placeholder="Last Name"
              inputBorder="1px solid #D9D9D9"
            />
          </Form.Item>
          <Form.Item
            name="organizationName"
            rules={[
              {
                required: true,
                message: "Please enter your organization name",
              },
            ]}
            style={{ marginBottom: "0px" }}
          >
            <CommonInput
              type="text"
              placeholder="Organization/AffIiation Name"
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

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
            style={{ marginBottom: "0px" }}
          >
            <CommonInput type="email" placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="phone"
            style={{ marginBottom: "0px" }}
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^\d+$/,
                message: "Phone number must contain only digits",
              },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            ]}
          >
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
                border="1px solid #D9D9D9"
              />
              <CommonInput
                type="tel"
                placeholder="Enter Phone Number"
                style={{ flex: 1 }}
              />
            </PhoneRow>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
            style={{ marginBottom: "0px" }}
          >
            <CommonInput
              type="password"
              placeholder="Password"
              eyeIcon={<EyeIcon />}
              eyeOffIcon={<EyeSlashIcon />}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <CommonButton bgcolor="#62A8BF" color="#fff" bghovercolor="#62A8BF">
              Continue <ArrowLeftIcon />
            </CommonButton>
          </Form.Item>
        </FormWrapper>
      </Spin>
    </AuthLayout>
  );
};

export default BasicInfoPage;

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
