import React from "react";
import CommonPackageCard from "../../../../components/CommonPackageCard";
import AuthLayout from "../../../../components/AuthLayout";
import styled from "styled-components";
import { useAppSelector } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";

const enterprisePackages = [
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
  },
  {
    title: "Silver",
    price: 18.99,
    period: "/month",
    features: [
      "Assistance with writing, problem solving and more",
      "Access to -40 mini",
      "Limited access to -40",
      "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
      "Use custom",
    ],
    recommended: true,
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
  },
  {
    title: "Platinum",
    price: 35.99,
    period: "/month",
    features: [
      "Assistance with writing, problem solving and more",
      "Access to -40 mini",
      "Limited access to -40",
      "Limited access to data analysis, file uploads, vision, web browsing, and image generation",
      "Use custom",
    ],
    recommended: false,
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
    recommended: true,
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
  },
];

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
   const UserType = useAppSelector((state) => state.auth.user?.type);

  const handleSelect = (title: string) => {
    alert(`Selected package: ${title}`);
    navigate("/login")
    localStorage.removeItem('registration_account_type');
  };

  return (
    <AuthLayout
      dashboardUrl="/dashboard"
      otherText="Choose a plan that suits you and begin your Medical <br/> AI journey today."
      formMaxWidth="100%"
    >
      <SubscriptionCards>
        {(UserType === "individual" ? individualPackages : enterprisePackages)?.map(
          (pkg) => (
            <CommonPackageCard
              key={pkg.title}
              title={pkg.title}
              price={pkg.price}
              period={pkg.period}
              features={pkg.features}
              recommended={pkg.recommended}
              onSelect={() => handleSelect(pkg.title)}
            />
          )
        )}
      </SubscriptionCards>
    </AuthLayout>
  );
};

export default SubscriptionPage;
const SubscriptionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 84px;
  @media (max-width: 768px) {
    margin-top: 40px;
  }
  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;
