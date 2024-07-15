import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Popconfirm } from 'antd';
import React from 'react';
import { Button } from '../../../../../components/buttons/buttons';

const DeleteButton = ({ onConfirm, loading }) => {
  return (
    <Popconfirm
      title="Bạn có muốn xoá mục này không"
      onConfirm={onConfirm}
      okText="Có"
      cancelText="Không"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      loading={loading}
    >
      <Button icon={<UilTrash />} size="small" style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }} />
    </Popconfirm>
  );
};

export default DeleteButton;
