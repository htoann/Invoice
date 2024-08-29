import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import i18next from 'i18next';
import { removeCookie } from './cookie';
import dayjs from './dayjs';
import { removeLocalStorage } from './localStorage';

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const HDDT_CAPTCHA_ENDPOINT = process.env.REACT_APP_HDDT_CAPTCHA;
export const REACT_MODE = process.env.REACT_APP_MODE;
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const LOGGED_IN = 'loggedIn';
export const ORG_ID = 'orgId';

const getFileName = (response) => {
  try {
    const contentDisposition = response?.headers?.get('Content-Disposition');

    if (contentDisposition) {
      const enCodedUTFFilesName = contentDisposition.split('filename*=')[1];
      if (enCodedUTFFilesName) {
        const deCodedFilesName = decodeURI(
          enCodedUTFFilesName
            .split(';')[0]
            .trim()
            .replace("UTF-8''", '')
            .replace(/^"(.*)"$/, '$1'),
        );
        return deCodedFilesName;
      }

      return contentDisposition
        .split('filename=')[1]
        .split(';')[0]
        .trim()
        .replace(/^"(.*)"$/, '$1');
    }
  } catch (error) {
    console.error(error);
  }
};

export const downloadFile = (response, fileName = getFileName(response)) => {
  if (!fileName) return;
  if (response?.data) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
};

export const formatTime = (date, format = 'DD-MM-YYYY-HHmmss') => {
  if (!date) return dayjs(new Date()).format(format);

  return dayjs(date).format(format);
};

export const getAntdLocale = (language) => {
  switch (language) {
    case 'vi':
      return viVN;
    case 'en':
      return enUS;
    default:
      return viVN;
  }
};

export const formatDataSize = (byteSize) => {
  if (!byteSize) return '0 ' + i18next.t('Common_DataSize_Bytes');

  const units = [
    i18next.t('Common_DataSize_Bytes'),
    i18next.t('Common_DataSize_KB'),
    i18next.t('Common_DataSize_MB'),
    i18next.t('Common_DataSize_GB'),
    i18next.t('Common_DataSize_TB'),
  ];

  const index = Math.floor(Math.log(byteSize) / Math.log(1024));
  const size = (byteSize / Math.pow(1024, index)).toFixed(2);

  return `${size} ${units[index]}`;
};

export const clearLogoutLocalStorageAndCookie = () => {
  removeCookie(ACCESS_TOKEN);
  removeCookie(REFRESH_TOKEN);
  removeLocalStorage(LOGGED_IN);
  removeLocalStorage(ORG_ID);
};

export const watchObject = (object = {}, methods = [], callbackBefore = () => {}, callbackAfter = () => {}) => {
  methods.forEach((method) => {
    const original = object[method].bind(object);
    const newMethod = (...args) => {
      callbackBefore(method, ...args);
      const result = method === 'getItem' ? original(...args) : original(...args);
      if (method === 'getItem') {
        callbackAfter(method, ...args, result);
        return result;
      } else {
        callbackAfter(method, ...args);
        return result;
      }
    };
    object[method] = newMethod.bind(object);
  });
};

export const formatCurrency = (amount) => {
  if (!amount) {
    amount = 0;
  }
  return amount.toLocaleString('en-US');
};

export const defaultPaginationConfig = {
  showSizeChanger: true,
  showPrevNextJumpers: true,
  pageSize: 20,
  // showQuickJumper: true,
  // showTotal: (total) => `Tổng số ${total}`,
};
