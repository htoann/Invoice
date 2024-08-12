import { Cards } from '@/components/cards/frame/cards-frame';
import { BorderLessHeading, TableDefaultStyle } from '@/container/styled';
import axios from '@/mock/index';
import { apiConst } from '@/utils/apiConst';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const InvoicesChange = React.memo(() => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);

  const tableColumns = [
    {
      title: 'Trạng Thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Ký Hiệu',
      dataIndex: 'kyHieu',
      key: 'kyHieu',
    },
    {
      title: 'Số Hóa Đơn',
      dataIndex: 'soHoaDon',
      key: 'soHoaDon',
    },
    {
      title: 'Ngày Lập',
      dataIndex: 'ngayLap',
      key: 'ngayLap',
    },
    {
      title: 'Thông Tin Người Bán',
      dataIndex: 'thongTinNguoiBan',
      key: 'thongTinNguoiBan',
    },
  ];

  const getList = async () => {
    try {
      const response = await axios.get(`${apiConst.invoicesChange}`);
      setList(response?.data?.invoicesChange || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const listData =
    list?.length > 0 &&
    list.map((value, index) => {
      const { trangThai, kyHieu, soHoaDon, ngayLap, thongTinNguoiBan } = value;
      return {
        key: index,
        trangThai,
        kyHieu,
        soHoaDon,
        ngayLap,
        thongTinNguoiBan,
      };
    });

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards title={t('Dashboard_InvoicesChange')} size="large">
          <TableDefaultStyle className="invoice-having-header-bg">
            <div className="table-responsive">
              <Table columns={tableColumns} dataSource={listData} pagination={false} />
            </div>
          </TableDefaultStyle>
        </Cards>
      </BorderLessHeading>
    </div>
  );
});

export default InvoicesChange;
