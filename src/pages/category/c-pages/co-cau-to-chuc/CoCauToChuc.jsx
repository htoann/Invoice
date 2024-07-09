import { RightOutlined } from '@ant-design/icons';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Col, Menu, Popconfirm, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { BorderLessHeading, Main } from '../../../../container/styled';
import data from './mock.json';

export const CoCauToChuc = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setSelectedDepartment(null);
  }, [selectedCompany]);

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
          <Col xs={8}>
            <BorderLessHeading>
              <Cards title="Công ty">
                <Menu
                  style={{ width: '100%' }}
                  mode="inline"
                  defaultSelectedKeys={[selectedCompany]}
                  onClick={({ key }) => setSelectedCompany(key)}
                  itemIcon={<RightOutlined />}
                >
                  <Button
                    onClick={() => handleCreate()}
                    size="extra-small"
                    type="primary"
                    outlined
                    style={{ marginBottom: 10 }}
                  >
                    + Thêm công ty
                  </Button>
                  {Object.keys(data.companies).map((company) => (
                    <Menu.Item key={company}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {company}
                        <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
                          <Button
                            icon={<UilEdit />}
                            size="small"
                            style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
                            onClick={() => handleEdit(company)}
                          />
                          <Popconfirm
                            title="Bạn có muốn xoá công ty này không"
                            onConfirm={() => handleDelete(company)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button
                              icon={<UilTrash />}
                              size="small"
                              style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
                </Menu>
              </Cards>
            </BorderLessHeading>
          </Col>
          {selectedCompany && (
            <Col xs={8}>
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
                    {data.companies[selectedCompany].map((department) => (
                      <Menu.Item key={department}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {department}
                          <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
                            <Button
                              icon={<UilEdit />}
                              size="small"
                              style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
                              onClick={() => handleEdit(department)}
                            />
                            <Popconfirm
                              title="Bạn có muốn xoá phòng ban này không"
                              onConfirm={() => handleDelete(department)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <Button
                                icon={<UilTrash />}
                                size="small"
                                style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
                              />
                            </Popconfirm>
                          </div>
                        </div>
                      </Menu.Item>
                    ))}
                  </Menu>
                </Cards>
              </BorderLessHeading>
            </Col>
          )}
          {selectedDepartment && (
            <Col xs={8}>
              <BorderLessHeading>
                <Cards title="Nhóm">
                  <Menu style={{ width: '100%' }} mode="inline">
                    <Button
                      onClick={() => handleCreate()}
                      size="extra-small"
                      type="primary"
                      outlined
                      style={{ marginBottom: 10 }}
                    >
                      + Thêm nhóm
                    </Button>
                    {data.departments[selectedDepartment].map((team) => (
                      <Menu.Item key={team}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {team}
                          <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
                            <Button
                              icon={<UilEdit />}
                              size="small"
                              style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
                              onClick={() => handleEdit(team)}
                            />
                            <Popconfirm
                              title="Bạn có muốn xoá nhóm này không"
                              onConfirm={() => handleDelete(team)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <Button
                                icon={<UilTrash />}
                                size="small"
                                style={{ marginLeft: '8px', color: 'rgb(160, 160, 160)' }}
                              />
                            </Popconfirm>
                          </div>
                        </div>
                      </Menu.Item>
                    ))}
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
