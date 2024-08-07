import { downloadFile } from '@/utils/index';
import axios from 'axios';

export const downloadAttachment = async (attachment) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/mails/attachments/${attachment.id}`, {
      responseType: 'blob',
    });

    downloadFile(response, attachment.file_name);
  } catch (error) {
    console.error(error);
  }
};
