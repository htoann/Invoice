import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const MenuItem = ({ item, onEdit, onDelete }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    {item.name}
    <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
      <EditButton onClick={onEdit} />
      <DeleteButton onConfirm={onDelete} />
    </div>
  </div>
);
export default MenuItem;