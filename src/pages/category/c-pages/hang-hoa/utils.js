import { DataService } from '../../../../config/dataService/dataService';
import { downloadFile, formatTime } from '../../../../utility/utility';

export const handleExport = async (date) => {
  try {
    const response = await DataService.get('invoices_excel/', {
      responseType: 'blob',
    });

    downloadFile(response, `HangHoa${formatTime(date)}.xlsx`);
  } catch (error) {
    console.log(error);
  }
};
