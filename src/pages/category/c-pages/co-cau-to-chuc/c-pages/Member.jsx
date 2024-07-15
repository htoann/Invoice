import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { BorderLessHeading } from '@/container/styled';
import { Col, Menu, Skeleton } from 'antd';
import MenuItem from '../components/MenuItem';

const MemberList = ({ members, loadingMembers, handleCreate, handleEdit, handleDelete }) => {
  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <BorderLessHeading>
        <Cards title="Các thành viên">
          <Menu style={{ width: '100%' }} mode="inline">
            <Button
              onClick={() => handleCreate()}
              size="extra-small"
              type="primary"
              outlined
              style={{ marginBottom: 10 }}
            >
              + Thêm thành viên
            </Button>
            {loadingMembers ? (
              <Skeleton active style={{ marginTop: 10, paddingRight: 10 }} />
            ) : (
              members?.length > 0 &&
              members.map((member) => (
                <Menu.Item key={member.id}>
                  <MenuItem
                    key={member.id}
                    item={member}
                    onEdit={() => handleEdit(member)}
                    onDelete={() => handleDelete(member)}
                  />
                </Menu.Item>
              ))
            )}
          </Menu>
        </Cards>
      </BorderLessHeading>
    </Col>
  );
};

export default MemberList;
