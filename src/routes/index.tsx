import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import AutoLoginWrapper from "../components/AutoLoginWrapper";

// Public pages
import LoginPage from "../pages/public/auth/login";

import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import OrganizationSetting from "../pages/private/organizationSetting";
import ManageSubscription from "../pages/private/manageSubscription";
import ForgotPasswordPage from "../pages/public/auth/login/forgotPassword";
import VerificationPage from "../pages/public/auth/login/verification";
import ResetPasswordPage from "../pages/public/auth/login/resetPassword";
import CreateAccountPage from "../pages/public/auth/signup";
import OrganizationInfoPage from "../pages/public/auth/signup/enterPrise/organizationInfo";
import OrganizationAdminInfoPage from "../pages/public/auth/signup/enterPrise/organizationAdminInfo";
import TwoFactorAuthenticationPage from "../pages/public/auth/signup/twoFactorAuthentication";
import BasicInfoPage from "../pages/public/auth/signup/individual/basicInfo";
import SubscriptionPage from "../pages/public/auth/signup/subscription";
import TwoFactorVerificationPage from "../pages/public/auth/signup/verification";

// Guard for OTP Verification
const OtpVerificationGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Guard for Reset Password
const ResetPasswordGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user || !user.resetToken) {
    return <Navigate to="/forgot" replace />;
  }
  return <>{children}</>;
};

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
      <AutoLoginWrapper>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route
              path="/otp"
              element={
                <OtpVerificationGuard>
                  <VerificationPage />
                </OtpVerificationGuard>
              }
            />
            <Route
              path="/otp-verification"
              element={
                <OtpVerificationGuard>
                  <VerificationPage />
                </OtpVerificationGuard>
              }
            />
            <Route
              path="/reset"
              element={
                <ResetPasswordGuard>
                  <ResetPasswordPage />
                </ResetPasswordGuard>
              }
            />
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
            <Route
              path="/two-factor-verification"
              element={<TwoFactorVerificationPage />}
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
      </AutoLoginWrapper>
    </BrowserRouter>
  );
};

export default Routing;
