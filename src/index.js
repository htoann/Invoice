import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import i18n from './i18n/config';

import { GoogleOAuthProvider } from '@react-oauth/google';
import dayjs from './utils/dayjs';
import moment from './utils/moment';

const locale = i18n.language;

moment.locale(locale);
dayjs.locale(locale);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
