import { downloadFile, formatTime } from '@/utils/index';
import { DataService } from '@/config/dataService';

export const handleExport = async (date) => {
  try {
    const response = await DataService.get('invoices_excel/', {
      responseType: 'blob',
    });

    downloadFile(response, `HangHoa${formatTime(date)}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};
