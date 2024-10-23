import { Button } from '@/components/button';
import { UilEdit } from '@tooni/iconscout-unicons-react';

const EditButton = ({ onClick }) => (
  <Button
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      onClick && onClick();
    }}
    icon={<UilEdit />}
    size="small"
    style={{ marginLeft: '8px', color: '#a0a0a0' }}
  />
);

export default EditButton;
