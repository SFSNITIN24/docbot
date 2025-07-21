import React from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd";
import styled from "styled-components";
import { ModalCrossIcon } from "../utils/svg";

interface ModalComponentProps
  extends Omit<ModalProps, "open" | "onCancel" | "onOk"> {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  minHeight?: string | number;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  openModal,
  setOpenModal,
  children,
  width = 400,
  closable = true,
  maskClosable = true,
  minHeight,
  ...rest
}) => {
  const handleCancel = () => setOpenModal(false);

  return (
    <StyledModal
      width={width}
      open={openModal}
      title={null}
      centered
      closeIcon={closable && <ModalCrossIcon />}
      maskClosable={maskClosable}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ background: "transparent", minHeight }}
      {...rest}
    >
      {children}
    </StyledModal>
  );
};

export default ModalComponent;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    padding: 24px;
    box-shadow: 6px 6px 29.9px 0px #0000001a;
    background: #fff;
  }
  .ant-modal-close {
    top: -10px;
    right: -10px;
    background-color: black;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;

    &:hover {
      background-color: #333;
      color: white;
    }

    .ant-modal-close-x {
      font-size: 12px;
      line-height: 1;
    }
  }
`;
