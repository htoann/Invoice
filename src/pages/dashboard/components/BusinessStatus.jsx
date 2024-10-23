import { Cards } from '@/components/card';
import { BorderLessHeading, TableDefaultStyle } from '@/container/styled';
import axios from '@/mock/index';
import { API_BUSINESS_STATUS } from '@/service';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BusinessStatus = React.memo(() => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);

  const tableColumns = [
    {
      title: 'Tình trạng',
      dataIndex: 'tinhTrang',
      key: 'tinhTrang',
    },
    {
      title: 'Tổng số mã số thuế',
      dataIndex: 'tongSoMaSoThue',
      key: 'tongSoMaSoThue',
    },
    {
      title: 'Tổng tiền mua vào',
      dataIndex: 'tongTienMuaVao',
      key: 'tongTienMuaVao',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'ngayCapNhat',
      key: 'ngayCapNhat',
    },
  ];

  const getList = async () => {
    try {
      const response = await axios.get(API_BUSINESS_STATUS);
      setList(response?.data?.businessStatus || []);
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
      const { tinhTrang, tongSoMaSoThue, tongTienMuaVao, ngayCapNhat } = value;
      return {
        key: index,
        tinhTrang,
        tongSoMaSoThue,
        tongTienMuaVao,
        ngayCapNhat,
      };
    });

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards title={t('Dashboard_BusinessStatus')} size="large">
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

export default BusinessStatus;
