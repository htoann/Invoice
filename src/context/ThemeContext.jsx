import { initialThemeConfig } from '@/config/config';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState({
    rtlData: Cookies.get('rtl') || false,
    topMenu: Cookies.get('topMenu') || true,
    mode: Cookies.get('layoutMode') || 'lightMode',
  });

  const changeLayoutMode = useCallback((value) => {
    Cookies.set('layoutMode', value);
    setThemeState((prevState) => ({
      ...prevState,
      layoutMode: value,
    }));
  }, []);

  const changeDirectionMode = useCallback((value) => {
    Cookies.set('rtl', value);
    setThemeState((prevState) => ({
      ...prevState,
      rtl: value,
    }));
  }, []);

  const changeMenuMode = useCallback((value) => {
    Cookies.set('topMenu', value);
    setThemeState((prevState) => ({
      ...prevState,
      topMenu: value,
    }));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        layoutMode: themeState.layoutMode,
        rtl: themeState.rtl,
        topMenu: themeState.topMenu,
        changeLayoutMode,
        changeDirectionMode,
        changeMenuMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
