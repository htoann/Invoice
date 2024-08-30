import { Cards } from '@/components/cards/frame/cards-frame';
import CustomHeader from '@/components/HeaderCommon';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BorderLessHeading, Main } from '@/container/styled';
import { API_PROVIDER } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { formatTime } from '@/utils/index';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Col, Popconfirm, Row, Skeleton, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateProvider from './components/CreateProvider';
import DataTable from './components/DataTable';
import EditProvider from './components/EditProvider';
import useGetProviders from './hooks/useGetProviders';
import { columnDataProvider } from './utils';

const Providers = () => {
  const { t } = useTranslation();

  const updatePagination = (response) => {
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: Number(response?.data?.count) || 0,
      },
    }));
  };

  const { list, searchLoading, isLoadingGetList, getList, setList } = useGetProviders(updatePagination);

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    getList({ ...searchParams, page: current, page_size: pageSize });
  }, [current, pageSize]);

  const handleDelete = async (id) => {
    try {
      await dataService.delete(API_PROVIDER(id));
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
            case 'is_individual':
              formattedValue = value ? t('Common_Individual') : t('Common_Org');
              break;

            case 'branch':
            case 'province':
            case 'district':
            case 'commune':
              formattedValue = value?.name;
              break;

            case 'is_customer':
              formattedValue = value ? '✓' : '';
              break;

            case 'status':
              formattedValue = value === 1 ? t('Common_Using') : t('Common_NotUsing');
              break;

            case 'id_issue_day':
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

  const dataTableColumn = columnDataProvider.map((col) => ({
    title:
      col.key === 'stt' || col.key === 'action' ? (
        t(col.title)
      ) : (
        <CustomHeader
          title={col.title}
          name={col.dataIndex}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          getList={getList}
          state={state}
          setState={setState}
          pagination={pagination}
          pageSize={pageSize}
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
      <PageHeader className="invoice-page-header-main" title={t('Common_ListProviders')} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards headless>
                {isLoadingGetList ? (
                  <Skeleton active style={{ marginTop: 30 }} />
                ) : (
                  <DataTable
                    tableData={tableDataSource}
                    columns={dataTableColumn}
                    rowSelection={rowSelection}
                    state={state}
                    setState={setState}
                    loading={searchLoading}
                  />
                )}
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>

      {state.visible && <CreateProvider state={state} setState={setState} list={list} setList={setList} />}

      {state.editVisible && <EditProvider state={state} setState={setState} list={list} setList={setList} />}
    </>
  );
};

export default Providers;
