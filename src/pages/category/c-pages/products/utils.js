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

export const columnDataProduct = [
  { title: 'Common_STT', dataIndex: 'stt', key: 'stt' },
  { title: 'Product_Code', dataIndex: 'mahang', key: 'mahang' },
  { title: 'Product_SellingName', dataIndex: 'tenHangBan', key: 'tenHangBan' },
  { title: 'Product_PurchasingName', dataIndex: 'tenHangMua', key: 'tenHangMua' },
  { title: 'Product_Unit', dataIndex: 'donViTinh', key: 'donViTinh' },
  { title: 'Product_AccountGoods', dataIndex: 'taiKhoanHang', key: 'taiKhoanHang' },
  { title: 'Product_AccountCost', dataIndex: 'taiKhoanGiaVon', key: 'taiKhoanGiaVon' },
  { title: 'Product_AccountRevenue', dataIndex: 'taiKhoanDoanhThu', key: 'taiKhoanDoanhThu' },
  { title: 'Common_Action', dataIndex: 'action', key: 'action', fixed: 'right' },
];
