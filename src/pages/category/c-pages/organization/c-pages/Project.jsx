import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { Modal } from '@/components/modals/antd-modals';
import { AddUser } from '@/container/pages/style';
import { BasicFormWrapper, BorderLessHeading } from '@/container/styled';
import axios from '@/mock/index';
import { RightOutlined } from '@ant-design/icons';
import { Col, Empty, Form, Input, Menu, notification, Skeleton } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';

const ProjectList = ({ list, setList, loadingList }) => {
  const { t } = useTranslation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowEdit(true);
    form.setFieldsValue(item);
  };

  const handleCreateSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/projects', {
        project: values,
      });
      setList([response.data, ...list]);
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Common_Create'),
        description: t('Project_Create_Success'),
      });
    } catch (error) {
      notification.error({
        message: t('Common_Error'),
        description: t('Project_Create_Error'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/projects/${editItem.id}`, { project: { ...values, id: editItem.id } });
      const updatedProject = response.data;

      const updatedProjects = list.map((proj) => (proj.id === updatedProject.id ? updatedProject : proj));
      setList(updatedProjects);

      form.resetFields();
      setShowEdit(false);
      notification.success({
        message: t('Common_Save'),
        description: t('Project_Edit_Success'),
      });
    } catch (error) {
      notification.error({
        message: t('Common_Error'),
        description: t('Project_Edit_Error'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/projects/${id}`);
      notification.success({
        message: t('Common_Delete'),
        description: t('Project_Delete_Success'),
      });
      setList(list.filter((item) => item.id !== id));
    } catch (error) {
      notification.error({
        message: t('Common_Error'),
        description: t('Project_Delete_Error'),
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelCreate = () => {
    setShowCreate(false);
    form.resetFields();
  };

  const cancelEdit = () => {
    setShowEdit(false);
    form.resetFields();
  };

  const customModal = (textSubmit, onSubmit, onCancel, loading) => (
    <AddUser>
      <BasicFormWrapper>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            name="name"
            label={t('Project_Name')}
            rules={[{ required: true, message: t('Project_Name_Required') }]}
            initialValue={showEdit ? editItem?.name : ''}
          >
            <Input />
          </Form.Item>
          <div style={{ justifyContent: 'end', display: 'flex' }}>
            <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
              {t('Common_Cancel')}
            </Button>
            <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
              {textSubmit}
            </Button>
          </div>
        </Form>
      </BasicFormWrapper>
    </AddUser>
  );

  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <BorderLessHeading>
        <Cards title={t('Project_Title')} style={{ height: 1000 }}>
          <StyledMenu
            style={{ width: '100%', minHeight: 'calc(100vh - 290px)' }}
            mode="inline"
            itemIcon={<RightOutlined />}
          >
            {loadingList ? (
              <Skeleton active style={{ marginTop: 10, paddingRight: 10 }} />
            ) : list?.length > 0 ? (
              <>
                <Button
                  onClick={() => handleCreate()}
                  size="extra-small"
                  type="primary"
                  outlined
                  style={{ marginBottom: 10 }}
                >
                  + {t('Project_Add')}
                </Button>
                {list.map((project) => (
                  <Menu.Item key={project.id}>
                    <MenuItem
                      key={project.id}
                      item={project}
                      onEdit={() => handleEdit(project)}
                      onDelete={() => handleDelete(project.id)}
                      loading={loading}
                    />
                  </Menu.Item>
                ))}
              </>
            ) : (
              <Empty
                description={t('Project_Not_Found')}
                className="common-center"
                style={{
                  minHeight: 'calc(100vh - 290px)',
                }}
              >
                <Button size="small" type="primary" onClick={() => handleCreate()}>
                  {t('Project_Create')}
                </Button>
              </Empty>
            )}
          </StyledMenu>
        </Cards>
      </BorderLessHeading>

      <Modal title={t('Project_Add')} open={showCreate} onCancel={cancelCreate} footer={null}>
        {customModal(t('Common_Create'), handleCreateSubmit, cancelCreate, loading)}
      </Modal>

      <Modal title={t('Project_Edit')} open={showEdit} onCancel={cancelEdit} footer={null}>
        {customModal(t('Common_Save'), handleEditSubmit, cancelEdit, loading)}
      </Modal>
    </Col>
  );
};

const StyledMenu = styled(Menu)`
  .anticon-right {
    display: none;
  }
`;

export default ProjectList;
