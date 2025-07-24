import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useAppSelector } from "../store/hooks";

// Public pages
import LoginPage from "../pages/public/auth/login";
import VerificationPage from "../pages/public/auth/verification";
import ForgotPasswordPage from "../pages/public/auth/forgotPassword";
import ResetPasswordPage from "../pages/public/auth/resetPassword";
import CreateAccountPage from "../pages/public/auth/createAccount";
import OrganizationInfoPage from "../pages/public/enterPrise/organizationInfo";
import OrganizationAdminInfoPage from "../pages/public/enterPrise/organizationAdminInfo";
import TwoFactorAuthenticationPage from "../pages/public/auth/twoFactorAuthentication";
import BasicInfoPage from "../pages/public/individual/basicInfo";
import SubscriptionPage from "../pages/public/auth/subscription";

import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import OrganizationSetting from "../pages/private/organizationSetting";
import ManageSubscription from "../pages/private/manageSubscription";

const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

const PublicRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Navigate to="/chat" replace /> : <Outlet />;
};

const Routing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<VerificationPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/organization-info" element={<OrganizationInfoPage />} />
          <Route
            path="/organization-admin-info"
            element={<OrganizationAdminInfoPage />}
          />
          <Route
            path="/two-factor-authentication"
            element={<TwoFactorAuthenticationPage />}
          />
          <Route path="/basic-info" element={<BasicInfoPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/chat" element={<DashboardLayout />} />
            <Route path="/chat/c/:id" element={<DashboardLayout />} />
            <Route
              path="/organization-setting"
              element={<OrganizationSetting />}
            />
            <Route
              path="/manage-subscription"
              element={<ManageSubscription />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
