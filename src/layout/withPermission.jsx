import { usePermission } from 'hooks/checkUserPermission';

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
