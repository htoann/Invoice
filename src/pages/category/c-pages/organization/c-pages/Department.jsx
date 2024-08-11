import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { Modal } from '@/components/modals/antd-modals';
import { BasicFormWrapper, BorderLessHeading } from '@/container/styled';
import { apiConst } from '@/utils/apiConst';
import { DataService } from '@/utils/dataService';
import { RightOutlined } from '@ant-design/icons';
import { Col, Empty, Form, Input, Menu, notification, Skeleton } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '../components/MenuItem';

const DepartmentList = ({ list, setList, loadingList, selectedItem, setSelectedItem, selectedBranch }) => {
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
      const response = await DataService.post(apiConst.departments, {
        ...values,
        branch: selectedBranch,
      });
      setList([response.data, ...list]);
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Common_Department'),
        description: t('Department_CreateSuccess'),
      });
    } catch (error) {
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
      const response = await DataService.put(`${apiConst.departments}${editItem.id}/`, {
        ...values,
      });
      const updatedAccount = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setList(updatedAccounts);

      form.resetFields();
      setShowEdit(false);
      notification.success({
        message: t('Common_Department'),
        description: t('Department_EditSuccess'),
      });
    } catch (error) {
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
      await DataService.delete(`${apiConst.departments}${id}/`);
      notification.success({
        message: t('Common_Department'),
        description: t('Department_DeleteSuccess'),
      });
      setList(list.filter((item) => item.id !== id));
      setSelectedItem(null);
    } catch (error) {
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
  );

  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <BorderLessHeading>
        <Cards title={t('Common_Department')}>
          <Menu
            style={{ width: '100%', minHeight: 'calc(100vh - 290px)' }}
            mode="inline"
            selectedKeys={[selectedItem]}
            onClick={({ key }) => setSelectedItem(key)}
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
                  + {t('Department_Create')}
                </Button>
                {list.map((department) => (
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
                  minHeight: 'calc(100vh - 290px)',
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

      <Modal title={t('Department_Create_Title')} open={showCreate} onCancel={cancelCreate} footer={null}>
        {customModal(t('Common_Create'), handleCreateSubmit, cancelCreate, loading)}
      </Modal>

      <Modal title={t('Department_Edit_Title')} open={showEdit} onCancel={cancelEdit} footer={null}>
        {customModal(t('Common_Save'), handleEditSubmit, cancelEdit, loading)}
      </Modal>
    </Col>
  );
};

export default DepartmentList;
