import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n/config';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={viVN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();
