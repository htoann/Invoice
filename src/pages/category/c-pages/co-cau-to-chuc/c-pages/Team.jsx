import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { BorderLessHeading } from '@/container/styled';
import { RightOutlined } from '@ant-design/icons';
import { Col, Menu, Skeleton } from 'antd';
import MenuItem from '../components/MenuItem';

const TeamList = ({ teams, loadingTeams, selectedTeam, setSelectedTeam, handleCreate, handleEdit, handleDelete }) => {
  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <BorderLessHeading>
        <Cards title="Nhóm">
          <Menu
            style={{ width: '100%' }}
            mode="inline"
            selectedKeys={[selectedTeam]}
            onClick={({ key }) => setSelectedTeam(key)}
            itemIcon={<RightOutlined />}
          >
            <Button
              onClick={() => handleCreate()}
              size="extra-small"
              type="primary"
              outlined
              style={{ marginBottom: 10 }}
            >
              + Thêm nhóm
            </Button>
            {loadingTeams ? (
              <Skeleton active style={{ marginTop: 10 }} />
            ) : (
              teams?.length > 0 &&
              teams.map((team) => (
                <Menu.Item key={team.id}>
                  <MenuItem
                    key={team.id}
                    item={team}
                    onEdit={() => handleEdit(team)}
                    onDelete={() => handleDelete(team)}
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

export default TeamList;
