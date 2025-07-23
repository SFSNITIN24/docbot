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
  overFlow?: string;
  height?: string | number;
  width?: string | number;
  prefixCls?: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  openModal,
  setOpenModal,
  children,
  width = 400,
  closable = true,
  maskClosable = true,
  minHeight,
  height,
  overFlow = "auto",
  prefixCls,
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
      bodyStyle={{ background: "transparent", padding: 0 }}
      {...rest}
      prefixCls={prefixCls}
    >
      <ModalContentWrapper
        $height={height}
        $minHeight={minHeight}
        $overflow={overFlow}
      >
        {children}
      </ModalContentWrapper>
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
    position: relative;
  }

  .ant-modal-close {
    position: absolute;
    top: -12px;
    right: -12px;
    background-color: black;
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;

    &:hover {
      background-color: #333;
      color: white;
    }

    .ant-modal-close-x {
      font-size: 14px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const ModalContentWrapper = styled.div<{
  $minHeight?: string | number;
  $height?: string | number;
  $overflow?: string;
}>`
  @media (max-width: 1800px) {
    height: ${({ $height }) => ($height ? `${$height}` : "auto")};
    min-height: ${({ $minHeight }) => ($minHeight ? `${$minHeight}` : "auto")};
    overflow: ${({ $overflow }) => $overflow || "auto"};
  }
`;
