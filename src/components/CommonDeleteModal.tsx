import styled from "styled-components"
import { Circle } from "./CommonCircle"
import { DeleteIcon } from "../utils/svg"
import CommonButton from "./CommonButton"
import React from "react"

interface CommonDeleteModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CommonDeleteModal: React.FC<CommonDeleteModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <DeleteWrapper>
      <IconWrapper>
        <Circle bg="#FB4A49" width="80px" height="80px">
          <DeleteIcon />
        </Circle>
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ButtonWrapper>
        <CommonButton
          border="1px solid #000000"
          bgColor="#fff"
          bgHoverColor="#fff"
          borderRadius="10px"
          color="#000"
          onClick={onCancel}
        >
          {cancelText}
        </CommonButton>
        <CommonButton
          bgColor="#FB4A49"
          color="#fff"
          bgHoverColor="#FB4A49"
          borderRadius="10px"
          onClick={onConfirm}
        >
          {confirmText}
        </CommonButton>
      </ButtonWrapper>
    </DeleteWrapper>
  )
}

export default CommonDeleteModal
const DeleteWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
gap:12px;
width: 100%;`
const IconWrapper = styled.div``

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
gap:8px;
margin-top:12px;
width: 100%;`