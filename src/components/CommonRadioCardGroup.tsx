import React from "react";
import styled, { css } from "styled-components";

export interface RadioCardOption {
  label: string;
  description?: string;
  value: string;
}

interface CommonRadioCardGroupProps {
  options: RadioCardOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  flexDirection?: "row" | "column";
}

const CommonRadioCardGroup: React.FC<CommonRadioCardGroupProps> = ({
  options,
  value,
  onChange = () => {},
  className,
  flexDirection = "column",
}) => {
  return (
    <RadioGroupWrapper className={className} flexDirection={flexDirection}>
      {options?.map((option) => {
        const selected = value === option.value;
        return (
          <RadioCard
            key={option.value}
            selected={selected}
            onClick={() => onChange(option.value)}
          >
            <RadioCircle selected={selected}>
              {selected && <RadioDot />}
            </RadioCircle>
            <RadioContent>
              <RadioLabel>{option.label}</RadioLabel>
              {option.description && (
                <RadioDescription>{option.description}</RadioDescription>
              )}
            </RadioContent>
          </RadioCard>
        );
      })}
    </RadioGroupWrapper>
  );
};

export default CommonRadioCardGroup;

const RadioGroupWrapper = styled.div<{ flexDirection: "row" | "column" }>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};

  gap: 16px;
  width: 100%;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const RadioCard = styled.div<{ selected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
  ${({ selected }) =>
    selected &&
    css`
      border-color: #62a8bf;
      background: #fafdff;
    `}
`;

const RadioCircle = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #bdbdbd;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  ${({ selected }) =>
    selected &&
    css`
      border-color: #62a8bf;
    `}
`;

const RadioDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #62a8bf;
`;

const RadioContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioLabel = styled.div`
  font-family: "Manrope";
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  color: black;
`;

const RadioDescription = styled.div`
  font-family: "Manrope";
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #696969;
`;
