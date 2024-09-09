import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { Modal } from '@/components/modals/antd-modals';
import { BasicFormWrapper, BorderLessHeading } from '@/container/styled';
import { API_DEPARTMENT, API_DEPARTMENTS, dataService } from '@/service';
import { RightOutlined } from '@ant-design/icons';
import { Col, Empty, Form, Input, Menu, notification, Skeleton } from 'antd';
import { useAppState } from 'context/AppContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '../components/MenuItem';

const DepartmentList = () => {
  const { t } = useTranslation();
  const {
    departments,
    setDepartments,
    loadingDepartments,
    getDepartments,
    selectedDepartmentId,
    setSelectedDepartmentId,
    selectedBranchId,
  } = useAppState();

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [departmentEdit, setDepartmentEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCreate = () => {
    setShowCreate(true);
    setShowEdit(false);
  };

  const handleEdit = (item) => {
    setDepartmentEdit(item);
    setShowEdit(true);
    form.setFieldsValue(item);
  };

  const handleCreateSubmit = async (values) => {
    try {
      setLoading(true);

      await dataService.post(API_DEPARTMENTS, {
        ...values,
        branch: selectedBranchId,
      });

      getDepartments();
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Common_Department'),
        description: t('Department_CreateSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Department'),
        description: t('Department_CreateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_DEPARTMENT(departmentEdit.id), {
        ...values,
        branch: selectedBranchId,
      });

      const updatedAccount = response.data;
      const updatedAccounts = departments.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setDepartments(updatedAccounts);

      form.resetFields();
      setShowEdit(false);

      notification.success({
        message: t('Common_Department'),
        description: t('Department_EditSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Department'),
        description: t('Department_EditError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await dataService.delete(API_DEPARTMENT(id));

      setDepartments(departments.filter((item) => item.id !== id));
      setSelectedDepartmentId(null);

      notification.success({
        message: t('Common_Department'),
        description: t('Department_DeleteSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Error'),
        description: t('Department_DeleteError'),
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
          label={t('Department_Name')}
          rules={[{ required: true, message: t('Department_Name_Required') }]}
          initialValue={showEdit ? departmentEdit?.name : ''}
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
        <Cards title={t('Common_Department')}>
          <Menu
            style={{ width: '100%', minHeight: 'var(--org-structure)', borderRight: 'none' }}
            mode="inline"
            selectedKeys={[selectedDepartmentId]}
            onClick={({ key }) => setSelectedDepartmentId(key)}
            itemIcon={<RightOutlined />}
          >
            {loadingDepartments ? (
              <Skeleton active style={{ marginTop: 10, paddingRight: 10 }} />
            ) : departments?.length > 0 ? (
              <>
                <Button
                  onClick={() => handleCreate()}
                  size="extra-small"
                  type="primary"
                  outlined
                  style={{ marginBottom: 10 }}
                >
                  + {t('Department_Create')}
                </Button>
                {departments.map((department) => (
                  <Menu.Item key={department.id}>
                    <MenuItem
                      key={department.id}
                      item={department}
                      onEdit={() => handleEdit(department)}
                      onDelete={() => handleDelete(department.id)}
                      loading={loading}
                    />
                  </Menu.Item>
                ))}
              </>
            ) : (
              <Empty
                description={t('Department_Empty_Description')}
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
          </Menu>
        </Cards>
      </BorderLessHeading>

      <Modal title={t('Department_Create_Title')} open={showCreate} onCancel={cancelCreate}>
        {customModal(t('Common_Create'), handleCreateSubmit, cancelCreate, loading)}
      </Modal>

      <Modal title={t('Department_Edit_Title')} open={showEdit} onCancel={cancelEdit}>
        {customModal(t('Common_Save'), handleEditSubmit, cancelEdit, loading)}
      </Modal>
    </Col>
  );
};

export default DepartmentList;
