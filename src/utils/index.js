import dayjs from 'dayjs';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';

/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const idGenerator = (events, length = 1) => {
  const arrayData = [];
  events.map((data) => {
    return arrayData.push(parseInt(data.id, 10));
  });
  const number = (Math.max(...arrayData) + 1).toString();
  return number.length < length ? `${'0'.repeat(length - number.length)}${number}` : number;
};

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

const downloadFile = (response, fileName = getFileName(response)) => {
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

const formatTime = (date, format = 'DD-MM-YYYY-HHmmss') => {
  if (!date) return dayjs(new Date()).format(format);

  return dayjs(date).format(format);
};

const getAntdLocale = (language) => {
  switch (language) {
    case 'vi':
      return viVN;
    case 'en':
      return enUS;
    default:
      return viVN;
  }
};

export { ellipsis, idGenerator, downloadFile, formatTime, getAntdLocale };
