import { RightOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { BorderLessHeading, Main } from '../../../../container/styled';
import MenuItem from './components/MenuItem';
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
                  {Object.keys(data.companies)?.length > 0 &&
                    Object.keys(data.companies).map((company) => (
                      <Menu.Item key={company}>
                        <MenuItem
                          key={company}
                          item={company}
                          onEdit={() => handleEdit(company)}
                          onDelete={() => handleDelete(company)}
                        />
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
                    {data?.companies?.[selectedCompany]?.map((department) => (
                      <Menu.Item key={department}>
                        <MenuItem
                          key={department}
                          item={department}
                          onEdit={() => handleEdit(department)}
                          onDelete={() => handleDelete(department)}
                        />
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
                    {data?.departments?.[selectedDepartment]?.map((team) => (
                      <Menu.Item key={team}>
                        <MenuItem
                          key={team}
                          item={team}
                          onEdit={() => handleEdit(team)}
                          onDelete={() => handleDelete(team)}
                        />
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
