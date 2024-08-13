import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useColumnProducts = () => {
  const { t } = useTranslation();

  const columnData = useMemo(
    () => [
      { title: 'Common_STT', dataIndex: 'stt', key: 'stt' },
      { title: 'Product_Code', dataIndex: 'mahang', key: 'mahang' },
      { title: 'Product_SellingName', dataIndex: 'tenHangBan', key: 'tenHangBan' },
      { title: 'Product_PurchasingName', dataIndex: 'tenHangMua', key: 'tenHangMua' },
      { title: 'Product_Unit', dataIndex: 'donViTinh', key: 'donViTinh' },
      { title: 'Product_AccountGoods', dataIndex: 'taiKhoanHang', key: 'taiKhoanHang' },
      { title: 'Product_AccountCost', dataIndex: 'taiKhoanGiaVon', key: 'taiKhoanGiaVon' },
      { title: 'Product_AccountRevenue', dataIndex: 'taiKhoanDoanhThu', key: 'taiKhoanDoanhThu' },
      { title: 'Common_Action', dataIndex: 'action', key: 'action', fixed: 'right' },
    ],
    [t],
  );

  return columnData;
};

export default useColumnProducts;
