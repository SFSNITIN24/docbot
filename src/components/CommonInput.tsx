// import React, { useState } from "react";
// import styled from "styled-components";

// interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
//   eyeIcon?: React.ReactNode;
//   eyeOffIcon?: React.ReactNode;
//   inputBorder?: string; 
// }

// const Wrapper = styled.div<{ $inputBorder?: string }>`
//   display: flex;
//   width: 100%;
//   gap: 6px;
//   padding: 5.5px 10px;
//   align-items: center;
//   background: #ffffff;
//   border-radius: 10px;
//   border: ${({ $inputBorder }) => $inputBorder || 'none'};
//   height: 56px;
// `;

// const Label = styled.label`
//   font-family: "Manrope";
//   font-weight: 400;
//   font-size: 10px;
//   line-height: 150%;
//   color: #6b6b6b;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   border:none;
//   width: 100%;
//   gap: 10px;
// `;

// const StyledInput = styled.input`
//   flex: 1;
//   border: none;
//   outline: none;
//   background: transparent;
//   font-family: "Manrope";
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 150%;
//   color: #212121;
//   height: 100%;
//   &::placeholder {
//     color: #6B6B6B;
//     opacity: 1;
//   }
//   @media (max-width: 480px) {
//     font-size: 14px;
//   }
// `;

// const IconWrapper = styled.div``;
// const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   gap: 6px;
// `;

// const CommonInput: React.FC<CommonInputProps> = ({
//   label,
//   leftIcon,
//   rightIcon,
//   eyeIcon,
//   eyeOffIcon,
//   type = "text",
//   id,
//   inputBorder, // Add this line
//   ...props
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const isPassword = type === "password";
//   return (
//     <Wrapper $inputBorder={inputBorder}>
//       {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
//       <ContentWrapper>
//         {label && <Label htmlFor={id}>{label}</Label>}
//         <InputWrapper >
//           <StyledInput
//             {...props}
//             id={id}
//             type={isPassword ? (showPassword ? "text" : "password") : type}
//           />
//           {isPassword && (eyeIcon || eyeOffIcon) ? (
//             <IconWrapper
//               style={{
//                 cursor: "pointer",
//                 background: "transparent",
//                 marginRight: 0,
//               }}
//               onClick={() => setShowPassword((v) => !v)}
//             >
//               {showPassword ? eyeIcon : eyeOffIcon}
//             </IconWrapper>
//           ) : rightIcon ? (
//             <IconWrapper style={{ background: "transparent", marginRight: 0 }}>
//               {rightIcon}
//             </IconWrapper>
//           ) : null}
//         </InputWrapper>
//       </ContentWrapper>
//     </Wrapper>
//   );
// };

// export default CommonInput;
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  eyeIcon?: React.ReactNode;
  eyeOffIcon?: React.ReactNode;
  inputBorder?: string;
}

const Wrapper = styled.div<{ $inputBorder?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 5.5px 10px;
  gap: 6px;
  background: #ffffff;
  border-radius: 10px;
  border: ${({ $inputBorder }) => $inputBorder || "1px solid #ccc"};
`;

const Label = styled.label<{ $float: boolean, $hasLeftIcon?: boolean }>`
  position: absolute;
 left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "40px" : "10px")};
  top: ${({ $float }) => ($float ? "6px" : "50%")};
  transform: translateY(${({ $float }) => ($float ? "0" : "-50%")});
  font-size: ${({ $float }) => ($float ? "10px" : "16px")};
  color: #6b6b6b;
  padding: 0 4px;
  transition: all 0.2s ease;
  pointer-events: none;
  font-family: "Manrope";
  z-index: 1;
`;

const StyledInput = styled.input<{ $hasFloating: boolean }>`
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: "Manrope";
  font-size: 16px;
  color: #212121;
  height: 100%;
  padding-top: ${({ $hasFloating }) => ($hasFloating ? "12px" : "0")};

  &::placeholder {
    color: ${({ $hasFloating }) => ($hasFloating ? "transparent" : "#6B6B6B")};
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  placeholder,
  leftIcon,
  rightIcon,
  eyeIcon,
  eyeOffIcon,
  type = "text",
  id,
  inputBorder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value?.toString() || "");
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const showFloating = !!label;
  const floatLabel = isFocused || value;

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value.toString());
      setIsFocused(true)
    }
  }, [props.value]);
  return (
    <Wrapper $inputBorder={inputBorder}>
      {showFloating && (
        <Label htmlFor={id} $float={!!floatLabel}  $hasLeftIcon={!!leftIcon}>
          {label}
        </Label>
      )}
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      <StyledInput
        {...props}
        id={id}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={showFloating ? label : placeholder}
        $hasFloating={showFloating}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        autoComplete="off"
      />
      {isPassword && (eyeIcon || eyeOffIcon) && (
        <IconWrapper
          onClick={() => setShowPassword((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? eyeIcon : eyeOffIcon}
        </IconWrapper>
      )}
      {!isPassword && rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </Wrapper>
  );
};

export default CommonInput;
