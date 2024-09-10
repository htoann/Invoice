import CustomHeader from '@/components/HeaderCommon';
import { PageHeader } from '@/components/page-headers';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_CUSTOMER, API_CUSTOMERS, dataService } from '@/service';
import { formatTime } from '@/utils/index';
import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { Popconfirm, notification } from 'antd';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateCustomer from './components/CreateCustomer';
import DataTable from './components/DataTable';
import EditCustomer from './components/EditCustomer';
import { columnDataCustomer } from './utils';

const Customers = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });
  const [searchParams, setSearchParams] = useState({});

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const { list, loading, getList, setList } = useList(state, setState, API_CUSTOMERS, 'khách hàng');

  useEffect(() => {
    getList(searchParams);
  }, [current, pageSize, searchParams]);

  const handleDelete = async (id) => {
    try {
      await dataService.delete(API_CUSTOMER(id));
      setList(list.filter((account) => account.id !== id));

      notification.success({
        message: t('Common_Success'),
        description: t('Common_DeleteSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Failure'),
        description: t('Common_DeleteFailure'),
      });
    }
  };

  const tableDataSource =
    list?.map((item, index) => {
      const stt = (current - 1) * pageSize + index + 1;

      const formattedFields = Object.fromEntries(
        Object.entries(item).map(([key, value]) => {
          let formattedValue;

          switch (key) {
            case 'status':
              formattedValue = value === 1 ? t('Common_Using') : t('Common_NotUsing');
              break;

            case 'created_at':
            case 'updated_at':
              formattedValue = formatTime(value, 'DD/MM/YYYY');
              break;

            default:
              formattedValue = value;
              break;
          }

          return [key, <span key={key}>{formattedValue}</span>];
        }),
      );

      return {
        key: item.id,
        stt,
        ...formattedFields,
        action: (
          <div className="table-actions">
            <Link className="edit" to="#" onClick={() => showEditModal(item)}>
              <UilEdit />
            </Link>
            <Popconfirm
              title={t('Common_AreYouSureDelete')}
              onConfirm={() => handleDelete(item.id)}
              okText={t('Common_Yes')}
              cancelText={t('Common_No')}
            >
              <Link className="invoice-delete" to="#">
                <UilTrash />
              </Link>
            </Popconfirm>
          </div>
        ),
      };
    }) || [];

  const dataTableColumn = columnDataCustomer.map((col) => ({
    title:
      col.key === 'stt' || col.key === 'action' ? (
        t(col.title)
      ) : (
        <CustomHeader
          title={col.title}
          name={col.dataIndex}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setState={setState}
        />
      ),
    dataIndex: col.dataIndex,
    key: col.key,
    sorter:
      col.key !== 'stt' && col.key !== 'action'
        ? (a, b) => a[col.dataIndex].props.children.localeCompare(b[col.dataIndex].props.children)
        : false,
    fixed: col?.fixed,
    className: col.key === 'stt' || col.key === 'action' ? '' : 'searchInput',
    width: col?.width,
  }));

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_ListCustomers')} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: 'headless' }}>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          rowSelection={rowSelection}
          state={state}
          setState={setState}
          loading={loading}
        />
      </LayoutContent>

      {state.visible && <CreateCustomer state={state} setState={setState} list={list} setList={setList} />}

      {state.editVisible && <EditCustomer state={state} setState={setState} list={list} setList={setList} />}
    </>
  );
};

export default Customers;
