import styled from "styled-components";
import UserAccountLayout from "../../../components/UserAccountLayout";
import CommonPackageCard from "../../../components/CommonPackageCard";
import React from "react";
import { useAppSelector } from "../../../store/hooks";

const ManageSubscription: React.FC = () => {
   const UserType = useAppSelector((state) => state.auth.user?.type);

  const handleSelect = (title: string) => {
    alert(`Selected package: ${title}`);
  };

  const enterprisePackages = [
    {
      title: "Free",
      price: 0,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      activePlan: false,
      renewAmount: undefined,
      renewDate: undefined,
      upgrade: false,
    },
    {
      title: "Bronze",
      price: 12.99,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      activePlan: false,
      renewAmount: undefined,
      renewDate: undefined,
      upgrade: false,
    },
    {
      title: "Silver",
      price: 18.99,
      period: "/month",
      activePlan: true,
      renewAmount: 12.99,
      renewDate: "2023-09-30",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      upgrade: false,
    },
    {
      title: "Gold",
      price: 25.99,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      activePlan: false,
      renewAmount: null,
      renewDate: null,
      upgrade: true,
    },
    {
      title: "Platinum",
      price: 34.99,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      upgrade: true,
      activePlan: false,
      renewAmount: null,
      renewDate: null,
    },
  ];
  const individualPackages = [
    {
      title: "Free",
      price: 0,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      upgrade: false,
      activePlan: false,
      renewAmount: null,
      renewDate: null,
    },
    {
      title: "Pro",
      price: 4.99,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      upgrade: false,
      activePlan: false,
      renewAmount: null,
      renewDate: null,
    },
    {
      title: "Premium",
      price: 12.99,
      period: "/month",
      features: [
        "Assistance with writing, problem solving and more",
        "Access to -40 mini",
        "Limited access to -40",
        "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
        "Use custom",
      ],
      recommended: false,
      upgrade: false,
      activePlan: false,
      renewAmount: null,
      renewDate: null,
    },
  ];
  return (
    <UserAccountLayout chatUrl="/chat" padding="25px 60px">
      <SubscriptionWrapper>
        <Title>Upgrade your plan</Title>
        <SubscriptionCards>
          {(UserType === "individual"
            ? individualPackages
            : enterprisePackages
          )?.map((pkg) => (
            <CommonPackageCard
              key={pkg.title}
              title={pkg.title}
              price={pkg.price}
              period={pkg.period}
              features={pkg.features}
              recommended={pkg.recommended}
              onSelect={() => handleSelect(pkg.title)}
              activePlan={pkg.activePlan || false}
              renewAmount={pkg.renewAmount || null}
              renewDate={pkg.renewDate || null}
              upgrade={pkg.upgrade || false}
              boxShadow="0px 0px 4px 0px #183B560D;
"
            />
          ))}
        </SubscriptionCards>
      </SubscriptionWrapper>
    </UserAccountLayout>
  );
};

export default ManageSubscription;
const SubscriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Title = styled.p`
  font-family: "Manrope";
  font-weight: 600;
  font-size: 40px;
  line-height: 120%;
  text-align: center;
  color: #1c1c1c;
`;
const SubscriptionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
`;
