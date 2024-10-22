import { useAuth } from 'context/AuthContext';

export const usePermission = () => {
  const { userInfo } = useAuth();

  return (requiredPermission) => userInfo?.permissions?.includes(requiredPermission);
};
