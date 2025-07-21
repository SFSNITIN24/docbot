import styled from "styled-components";
import CommonDashboardCard from "../../../components/CommonDashboardCard";
import { CollectorLogoMarkIcon } from "../../../utils/svg";
import { AuthLogo } from "../../../utils/images";
import CommonModal from "../../../components/CommonModal";
import { useState, type JSX } from "react";
import CommonButton from "../../../components/CommonButton";
import { useNavigate } from "react-router-dom";

interface CardData {
  image: JSX.Element;
  badge: string;
  title: string;
  description: string;
  cardBgColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
}

const cardData = [
  {
    image: <img src={AuthLogo} alt="Bot" style={{ width: 40, height: 40 }} />,
    badge: "Subscribed",
    title: "Feature Name",
    description:
      "Amet amet in dolor nisl feugiat donec. Integer a urna cursus odio ac dolor. Lectus sed massa massa facilisi eu.",
    cardBgColor: "#F7F7F7",
    badgeBgColor: "#E6F0FF",
    badgeTextColor: "#2563EB",
  },
  {
    image: <img src={AuthLogo} alt="Bot" style={{ width: 40, height: 40 }} />,
    badge: "Subscribed",
    title: "DocBot",
    description:
      "Amet amet in dolor nisl feugiat donec. Integer a urna cursus odio ac dolor. Lectus sed massa massa facilisi eu.",
    cardBgColor: "#F7F7F7",
    badgeBgColor: "#E6F0FF",
    badgeTextColor: "#2563EB",
  },
  {
    image: <CollectorLogoMarkIcon />,
    badge: "Token: 4",
    title: "Feature Name",
    description:
      "Amet amet in dolor nisl feugiat donec. Integer a urna cursus odio ac dolor. Lectus sed massa massa facilisi eu.",
    cardBgColor: "#F7F7F7",
    badgeBgColor: "#FFE6E6",
    badgeTextColor: "#EB2525",
  },
  {
    image: <CollectorLogoMarkIcon />,
    badge: "Token: 4",
    title: "Feature Name",
    description:
      "Amet amet in dolor nisl feugiat donec. Integer a urna cursus odio ac dolor. Lectus sed massa massa facilisi eu.",
    cardBgColor: "#F7F7F7",
    badgeBgColor: "#FFE6E6",
    badgeTextColor: "#EB2525",
  },
  {
    image: <CollectorLogoMarkIcon />,
    badge: "Subscribed",
    title: "Feature Name",
    description:
      "Amet amet in dolor nisl feugiat donec. Integer a urna cursus odio ac dolor. Lectus sed massa massa facilisi eu.",
    cardBgColor: "#F7F7F7",
    badgeBgColor: "#E6F0FF",
    badgeTextColor: "#2563EB",
  },
  {
    image: <CollectorLogoMarkIcon />,
    badge: "Subscribed",
    title: "Feature Name",
    description:
      "Amet amet in dolor nisl feugiat donec. Integer a urna cursus odio ac dolor. Lectus sed massa massa facilisi eu.",
    cardBgColor: "#F7F7F7",
    badgeBgColor: "#E6F0FF",
    badgeTextColor: "#2563EB",
  },
];

const DashBoardPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const handleClick = (path: string) => () => {
    navigate(path);
  };

  return (
    <>
      <DashboardWrapper>
        <DashboardGrid>
          {cardData.map((card, idx) => (
            <CommonDashboardCard
              key={card.title + idx}
              image={card.image}
              badge={card.badge}
              title={card.title}
              description={card.description}
              cardBgColor={card.cardBgColor}
              badgeBgColor={card.badgeBgColor}
              badgeTextColor={card.badgeTextColor}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </DashboardGrid>
      </DashboardWrapper>
      {selectedCard && (
        <CommonModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          width={500}
        >
          <ModalWrapper>
            <TextWrapper>
              <p className="title">Welcome back</p>
              <p className="description">
                You don’t have enough tokens to access this feature. Please log
                in or sign up to unlock full access.
              </p>
            </TextWrapper>
            <ButtonWrapper>
              <CommonButton
                bgColor="#62A8BF"
                width="100%"
                borderRadius="10000px"
                onClick={handleClick("/")}
              >
                Log in
              </CommonButton>
              <CommonButton
                bgColor="#fff"
                width="100%"
                borderRadius="10000px"
                border="1px solid #1C1C1C"
                color="#1C1C1C"
                bgHoverColor="#fff"
                onClick={handleClick("/dashboard-layout")}
              >
                Sign up for free
              </CommonButton>
            </ButtonWrapper>
          </ModalWrapper>
        </CommonModal>
      )}
    </>
  );
};

export default DashBoardPage;

const DashboardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;
const DashboardGrid = styled.div`
  width: 100%;
  max-width: 1010px;
  margin: 0 auto;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 20px;
  background: #fff;

  @media (max-width: 1024px) {
    max-width: 680px;
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    gap: 24px;
    padding: 24px 8px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(240px, 1fr));
    gap: 16px;
    padding: 16px 4px;
  }
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
  max-width: 480px;
  padding: 32px 24px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-width: 95vw;
    padding: 20px 8px;
    gap: 20px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  .title {
    font-family: "Manrope";
    font-weight: 600;
    font-size: 24px;
    line-height: 120%;
    text-align: center;
    color: #1c1c1c;

    @media (max-width: 768px) {
      font-size: 18px;
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  .description {
    font-family: "Manrope";
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: #4c4c4c;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  @media (max-width: 480px) {
    gap: 8px;
  }
`;
