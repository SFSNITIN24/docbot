import React from "react";
import styled from "styled-components";

interface CommonDashboardCardProps {
  image: React.ReactNode;
  badge?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  cardbgcolor?: string;
  cardTextColor?: string;
  badgebgcolor?: string;
  badgeTextColor?: string;
  contentTextColor?: string;
  onClick?: () => void; 
}

const CommonDashboardCard: React.FC<CommonDashboardCardProps> = ({
  image,
  badge,
  title,
  description,
  className,
  cardbgcolor,
  cardTextColor,
  badgebgcolor,
  badgeTextColor,
  contentTextColor,
  onClick,
}) => {
  return (
    <CardContainer
      className={className}
      $bg={cardbgcolor}
      $text={cardTextColor}
      onClick={onClick} 
    >
      <TopRow>
        <ImageWrapper>{image}</ImageWrapper>
        {badge && (
          <BadgeWrapper $bg={badgebgcolor} $text={badgeTextColor}>
            {badge}
          </BadgeWrapper>
        )}
      </TopRow>
      <div>
        <Title $text={cardTextColor}>{title}</Title>
        <Description $text={contentTextColor}>{description}</Description>
      </div>
    </CardContainer>
  );
};

export default CommonDashboardCard;

const CardContainer = styled.div<{
  $bg?: string;
  $text?: string;
}>`
  background: ${({ $bg }) => $bg || "#F7F7F7"};
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  position: relative;
  max-width: 320px;
  min-height: 218px;
  color: ${({ $text }) => $text || "#1c1c1c"};
  cursor: pointer;
  &:hover {
    color: white;
    background: #62A8BF;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeWrapper = styled.div<{
  $bg?: string;
  $text?: string;
}>`
  background: ${({ $bg }) => $bg || "#E6F0FF"};
  color: ${({ $text }) => $text || "#2563EB"};
  border-radius: 100px;
  padding: 10px 8px;
  font-weight: 600;
  font-size: 10px;
  line-height: 120%;
  display: inline-block;
`;

const Title = styled.div<{
  $text?: string;
}>`
  font-family: "Manrope";
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: ${({ $text }) => $text || "#1c1c1c"};
  margin-bottom: 3px;
  
  ${CardContainer}:hover & {
    color: white;
  }
`;

const Description = styled.div<{
  $text?: string;
}>`
  color: ${({ $text }) => $text || "#1C1C1C"};
  font-family: "Manrope";
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  
  ${CardContainer}:hover & {
    color: white;
  }
`;
