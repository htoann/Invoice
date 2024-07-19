import { useTransition } from 'react';

export const useInvoiceDataTable = () => {
  const { t } = useTransition();

  return [
    {
      title: t('STT'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('Ký hiệu mẫu số'),
      dataIndex: 'khmshdon',
      key: 'khmshdon',
      sorter: (a, b) => a.khmshdon.props.children - b.khmshdon.props.children,
    },
    {
      title: t('Ký hiệu hóa đơn'),
      dataIndex: 'khhdon',
      key: 'khhdon',
      sorter: (a, b) => a.khhdon.props.children.localeCompare(b.khhdon.props.children),
    },
    {
      title: t('Số hóa đơn'),
      dataIndex: 'shdon',
      key: 'shdon',
      sorter: (a, b) => a.shdon.props.children - b.shdon.props.children,
      fixed: 'left',
    },
    {
      title: t('Ngày lập'),
      dataIndex: 'ntao',
      key: 'ntao',
      sorter: (a, b) => a.ntao.props.children.localeCompare(b.ntao.props.children),
    },
    {
      title: t('Ngày ký hóa đơn'),
      dataIndex: 'nky',
      key: 'nky',
      sorter: (a, b) => a.nky.props.children.localeCompare(b.nky.props.children),
    },
    {
      title: t('Nhóm hóa đơn'),
      dataIndex: 'nhomhd',
      key: 'nhomhd',
      sorter: (a, b) => a.nhomhd.props.children.localeCompare(b.nhomhd.props.children),
    },
    {
      title: t('NGUỒN HÓA ĐƠN/ CHI NHÁNH'),
      dataIndex: 'chinhanh',
      key: 'chinhanh',
      sorter: (a, b) => a.chinhanh.props.children.localeCompare(b.chinhanh.props.children),
    },
    {
      title: t('MST người mua/MST người nhận hàng'),
      dataIndex: 'nmmst',
      key: 'nmmst',
      sorter: (a, b) => a.nmmst.props.children.localeCompare(b.nmmst.props.children),
    },
    {
      title: t('Tên người mua/Tên người nhận hàng'),
      dataIndex: 'nmten',
      key: 'nmten',
      sorter: (a, b) => a.nmten.props.children.localeCompare(b.nmten.props.children),
    },
    {
      title: t('Tổng tiền chưa thuế'),
      dataIndex: 'tgtcthue',
      key: 'tgtcthue',
      sorter: (a, b) => a.tgtcthue.props.children - b.tgtcthue.props.children,
    },
    {
      title: t('Tổng tiền thuế'),
      dataIndex: 'tgtthue',
      key: 'tgtthue',
      sorter: (a, b) => a.tgtthue.props.children - b.tgtthue.props.children,
    },
    {
      title: t('Tổng tiền chiết khấu thương mại'),
      dataIndex: 'ttcktmai',
      key: 'ttcktmai',
      sorter: (a, b) => a.ttcktmai.props.children - b.ttcktmai.props.children,
    },
    {
      title: t('Tổng tiền phí'),
      dataIndex: 'thttlphi',
      key: 'thttlphi',
      sorter: (a, b) => a.thttlphi.props.children - b.thttlphi.props.children,
    },
    {
      title: t('Tổng tiền thanh toán'),
      dataIndex: 'tgtttbso',
      key: 'tgtttbso',
      sorter: (a, b) => a.tgtttbso.props.children - b.tgtttbso.props.children,
    },
    {
      title: t('Đơn vị tiền tệ'),
      dataIndex: 'dvtte',
      key: 'dvtte',
      sorter: (a, b) => a.dvtte.props.children.localeCompare(b.dvtte.props.children),
    },
    {
      title: t('Trạng thái hóa đơn'),
      dataIndex: 'tthai',
      key: 'tthai',
      sorter: (a, b) => a.tthai.props.children.localeCompare(b.tthai.props.children),
    },
    {
      title: t('Kết quả kiểm tra hóa đơn'),
      dataIndex: 'ttxly',
      key: 'ttxly',
      sorter: (a, b) => a.ttxly.props.children.localeCompare(b.ttxly.props.children),
    },
    {
      title: t('Link tải hóa đơn'),
      dataIndex: 'linkhd',
      key: 'linkhd',
      sorter: (a, b) => a.linkhd.props.children.localeCompare(b.linkhd.props.children),
    },
    {
      title: t('Mã tra cứu'),
      dataIndex: 'matracuu',
      key: 'matracuu',
      sorter: (a, b) => a.matracuu.props.children.localeCompare(b.matracuu.props.children),
    },
    {
      title: t('Số Hóa Đơn Gốc Bị Thay Thế/ Điều Chỉnh'),
      dataIndex: 'sohdgoc',
      key: 'sohdgoc',
      sorter: (a, b) => a.sohdgoc.props.children - b.sohdgoc.props.children,
    },
    {
      title: t('Kỳ Hóa Đơn Gốc Bị Thay Thế (Ngày/Tháng/Năm)'),
      dataIndex: 'sohdgocngay',
      key: 'sohdgocngay',
      sorter: (a, b) => a.sohdgocngay.props.children.localeCompare(b.sohdgocngay.props.children),
    },
    {
      title: t('LOẠI THAY ĐỔI'),
      dataIndex: 'loaitd',
      key: 'loaitd',
      sorter: (a, b) => a.loaitd.props.children.localeCompare(b.loaitd.props.children),
    },
    {
      title: t('NGÀY THAY ĐỔI'),
      dataIndex: 'ngaytd',
      key: 'ngaytd',
      sorter: (a, b) => a.ngaytd.props.children.localeCompare(b.ngaytd.props.children),
    },
    {
      title: t('MÃ SỐ THUẾ'),
      dataIndex: 'msttd',
      key: 'msttd',
      sorter: (a, b) => a.msttd.props.children.localeCompare(b.msttd.props.children),
    },
    {
      title: t('TÊN CÔNG TY'),
      dataIndex: 'tentd',
      key: 'tentd',
      sorter: (a, b) => a.tentd.props.children.localeCompare(b.tentd.props.children),
    },
    {
      title: t('ĐỊA CHỈ'),
      dataIndex: 'diachitd',
      key: 'diachitd',
      sorter: (a, b) => a.diachitd.props.children.localeCompare(b.diachitd.props.children),
    },
    {
      title: t('KẾT QUẢ ĐỐI CHIẾU THÔNG TIN'),
      dataIndex: 'ketquadoichieu',
      key: 'ketquadoichieu',
      sorter: (a, b) => a.ketquadoichieu.props.children.localeCompare(b.ketquadoichieu.props.children),
    },
    {
      title: t('TÌNH TRẠNG DN'),
      dataIndex: 'tinhtrangdn',
      key: 'tinhtrangdn',
      sorter: (a, b) => a.tinhtrangdn.props.children.localeCompare(b.tinhtrangdn.props.children),
    },
    {
      title: t('NGÀY CÔNG BỐ'),
      dataIndex: 'ngaycongbo',
      key: 'ngaycongbo',
      sorter: (a, b) => a.ngaycongbo.props.children.localeCompare(b.ngaycongbo.props.children),
    },
  ];
};
