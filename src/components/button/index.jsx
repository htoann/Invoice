import { withPermission } from '@/layout/WithPermission';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ButtonStyled, ButtonStyledGroup } from './styled';

function Button(props) {
  const {
    type = 'default',
    shape,
    icon,
    size,
    outlined,
    ghost,
    transparent,
    raised,
    squared,
    color,
    social,
    load,
    children,
    ...rest
  } = props;
  const [state, setState] = useState({
    loading: false,
  });

  const enterLoading = () => {
    setState({ loading: true });
  };

  return (
    <ButtonStyled
      squared={squared}
      outlined={outlined ? 1 : 0}
      ghost={ghost}
      transparent={transparent ? 1 : 0}
      raised={raised ? 1 : 0}
      data={type}
      size={size}
      shape={shape}
      type={type}
      icon={icon}
      color={color}
      social={social}
      onClick={load && enterLoading}
      loading={state.loading}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'dark',
    'light',
    'gray',
    'white',
    'dashed',
    'error',
    'extra-light',
    'default',
  ]),
  shape: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  outlined: PropTypes.bool,
  transparent: PropTypes.bool,
  raised: PropTypes.bool,
  squared: PropTypes.bool,
  social: PropTypes.bool,
  load: PropTypes.bool,
  ghost: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

function BtnGroup({ children }) {
  return <ButtonStyledGroup>{children}</ButtonStyledGroup>;
}

BtnGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const ButtonPermission = withPermission(Button);

export { BtnGroup, Button, ButtonPermission };
