import React from "react";
import CommonButton from "./CommonButton";
import styled from "styled-components";
import { CheckMarkIcon } from "../utils/svg";

interface CommonPackageCardProps {
  title: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
  onSelect?: () => void;
  activePlan?: boolean;
  renewAmount?: number | null;
  renewDate?: string | null;
  upgrade?: boolean;
  boxShadow?: string;
}

const CommonPackageCard: React.FC<CommonPackageCardProps> = ({
  title,
  price,
  period,
  features,
  recommended = false,
  onSelect,
  activePlan = false,
  renewAmount = null,
  renewDate = null,
  upgrade = false,
  boxShadow,
}) => {
  return (
    <CardWrapper recommended={recommended} boxShadow={boxShadow}>
      {recommended && <RecommendedBanner>Recommended</RecommendedBanner>}
      <CardContent>
        <Title>{title}</Title>
        <PriceRow>
          <Price>${price.toFixed(2)}</Price>
          <Period>{period}</Period>
        </PriceRow>
        {activePlan && (
          <CurrentPlan>
            <CommonButton
              bgcolor="#fff"
              bghovercolor="#fff"
              borderRadius="100px"
              border="1px solid #A9A9A9"
              height="32px"
              color="#8A8A8A"
            >
              Your current plan
            </CommonButton>
            <CurrentPlanText>
              Renews for {renewAmount} on {renewDate}
            </CurrentPlanText>
          </CurrentPlan>
        )}
        <Divider />
        <FeatureList>
          {features?.map((feature, idx) => (
            <FeatureItem key={idx}>
              <CheckmarkWrapper>
                <CheckMarkIcon />
              </CheckmarkWrapper>
              <FeatureText>{feature}</FeatureText>
            </FeatureItem>
          ))}
        </FeatureList>
        <ButtonWrapper>
          <CommonButton
            width="100%"
            onClick={onSelect}
            borderRadius="100px"
            height="40px"
            color={activePlan ? "#FB4A49" : "#fff"}
            bgcolor={activePlan ? "#ffdee6" : "#62A8BF"}
            bghovercolor={activePlan ? "#ffdee6" : "#62A8BF"}
            border={activePlan ? "1px solid #FB4A49" : "none"}
          >
            {activePlan
              ? "Cancel subscription"
              : upgrade
              ? "Upgrade"
              : "Select"}
          </CommonButton>
        </ButtonWrapper>
      </CardContent>
    </CardWrapper>
  );
};

export default CommonPackageCard;

const CardWrapper = styled.div<{ recommended?: boolean; boxShadow?: string }>`
  box-shadow: ${({ boxShadow }) => boxShadow ?? "0px 0px 4px 0px #183b560d"};
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  min-width: 284px;
  max-width: 284px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: -webkit-fill-available;
  position: relative;
  align-items: stretch;
  &:hover {
    background: #007bff0d;
  }

  @media (max-width: 480px) {
    margin-top: ${({ recommended }) => (recommended ? "30px" : "0px")};
  }
`;

const RecommendedBanner = styled.div`
  position: absolute;
  top: -32px;
  left: 0;
  right: 0;
  background: #62a8bf;
  color: #fff;
  border-radius: 4px 4px 0 0;
  padding: 8px 0;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

const Title = styled.div`
  margin-bottom: 6px;
  font-family: "Manrope";
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  color: #1c1c1c;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;
const CurrentPlan = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
`;

const CurrentPlanText = styled.span`
  font-family: "Manrope";
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  color: #62a8bf;
`;
const Price = styled.span`
  font-family: "Manrope";
  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  color: #1c1c1c;
`;
const Period = styled.span`
  font-family: "Manrope";
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  margin-left: 4px;
  color: #818b9a;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #d8d8d8;
  margin: 19px 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CheckmarkWrapper = styled.span`
  margin-right: 10px;
`;

const FeatureText = styled.span`
  font-family: "Manrope";
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #5c5c5c;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Fills available height */
`;
