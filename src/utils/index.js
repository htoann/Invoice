import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import dayjs from './dayjs';
import i18next from 'i18next';

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const HDDT_CAPTCHA_ENDPOINT = process.env.REACT_APP_HDDT_CAPTCHA;

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
