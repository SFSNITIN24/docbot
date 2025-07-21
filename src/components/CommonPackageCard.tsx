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
}

const CommonPackageCard: React.FC<CommonPackageCardProps> = ({
  title,
  price,
  period,
  features,
  recommended = false,
  onSelect,
}) => {
  return (
    <CardWrapper recommended={recommended}>
      {recommended && <RecommendedBanner>Recommended</RecommendedBanner>}
      <Title>{title}</Title>
      <PriceRow>
        <Price>${price.toFixed(2)}</Price>
        <Period>{period}</Period>
      </PriceRow>
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
        >
          Select
        </CommonButton>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default CommonPackageCard;

const CardWrapper = styled.div<{ recommended?: boolean }>`
  box-shadow: 0px 0px 4px 0px #183b560d;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  min-width: 284px;
  max-width: 284px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

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
  margin-bottom: 24px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
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
