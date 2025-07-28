import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateRegisterData } from '../store/slices/registeruserSlice';

export const useRegistrationGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const registerUserDetail = useAppSelector((state) => state.registeruser);

  useEffect(() => {
    if (!registerUserDetail?.account_type) {
      const storedAccountType = localStorage.getItem('registration_account_type');
      if (storedAccountType && ['individual', 'organization_admin'].includes(storedAccountType)) {
        dispatch(updateRegisterData({ account_type: storedAccountType }));
        return;
      }
      navigate('/create-account', { replace: true });
      return;
    }

    // Check if the account type is valid
    if (!['individual', 'organization_admin'].includes(registerUserDetail.account_type)) {
      navigate('/create-account', { replace: true });
      return;
    }

    // For enterprise flow, check if organization data exists
    if (registerUserDetail.account_type === 'organization_admin') {
      const isOnAdminInfo = location.pathname === '/organization-admin-info';
      
      if (isOnAdminInfo && !registerUserDetail.organization_name) {
        navigate('/organization-info', { replace: true });
        return;
      }
    }
  }, [registerUserDetail?.account_type, registerUserDetail?.organization_name, location.pathname, navigate, dispatch]);

  return registerUserDetail;
}; 