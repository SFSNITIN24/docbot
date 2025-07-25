import React, { useState } from "react";
import { Form } from "antd";
import styled from "styled-components";
import CommonInput from "../../../components/CommonInput";
import CommonSelect from "../../../components/CommonSelect";
import CommonButton from "../../../components/CommonButton";
import { UserOutlined } from "@ant-design/icons";
import { Circle } from "../../../components/CommonCircle";
import { EditIcon } from "../../../utils/svg";

type ProfileFormValues = {
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  organizationType?: string;
  email?: string;
  phone?: string;
  promotionalDeals?: boolean;
};

const organizationTypeOptions = [
  { label: "Private", value: "private" },
  { label: "Public", value: "public" },
  { label: "Non-Profit", value: "nonprofit" },
];

const MyProfile = () => {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState("+1");
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImg(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onFinish = (values: unknown) => {
    const typedValues = values as ProfileFormValues;
    const fullPhone = `${countryCode} ${typedValues.phone}`;
    const countryCodewithPlus = `${countryCode}`;
    console.log({ ...typedValues, fullPhone, countryCodewithPlus });
  };

  return (
    <ProfilelWrapper>
      <ProfileTitle>My Profile</ProfileTitle>
      <ProfileImageWrapper>
        <ProfileAvatar>
          {profileImg ? (
            <img src={profileImg} alt="Profile" />
          ) : (
            <UserOutlined style={{ fontSize: 64, color: "#bbb" }} />
          )}
          <EditIconLabel htmlFor="profile-upload">
            <Circle bg={"#62A8BF"} width="42px" height="42px">
              <EditIcon />
            </Circle>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </EditIconLabel>
        </ProfileAvatar>
      </ProfileImageWrapper>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          firstName: "Asr01",
          lastName: "",
          organizationName: "",
          organizationType: undefined,
          email: "",
          phone: "",
          promotionalDeals: false,
        }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
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
            placeholder="Last Name"
            inputBorder="1px solid #D9D9D9"
          />
        </Form.Item>
        <Form.Item name="organizationName" style={{ marginBottom: "0px" }}>
          <CommonInput
            placeholder="Organization/Affiliation Name"
            inputBorder="1px solid #D9D9D9"
          />
        </Form.Item>
        <Form.Item name="organizationType" style={{ marginBottom: "0px" }}>
          <CommonSelect
            placeholder="Organization Type"
            options={organizationTypeOptions}
            border="1px solid #D9D9D9"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "Please enter a valid email address" },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <CommonInput
            placeholder="Email Address"
            type="email"
            inputBorder="1px solid #D9D9D9"
          />
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
              type="tel"
              placeholder="Enter Phone Number"
              style={{ flex: 1 }}
              inputBorder="1px solid #D9D9D9"
            />
          </PhoneRow>
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
    </ProfilelWrapper>
  );
};

export default MyProfile;

const ProfilelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const ProfileTitle = styled.h2`
  font-family: "Manrope";
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #212121;
`;

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
`;

const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const EditIconLabel = styled.label`
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: #62a8bf;
  color: #fff;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #fff;
  font-size: 18px;
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PhoneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
