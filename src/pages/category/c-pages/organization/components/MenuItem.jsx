import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const MenuItem = ({ item, onEdit, onDelete, loading }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {item.name}
    </div>
    <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
      <EditButton onClick={onEdit} />
      <DeleteButton onConfirm={onDelete} loading={loading} />
    </div>
  </div>
);
export default MenuItem;
