import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [themeState, setThemeState] = useState({
    rtlData: Cookies.get('rtl') || false,
    topMenu: Cookies.get('topMenu') !== undefined ? Cookies.get('topMenu') === 'true' : true,
    layoutMode: Cookies.get('layoutMode') || 'lightMode',
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
    <AppContext.Provider
      value={{
        layoutMode: themeState.layoutMode,
        rtl: themeState.rtlData,
        topMenu: themeState.topMenu,
        changeLayoutMode,
        changeDirectionMode,
        changeMenuMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
