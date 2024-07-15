import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';

import i18n from './i18n/config';
import { getAntdLocale } from './utils';
import dayjs from './utils/dayjs';
import moment from './utils/moment';

const locale = i18n.language;

moment.locale(locale);
dayjs.locale(locale);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={getAntdLocale(locale)}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();
