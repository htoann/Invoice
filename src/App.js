import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import { useAppState } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { lazy, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.scss';
import Auth from './routes/auth';
import Index from './routes/index';
import ProtectedRoute from './routes/protectedRoute';
import { customLocale } from './utils';
import { themeColor } from './utils/theme/themeVariables';

const NotFound = lazy(() => import('./container/pages/404'));

export const App = () => {
  const { isLoggedIn } = useAuth();

  const { rtl, topMenu, layoutMode: mainContent } = useAppState();

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    return () => {
      unmounted = true;
    };
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'} locale={customLocale}>
      <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? (
            <Routes>
              <Route path="/*" element={<Auth />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/*" element={<ProtectedRoute path="/*" Component={Index} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
          {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Routes>
              <Route path="/" element={<Navigate to="" />} />
            </Routes>
          )}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};
