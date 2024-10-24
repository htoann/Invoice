import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import { useAppState } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.scss';
import Auth from './routes/auth';
import Index from './routes/index';
import ProtectedRoute from './routes/protectedRoute';
import { customLocale } from './utils';
import { themeColor } from './utils/theme/themeVariables';

const NotFound = lazy(() => import('./container/pages/NotFound'));

export const App = () => {
  const { isLoggedIn } = useAuth();

  const { rtl, topMenu, layoutMode: mainContent } = useAppState();

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'} locale={customLocale}>
      <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
        <Router>
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
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};
