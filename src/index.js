import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';

import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/es';
import i18n from './i18n/config';
import { getAntdLocale } from './utility/utility';

const currentLanguage = i18n.language;

moment.locale(currentLanguage);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={getAntdLocale(currentLanguage)}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();
