import { Button } from "antd";
import React from "react";
import styled from "styled-components";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgcolor?: string;
  color?: string ;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  bghovercolor?: string;
  width?: string;
  height?: string;
  border?: string;
}

const StyledButton = styled(Button)<CommonButtonProps>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "56px"};
  background: ${({ bgcolor }) => bgcolor || "#62A8BF"};
  color: ${({ color }) => color || "#fff"} !important;
  border-radius: ${({ borderRadius }) => borderRadius || "8px"};
  padding: ${({ padding }) => padding || "10px"};
  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize || "16px"};
  border: ${({ border }) => border || "none"};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ bghovercolor }) => bghovercolor || "#62A8BF"} !important;
    border: ${({ border }) => border || "none"} !important;
  }
  @media (max-width: 768px) {
    height: ${({ height }) => height || "48px"};
  }
  @media (max-width: 480px) {
   width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "40px"};
  }
`;

const CommonButton: React.FC<CommonButtonProps> = ({ children, ...rest }) => (
  <StyledButton {...rest} htmlType="submit">
    {children}
  </StyledButton>
);

export default CommonButton;
