import Cookies from 'js-cookie';
import { themeColor } from './theme/themeVariables';

const initialThemeConfig = {
  topMenu: Cookies.get('topMenu') || true,
  rtl: Cookies.get('rtl') || false,
  layoutMode: Cookies.get('layoutMode') || 'lightMode',
  themeColor,
};

export default initialThemeConfig;
