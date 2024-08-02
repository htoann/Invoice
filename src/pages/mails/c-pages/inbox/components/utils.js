import { DataService } from '@/utils/dataService';
import { downloadFile, formatTime } from '@/utils/index';

export const downloadAttachment = async (fileName) => {
  try {
    const response = await DataService.get('mails/attachments', {
      responseType: 'blob',
    });

    downloadFile(response, `${fileName}${formatTime()}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};
