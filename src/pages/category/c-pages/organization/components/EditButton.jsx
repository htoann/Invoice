import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import { Button } from '../../../../../components/buttons/buttons';

const EditButton = ({ onClick }) => (
  <Button
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      onClick && onClick();
    }}
    icon={<UilEdit />}
    size="small"
    style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
  />
);

export default EditButton;
