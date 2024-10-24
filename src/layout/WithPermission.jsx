import { usePermission } from 'hooks/usePermission';

export const withPermission = (Component) => {
  return (props) => {
    const { permissions } = props;

    const checkPermission = usePermission();

    if (!checkPermission(permissions)) {
      return null;
    }
    return <Component {...props} />;
  };
};

export const WithPermission = ({ children, permissions }) => {
  const checkPermission = usePermission();

  if (!!permissions?.length && !checkPermission(permissions)) {
    return null;
  }

  return <>{children}</>;
};
