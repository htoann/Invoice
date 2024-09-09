import { API_PROVIDER, dataService } from '@/service';
import { formatTime } from '@/utils/index';
import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { notification, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const useDataTableSource = (list, current, pageSize, setState, setList) => {
  const { t } = useTranslation();

  const showEditModal = (data) => {
    setState((prevState) => ({
      ...prevState,
      editVisible: true,
      update: data,
    }));
  };

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

  return tableDataSource;
};

export default useDataTableSource;
