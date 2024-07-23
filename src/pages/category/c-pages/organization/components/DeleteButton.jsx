import { Button } from '@/components/buttons/buttons';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

const DeleteButton = ({ onConfirm, loading }) => {
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div onClick={handleClick} style={{ height: 45 }}>
      <Popconfirm
        title={t('Common_DeleteConfirm')}
        onConfirm={onConfirm}
        okText={t('Common_Yes')}
        cancelText={t('Common_No')}
        loading={loading}
      >
        <Button
          icon={<UilTrash />}
          size="small"
          style={{ marginLeft: '8px', color: '#a0a0a0' }}
          onClick={handleClick}
        />
      </Popconfirm>
    </div>
  );
};

export default DeleteButton;
