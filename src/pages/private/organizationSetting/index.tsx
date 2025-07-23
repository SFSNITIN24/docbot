import { useEffect, useState } from "react";
import styled from "styled-components";
import UserAccountLayout from "../../../components/UserAccountLayout";
import CommonButton from "../../../components/CommonButton";
import { DeleteIcon, EditPencilIcon } from "../../../utils/svg";
import { IconWrapper } from "../../../components/CommonStyle";
import { Button, Table, Tag } from "antd";
import { tagStyles } from "../../../theme/tagColors";
import { Circle } from "../../../components/CommonCircle";
import ModalComponent from "../../../components/CommonModal";
import InviteUser from "./inviteUser";
import CommonDeleteModal from "../../../components/CommonDeleteModal";
import EditOrganization from "./editOrganization";
import OrganizationResetPassword from "./resetPassword";

const OrganizationSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isMobile , setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Email address",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let tagStyle = {};
        if (status === "Active") {
          tagStyle = tagStyles.green;
        } else if (status === "Inactive" || status === "Deleted") {
          tagStyle = tagStyles.red;
        } else if (status === "Onboarding") {
          tagStyle = tagStyles.yellow;
        }
        return <Tag style={tagStyle}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <CommonButton
            bgcolor="#fff"
            bghovercolor="#fff"
            border="1px solid #1D3D47"
            borderRadius="100px"
            height="32px"
            width="142px"
            style={{ borderRadius: 20 }}
            color="#1D3D47"
            onClick={() => setShowResetPassword(true)}
          >
            Reset Password
          </CommonButton>
          <Circle
            bg="#FB4A49"
            width="24px"
            height="24px"
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon width={"13px"} height={"13px"} />
          </Circle>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: "Darrell Steward",
      email: "sara.cruz@example.com",
      status: "Onboarding",
    },
    {
      key: 2,
      name: "Marvin McKinney",
      email: "willie.jennings@example.com",
      status: "Active",
    },
    {
      key: 3,
      name: "Leslie Alexander",
      email: "kenzi.lawson@example.com",
      status: "Active",
    },
    {
      key: 4,
      name: "Kathryn Murphy",
      email: "debra.holt@example.com",
      status: "Inactive",
    },
  ];
  const pageSize = 10;
  const totalItems = data.length;
  return (
    <UserAccountLayout chatUrl="/chat">
      <TopBar>
        <div className="left-part">
          <div className="title">
            <p>{isEditing ? "Edit Organization" : "Organization Setting"}</p>
            <IconWrapper
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer" }}
            >
              <EditPencilIcon />
            </IconWrapper>
          </div>
          <p className="sub-title">Organization Name</p>
        </div>
        <div className="right-part">
          <input
            type="search"
            placeholder="Search by Email"
            className="search-field"
          />
          <CommonButton
            borderRadius="100px"
            height="48px"
            width={isMobile ? "100%" : "178px"}
            onClick={() => setShowInviteModal(true)}
          >
            Invite User
          </CommonButton>
        </div>
      </TopBar>
      <ContentWrapper>
        <StyledTable
          columns={columns}
          dataSource={data}
          pagination={{
            current: 1,
            pageSize: pageSize,
            total: totalItems,
            onChange: handlePageChange,
            showSizeChanger: false,
            itemRender: (page, type, originalElement) => {
              if (type === "prev") {
                return page === 1 ? (
                  <Button disabled>← Previous</Button>
                ) : (
                  <Button onClick={() => handlePageChange(page - 1)}>
                    ← Previous
                  </Button>
                );
              }
              if (type === "next") {
                return page === Math.ceil(totalItems / 10) ? (
                  <Button disabled>Next →</Button>
                ) : (
                  <Button onClick={() => handlePageChange(page + 1)}>
                    Next →
                  </Button>
                );
              }
              if (type === "page") {
                return (
                  <Button
                    type={currentPage === page ? "primary" : "default"}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                );
              }
              if (type === "jump-prev" || type === "jump-next") {
                return originalElement;
              }
            },
          }}
          scroll={{ x: "100%" }}
        />
      </ContentWrapper>
      {showInviteModal && (
        <ModalComponent
          openModal={showInviteModal}
          setOpenModal={setShowInviteModal}
        >
          <InviteUser />
        </ModalComponent>
      )}
      {deleteModal && (
        <ModalComponent openModal={deleteModal} setOpenModal={setDeleteModal}>
          <CommonDeleteModal
            title="Delete Profile"
            description="Are you sure you want to DELETE this User?"
            onConfirm={() => {
              console.log("Deleted");
              setDeleteModal(false);
            }}
            onCancel={() => setDeleteModal(false)}
          />
        </ModalComponent>
      )}
      {isEditing && (
        <ModalComponent openModal={isEditing} setOpenModal={setIsEditing}>
          <EditOrganization />
        </ModalComponent>
      )}
      {showResetPassword && (
        <ModalComponent
          openModal={showResetPassword}
          setOpenModal={setShowResetPassword}
        >
          <OrganizationResetPassword
            onConfirm={() => setShowResetPassword(false)}
            onCancel={() => setShowResetPassword(false)}
          />
        </ModalComponent>
      )}
    </UserAccountLayout>
  );
};

export default OrganizationSetting;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 60px;
  background-color: #fff;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 12px;
  }

  .left-part {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: "Manrope";
    color: #1c1c1c;
    width: 100%;

    .title {
      display: flex;
      align-items: center;
      gap: 8px;

      p {
        font-weight: 700;
        font-size: 24px;
        line-height: 120%;
      }
    }
    .sub-title {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
    }
  }

  .right-part {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    @media (max-width: 550px) {
      flex-wrap: wrap;
      gap: 12px;
    }

    .search-field {
      border: 1px solid var(--gray-border-color, #c8c8c8);
      height: 48px;
      border-radius: 10px;
      padding: 0 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      width: 300px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.3s;

      &:focus,
      &:active {
        border-color: var(--gray-border-color, #c8c8c8);
      }

      &::placeholder {
        color: #999;
      }
      @media (max-width: 550px) {
        width: 100%;
      }
    }
  }
`;

const ContentWrapper = styled.div``;
const StyledTable = styled(Table)`
  margin-top: 24px;
  .ant-table-thead > tr > th {
    background-color: #fff;
    font-weight: 600;
    font-family: "Manrope";
    font-size: 14px;
    line-height: 150%;
  }
  .ant-table-tbody > tr > td {
    font-family: "Manrope";
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
  }
  .ant-table-tbody > tr > td:first-child,
  .ant-table-tbody > tr > td:nth-child(2) {
    font-weight: 600;
  }
  .ant-tag {
    height: 20px;
    font-weight: 600;
    font-size: 10px;
    line-height: 120%;
    padding: 3px 8px;
    border-radius: 100px;
    border: none;
  }
  .ant-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ant-pagination-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-pagination-prev {
    margin-right: auto;
  }

  .ant-pagination-next {
    margin-left: auto;
  }
`;
