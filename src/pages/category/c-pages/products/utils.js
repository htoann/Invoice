import { API_INVOICES_EXCEL, dataService } from '@/service';
import { downloadFile, formatTime } from '@/utils/index';
import { notification } from 'antd';

export const handleExport = async (date) => {
  try {
    const response = await dataService.get(API_INVOICES_EXCEL, {
      responseType: 'blob',
    });

    downloadFile(response, `HangHoa${formatTime(date)}.xlsx`);
  } catch (error) {
    console.error(error);
    notification.error({
      message: 'Lỗi',
      description: 'Không thể xuất excel hóa đơn. Vui lòng thử lại sau.',
    });
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

export const fieldsModalProduct = [
  {
    name: 'mahang',
    label: 'Product_Code',
    type: 'input',
    required: true,
  },
  { name: 'donViTinh', label: 'Product_Unit', type: 'select', options: [] },
  { name: 'taiKhoanHang', label: 'Product_AccountGoods', type: 'input', suffix: ' (15_)' },
  { name: 'taiKhoanGiaVon', label: 'Product_AccountCost', type: 'input', suffix: ' (63_)' },
  { name: 'taiKhoanDoanhThu', label: 'Product_AccountRevenue', type: 'input', suffix: ' (51_)' },
  { name: 'tenHangBan', label: 'Product_SellingName', type: 'autocomplete' },
  { name: 'tenHangMua', label: 'Product_PurchasingName', type: 'input' },
];
