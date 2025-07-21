import React from "react";
import { Select } from "antd";
import type { SelectProps, DefaultOptionType } from "antd/es/select";
import styled from "styled-components";
import { DownArrowIcon } from "../utils/svg";

export interface CommonSelectProps {
  options: { label?: React.ReactNode; value: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (
    value: string,
    option?: DefaultOptionType | DefaultOptionType[]
  ) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  allowClear?: boolean;
  suffixIcon?: React.ReactNode;
  border?: string; 
}

const StyledSelect = styled(Select<string>)<{ $border?: string }>`
  width: 100%;
  height: 56px !important;
  background: #ffffff;
  border-radius: 10px;
  border: ${({ $border }) => $border ?? "none"};
  box-shadow: 0px 2px 8px 0px #0000000a;

  .ant-select-selector {
    font-family: "Manrope";
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    
    height: 56px !important;
    display: flex;
    align-items: center;
    background: #ffffff !important;
    border-radius: 10px !important;
    border: none !important;
    color:#6B6B6B;
    
  }
    .ant-select-selection-placeholder {
    color: #6B6B6B !important;
  }

  .ant-select-arrow {
    color: #bdbdbd;
    font-size: 20px;
    right: 16px;
  }

  &.ant-select-focused .ant-select-selector {
    border: 1px solid #1890ff !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const CommonSelect: React.FC<CommonSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  disabled,
  style,
  allowClear = false,
  suffixIcon = <DownArrowIcon />, 
  border, // Add border prop
}) => {
  const handleChange: SelectProps<string>["onChange"] = (val, option) => {
    if (onChange) onChange(val, option);
  };

  return (
    <StyledSelect
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      options={options}
      size="large"
      allowClear={allowClear}
      suffixIcon={suffixIcon}
      bordered={false}
      dropdownStyle={{ maxHeight: 8 * 56, overflow: 'auto' }}
      $border={border} // Pass border prop
    />
  );
};

export default CommonSelect;
