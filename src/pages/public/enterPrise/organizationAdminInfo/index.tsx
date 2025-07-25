import React from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import AuthLayout from "../../../../components/AuthLayout";
import CommonInput from "../../../../components/CommonInput";
import { ArrowLeftIcon, EyeSlashIcon } from "../../../../utils/svg";
import CommonButton from "../../../../components/CommonButton";
import CommonSelect from "../../../../components/CommonSelect";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { userRegister } from "../../../../service/Api_collecton";
import {
  resetRegisterUser,
  updateRegisterData,
} from "../../../../store/slices/registeruserSlice";

type OrganizationFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const OrganizationAdminInfoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+1");
  const registerUserDetail = useAppSelector((state) => state.registeruser);
  const onFinish = async (values: unknown) => {
    const typedValues = values as OrganizationFormValues;

    const fullPhone = `${countryCode} ${typedValues.phone}`;
    const countryCodewithPlus = `${countryCode}`;
    console.log("Form values:", {
      ...typedValues,
      fullPhone,
      countryCodewithPlus,
    });
    const payload = {
      account_type: registerUserDetail?.account_type,
      first_name: typedValues.firstName,
      last_name: typedValues.lastName,
      organization_name: registerUserDetail.organization_name,
      organization_type: registerUserDetail.organization_type,
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
      dispatch(updateRegisterData(response.data?.user));
      navigate(
        `/two-factor-authentication?type=${registerUserDetail?.account_type}`
      );
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
      title="Organization Admin Info"
      text="Enter the basic organization admin info"
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
                validator: (_, value) =>
                  value && value.length >= 10
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Phone number must be at least 10 digits")
                      ),
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
                border="1px solid #D9D9D9"
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
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
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
