import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import config from '../../config/config';
import { H1 } from './style';

const { theme } = config;

function Header({ name }) {
  return (
    <ThemeProvider theme={theme}>
      <H1>{name}</H1>
    </ThemeProvider>
  );
}

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
