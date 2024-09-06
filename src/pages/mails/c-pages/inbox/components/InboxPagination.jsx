import { Pagination } from 'antd';
import { useAppState } from 'context/AppContext';

export const InboxPagination = ({ loadingMailAccounts, inboxList, pagination, setPagination }) => {
  const { loadingDepartments } = useAppState();

  const { pageSize, current, total } = pagination;

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }));
  };

  const handleSizeChange = (_, size) => setPagination((prev) => ({ ...prev, pageSize: size }));

  return (
    <>
      {!loadingMailAccounts && !loadingDepartments && inboxList?.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Pagination
            current={current}
            pageSize={pageSize}
            onChange={handlePageChange}
            total={total}
            showSizeChanger
            onShowSizeChange={handleSizeChange}
            showLessItems
          />
        </div>
      )}
    </>
  );
};
