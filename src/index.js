import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import i18n from './i18n/config';

import { AuthProvider } from 'context/AuthContext';
import dayjs from './utils/dayjs';
import moment from './utils/moment';

const locale = i18n.language;

moment.locale(locale);
dayjs.locale(locale);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
