import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/public/login";
import VerificationPage from "../pages/public/verification";
import ForgotPasswordPage from "../pages/public/forgotPassword";
import ResetPasswordPage from "../pages/public/resetPassword";
import CreateAccountPage from "../pages/public/enterPrise/createAccount";
import OrganizationInfoPage from "../pages/public/enterPrise/organizationInfo";
import OrganizationAdminInfoPage from "../pages/public/enterPrise/organizationAdminInfo";
import TwoFactorAuthenticationPage from "../pages/public/enterPrise/twoFactorAuthentication";
import BasicInfoPage from "../pages/public/enterPrise/basicInfo";
import DashBoardPage from "../pages/private/dashboard";
import SubscriptionPage from "../pages/public/subscription";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import OrganizationSetting from "../pages/public/organizationSetting";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<VerificationPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route
          path="/create-account"
          element={<CreateAccountPage />}
        />
        <Route
          path="/organization-info"
          element={<OrganizationInfoPage />}
        />
        <Route
          path="/organization-admin-info"
          element={<OrganizationAdminInfoPage />}
        />
        <Route
          path="/two-factor-authentication"
          element={<TwoFactorAuthenticationPage />}
        />
        <Route
          path="/basic-info"
          element={<BasicInfoPage />}
        />
        <Route
          path="/dashboard"
          element={<DashBoardPage />}
        />
        <Route
          path="/subscription"
          element={<SubscriptionPage />}
        />
        <Route
          path="/dashboard-layout"
          element={<DashboardLayout />}
        />
        <Route
          path="/organization-setting"
          element={<OrganizationSetting />}
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
