import { downloadFile, formatTime } from '@/utils/index';
import { dataService } from '@/utils/dataService';

export const handleExport = async (date) => {
  try {
    const response = await dataService.get('invoices_excel/', {
      responseType: 'blob',
    });

    downloadFile(response, `HangHoa${formatTime(date)}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};
