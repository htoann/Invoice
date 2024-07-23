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
import MenuItem from '../components/MenuItem';

const BranchList = ({ list, setList, loadingList, selectedItem, setSelectedItem }) => {
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
      const response = await axios.post('/branches', {
        branch: values,
      });
      setList([response.data, ...list]);
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Branch_Title'),
        description: t('Branch_CreateSuccess'),
      });
    } catch (error) {
      notification.error({
        message: t('Branch_Title'),
        description: t('Branch_CreateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/branches/${editItem.id}`, { branch: { ...values, id: editItem.id } });
      const updatedAccount = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setList(updatedAccounts);

      form.resetFields();
      setShowEdit(false);
      notification.success({
        message: t('Branch_Title'),
        description: t('Branch_EditSuccess'),
      });
    } catch (error) {
      notification.error({
        message: t('Branch_Title'),
        description: t('Branch_EditError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/branches/${id}`);
      notification.success({
        message: t('Branch_Title'),
        description: t('Branch_DeleteSuccess'),
      });
      setList(list.filter((item) => item.id !== id));
      setSelectedItem(null);
    } catch (error) {
      notification.error({
        message: t('Branch_Title'),
        description: t('Branch_DeleteError'),
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
            label={t('Branch_Name')}
            rules={[{ required: true, message: t('Branch_Name_Required') }]}
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
        <Cards title={t('Branch_Title')}>
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
                  + {t('Branch_Create')}
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
                description={t('Branch_Empty_Description')}
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

      <Modal title={t('Branch_Create')} open={showCreate} onCancel={cancelCreate} footer={null}>
        {customModal(t('Common_Create'), handleCreateSubmit, cancelCreate, loading)}
      </Modal>

      <Modal title={t('Branch_Edit_Title')} open={showEdit} onCancel={cancelEdit} footer={null}>
        {customModal(t('Common_Save'), handleEditSubmit, cancelEdit, loading)}
      </Modal>
    </Col>
  );
};

export default BranchList;
