import { downloadFile, formatTime } from '@/utils/index';
import axios from 'axios';

export const downloadAttachment = async (attachment) => {
  try {
    const response = await axios.get(attachment.filePath, {
      responseType: 'blob',
    });

    downloadFile(response, `${attachment.fileName}${formatTime()}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};
