import { Button } from '@/components/button';
import { Cards } from '@/components/card';
import { Modal } from '@/components/modal';
import { BasicFormWrapper, BorderLessHeading } from '@/container/style';
import { API_PROJECT, API_PROJECTS, dataService } from '@/service';
import { RightOutlined } from '@ant-design/icons';
import { Col, Empty, Form, Input, Menu, notification, Skeleton } from 'antd';
import { useAppState } from 'context/AppContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';

const ProjectList = () => {
  const { t } = useTranslation();

  const { projects, setProjects, loadingProjects, getProjects, selectedBranchId, selectedDepartmentId } = useAppState();

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCreate = () => {
    setShowCreate(true);
    setShowEdit(false);
  };

  const handleEdit = (item) => {
    setProjectEdit(item);
    setShowEdit(true);
    form.setFieldsValue(item);
  };

  const handleCreateSubmit = async (values) => {
    try {
      setLoading(true);

      await dataService.post(API_PROJECTS, {
        ...values,
        branch: selectedBranchId,
        department: selectedDepartmentId,
      });

      getProjects();
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Common_Project'),
        description: t('Project_CreateSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Project'),
        description: t('Project_CreateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_PROJECT(projectEdit.id), {
        ...values,
        branch: selectedBranchId,
        department: selectedDepartmentId,
      });
      const updatedProject = response.data;
      const updatedProjects = projects.map((proj) => (proj.id === updatedProject.id ? updatedProject : proj));
      setProjects(updatedProjects);

      form.resetFields();
      setShowEdit(false);

      notification.success({
        message: t('Common_Project'),
        description: t('Project_EditSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Project'),
        description: t('Project_EditError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      setLoading(true);

      await dataService.delete(API_PROJECT(projectId));

      setProjects(projects.filter((item) => item.id !== projectId));

      notification.success({
        message: t('Common_Project'),
        description: t('Project_DeleteSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Project'),
        description: t('Project_DeleteError'),
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
    <BasicFormWrapper>
      <Form form={form} onFinish={onSubmit} autoComplete="off">
        <Form.Item
          name="name"
          label={t('Project_Name')}
          rules={[{ required: true, message: t('Project_Name_Required') }]}
          initialValue={showEdit ? projectEdit?.name : ''}
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
  );

  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <BorderLessHeading>
        <Cards title={t('Common_Project')}>
          <StyledMenu
            style={{ width: '100%', minHeight: 'var(--org-structure)', borderRight: 'none' }}
            mode="inline"
            itemIcon={<RightOutlined />}
          >
            {loadingProjects ? (
              <Skeleton active style={{ marginTop: 10, paddingRight: 10 }} />
            ) : projects?.length > 0 ? (
              <>
                <Button
                  onClick={() => handleCreate()}
                  size="extra-small"
                  type="primary"
                  outlined
                  style={{ marginBottom: 10 }}
                >
                  + {t('Project_Create')}
                </Button>
                {projects.map((project) => (
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
                description={t('Project_NotFound')}
                className="common-center"
                style={{
                  minHeight: 'var(--org-structure)',
                }}
              >
                <Button size="small" type="primary" onClick={() => handleCreate()}>
                  {t('Common_Create')}
                </Button>
              </Empty>
            )}
          </StyledMenu>
        </Cards>
      </BorderLessHeading>

      <Modal title={t('Project_Create')} open={showCreate} onCancel={cancelCreate}>
        {customModal(t('Common_Create'), handleCreateSubmit, cancelCreate, loading)}
      </Modal>

      <Modal title={t('Project_Edit')} open={showEdit} onCancel={cancelEdit}>
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
