import React from 'react';
import { Button } from '../../../../../components/buttons/buttons';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';

const EditButton = ({ onClick }) => (
  <Button
    icon={<UilEdit />}
    size="small"
    style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
    onClick={onClick}
  />
);

export default EditButton;
