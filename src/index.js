import React from 'react';
import { createRoot } from 'react-dom/client';

import i18n from './i18n/config';

import { App } from 'App';
import { AuthProvider } from 'context/AuthContext';
import { AppProvider } from 'context/AppContext';
import dayjs from './utils/dayjs';

const locale = i18n.language;

dayjs.locale(locale);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
);
