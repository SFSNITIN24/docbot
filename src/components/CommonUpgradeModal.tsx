import styled from "styled-components";
import { Circle } from "./CommonCircle";
import {UpgradeIcon } from "../utils/svg";
import CommonButton from "./CommonButton";
import React from "react";
import { IconWrapper } from "./CommonStyle";

interface CommonUpgradeModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cicleColor?: string;
  buttonColor?: string;
  bgColor?: string;
  bgHoverColor?: string;
  borderRadius?: string;
}

const CommonUpgradeModal: React.FC<CommonUpgradeModalProps> = ({
  title,
  description,
  onConfirm,
  confirmText = "Submit",
  cicleColor = "#62A8BF",
  bgColor = "#62A8BF",
  bgHoverColor = "#62A8BF",
  borderRadius = "10px",
}) => {
  return (
    <ModalWrapper>
      <IconWrapper>
        <Circle bg={cicleColor} width="80px" height="80px">
          <UpgradeIcon color="#fff" width="40px" height="40px" />
        </Circle>
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <CommonButton
        bgColor={bgColor}
        color="#fff"
        bgHoverColor={bgHoverColor}
        borderRadius={borderRadius}
        onClick={onConfirm}
      >
        {confirmText}
      </CommonButton>
    </ModalWrapper>
  );
};

export default CommonUpgradeModal;
const ModalWrapper = styled.div`
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
