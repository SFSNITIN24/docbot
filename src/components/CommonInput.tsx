import React, { useState } from "react";
import styled from "styled-components";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  eyeIcon?: React.ReactNode;
  eyeOffIcon?: React.ReactNode;
  inputBorder?: string; // Add this line
}

const Wrapper = styled.div<{ $inputBorder?: string }>`
  display: flex;
  width: 100%;
  gap: 6px;
  padding: 5.5px 10px;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  border: ${({ $inputBorder }) => $inputBorder || 'none'};
  height: 56px;
`;

const Label = styled.label`
  font-family: "Manrope";
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
  color: #6b6b6b;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border:none;
  width: 100%;
  gap: 10px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: "Manrope";
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #212121;
  height: 100%;
  &::placeholder {
    color: #6B6B6B;
    opacity: 1;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const IconWrapper = styled.div``;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
`;

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  eyeIcon,
  eyeOffIcon,
  type = "text",
  id,
  inputBorder, // Add this line
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  return (
    <Wrapper $inputBorder={inputBorder}>
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      <ContentWrapper>
        {label && <Label htmlFor={id}>{label}</Label>}
        <InputWrapper >
          <StyledInput
            {...props}
            id={id}
            type={isPassword ? (showPassword ? "text" : "password") : type}
          />
          {isPassword && (eyeIcon || eyeOffIcon) ? (
            <IconWrapper
              style={{
                cursor: "pointer",
                background: "transparent",
                marginRight: 0,
              }}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? eyeIcon : eyeOffIcon}
            </IconWrapper>
          ) : rightIcon ? (
            <IconWrapper style={{ background: "transparent", marginRight: 0 }}>
              {rightIcon}
            </IconWrapper>
          ) : null}
        </InputWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CommonInput;
