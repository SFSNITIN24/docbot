import React from "react";
import styled from "styled-components";

interface CommonCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: none;
    width: 18px;
    height: 18px;
    margin-right: 6px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    outline: none;
    box-shadow: 0 0 0 1.5px #62a8bf;
    transition: background 0.2s, box-shadow 0.2s;
  }
  input[type="checkbox"]:checked {
    background-color: #62a8bf;
    box-shadow: 0 0 0 1.5px #62a8bf;
  }
  input[type="checkbox"]:checked::after {
    content: "";
    display: block;
    position: absolute;
    left: 5px;
    top: 1px;
    width: 7px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2.5px 2.5px 0;
    transform: rotate(45deg);
  }
  span {
    user-select: none;
  }
`;

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  checked,
  onChange,
  ...props
}) => (
  <CheckboxWrapper>
    <input type="checkbox" checked={checked} onChange={onChange} {...props} />
  </CheckboxWrapper>
);

export default CommonCheckbox;
