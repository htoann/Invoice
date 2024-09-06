import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { Popconfirm } from 'antd';
import { useAppState } from 'context/AppContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const useTableDataSource = ({ accounts, current, pageSize, showEditModal, handleDelete }) => {
  const { t } = useTranslation();
  const { departments } = useAppState();

  const tableDataSource =
    accounts?.length > 0
      ? accounts.map((item, index) => ({
          key: item?.id,
          stt: (current - 1) * pageSize + index + 1,
          id: item?.id,
          name: <span>{item?.name}</span>,
          email: <span>{item?.email}</span>,
          department: <span>{departments?.find((dept) => dept?.id === item?.department)?.name}</span>,
          action: (
            <div className="table-actions">
              <Link className="edit" to="#" onClick={() => showEditModal(item)}>
                <UilEdit />
              </Link>
              <Popconfirm
                title={t('Common_AreYouSureDelete')}
                onConfirm={() => handleDelete(item?.id)}
                okText={t('Common_Yes')}
                cancelText={t('Common_No')}
              >
                <Link className="invoice-delete" to="#">
                  <UilTrash />
                </Link>
              </Popconfirm>
            </div>
          ),
        }))
      : [];

  return tableDataSource;
};
