import { RightOutlined } from '@ant-design/icons';
import { Col, Menu, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { BorderLessHeading, Main } from '../../../../container/styled';
import MenuItem from './components/MenuItem';
import axios from './mockApi';

export const CoCauToChuc = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [members, setMembers] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setLoadingDepartments(true);

    axios
      .get('/departments')
      .then((response) => {
        setDepartments(response.data.departments);
        setLoadingDepartments(false);
      })
      .catch((error) => {
        setLoadingDepartments(false);
      });
  }, []);

  useEffect(() => {
    setTeams([]);
    setSelectedTeam(null);

    if (!selectedDepartment) {
      return;
    }

    setLoadingTeams(true);
    axios
      .get(`/departments/${selectedDepartment}/teams`)
      .then((response) => {
        setTeams(response.data.teams);
        setLoadingTeams(false);
      })
      .catch((error) => {
        setLoadingTeams(false);
      });
  }, [selectedDepartment]);

  useEffect(() => {
    setMembers([]);

    if (!selectedTeam) {
      return;
    }

    setLoadingMembers(true);
    axios
      .get(`/teams/${selectedTeam}/members`)
      .then((response) => {
        setMembers(response.data.members);
        setLoadingMembers(false);
      })
      .catch((error) => {
        setLoadingMembers(false);
      });
  }, [selectedTeam, selectedDepartment]);

  const handleEdit = (item) => {
    setShowEdit(true);
    console.log('Edit:', item);
  };

  const handleDelete = (item) => {
    console.log('Delete:', item);
  };

  const handleCreate = () => {
    setShowCreate(true);
    console.log('Create New Item');
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Cơ cấu tổ chức" />
      <Main>
        <Row gutter={15}>
          {/* Phòng ban */}
          <Col xs={24} sm={12} md={8} lg={8}>
            <BorderLessHeading>
              <Cards title="Phòng ban">
                <Menu
                  style={{ width: '100%' }}
                  mode="inline"
                  selectedKeys={[selectedDepartment]}
                  onClick={({ key }) => setSelectedDepartment(key)}
                  itemIcon={<RightOutlined />}
                >
                  <Button
                    onClick={() => handleCreate()}
                    size="extra-small"
                    type="primary"
                    outlined
                    style={{ marginBottom: 10 }}
                  >
                    + Thêm phòng ban
                  </Button>
                  {loadingDepartments ? (
                    <Skeleton active style={{ marginTop: 10 }} />
                  ) : (
                    departments?.length > 0 &&
                    departments.map((department) => (
                      <Menu.Item key={department.id}>
                        <MenuItem
                          key={department}
                          item={department}
                          onEdit={() => handleEdit(department)}
                          onDelete={() => handleDelete(department)}
                        />
                      </Menu.Item>
                    ))
                  )}
                </Menu>
              </Cards>
            </BorderLessHeading>
          </Col>

          {/* Nhóm */}
          {selectedDepartment && (
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
                            key={team}
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
          )}

          {/* Các thành viên */}
          {selectedTeam && (
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
                      <Skeleton active style={{ marginTop: 10 }} />
                    ) : (
                      members?.length > 0 &&
                      members.map((member) => (
                        <Menu.Item key={member.id}>
                          <MenuItem
                            key={member}
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
          )}
        </Row>
      </Main>
    </>
  );
};
