import { API_INVOICES_EXCEL } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { downloadFile, formatTime } from '@/utils/index';

export const handleExport = async (date) => {
  try {
    const response = await dataService.get(API_INVOICES_EXCEL, {
      responseType: 'blob',
    });

    downloadFile(response, `HangHoa${formatTime(date)}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};
