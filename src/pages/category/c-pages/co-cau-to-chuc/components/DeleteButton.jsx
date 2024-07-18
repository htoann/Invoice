import { Button } from '@/components/buttons/buttons';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Popconfirm } from 'antd';

const DeleteButton = ({ onConfirm, loading }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div onClick={handleClick}>
      <Popconfirm
        title="Bạn có muốn xoá mục này không"
        onConfirm={onConfirm}
        okText="Có"
        cancelText="Không"
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
