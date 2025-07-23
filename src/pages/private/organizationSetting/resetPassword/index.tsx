import styled from "styled-components";
import CommonButton from "../../../../components/CommonButton";

interface CommonButtonProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const OrganizationResetPassword: React.FC<CommonButtonProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <Wrapper>
      <Title>Resets a user password</Title>
      <Description>
        Are you sure you want to reset this user's password? If confirmed, a
        reset password link will be sent to their email, and the password will
        be updated accordingly.
      </Description>
      <ButtonWrapper>
        <CommonButton
          border="1px solid #000000"
          bgcolor="#fff"
          bghovercolor="#fff"
          borderRadius="10px"
          color="#000"
          onClick={onCancel}
          height="40px"
        >
          No
        </CommonButton>
        <CommonButton
          bgcolor="#62A8BF"
          color="#fff"
          bghovercolor="#62A8BF"
          borderRadius="10px"
          onClick={onConfirm}
          height="40px"
        >
          Yes
        </CommonButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default OrganizationResetPassword;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  width: 100%;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #212121;
  margin-top: 4px;
`;
const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #424242;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  width: 100%;
`;
