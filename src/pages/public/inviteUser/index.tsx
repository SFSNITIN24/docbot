
import { Form } from 'antd';
import styled from 'styled-components';
import CommonInput from '../../../components/CommonInput';
import CommonButton from '../../../components/CommonButton';

type ProfileFormValues = {
  firstName: string;
    lastName?: string;
   
    email?: string;
};

const InviteUser = () => {
    const [form] = Form.useForm();

    const onFinish = (values: unknown) => {
        const typedValues = values as ProfileFormValues;
        console.log({ ...typedValues});
    };

    return (
        <ProfilelWrapper>
            <ProfileTitle>Invite User</ProfileTitle>
            <StyledForm
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    firstName: 'Asr01',
                    lastName: '',
                    email: '',
                }}
            >
                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                     style={{ marginBottom: "0px" }}
                >
                    <CommonInput placeholder="Name" label='First Name'  inputBorder="1px solid #D9D9D9"/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                     style={{ marginBottom: "0px" }}

                >
                    <CommonInput placeholder="Last Name"  inputBorder="1px solid #D9D9D9"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                     style={{ marginBottom: "0px" }}

                >
                    <CommonInput placeholder="Email Address" type="email" inputBorder="1px solid #D9D9D9" />
                </Form.Item>
             
               
                <Form.Item  style={{ marginBottom: "0px" }}>
                    <CommonButton bgColor="#62A8BF" color="#fff" bgHoverColor="#62A8BF" borderRadius="100px" >
                        Invite
                    </CommonButton>
                </Form.Item>
            </StyledForm>
        </ProfilelWrapper>
    );
};

export default InviteUser;

const ProfilelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  
`;

const ProfileTitle = styled.h2`
  font-family: 'Manrope';
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
