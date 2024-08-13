import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { Modal } from '@/components/modals/antd-modals';
import { BasicFormWrapper, BorderLessHeading } from '@/container/styled';
import { API_BRANCH, API_BRANCHES } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { RightOutlined } from '@ant-design/icons';
import { Col, Empty, Form, Input, Menu, notification, Skeleton } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '../components/MenuItem';
import useBranches from '../hook/useBranches';

const BranchList = ({ list, setList, loadingList, selectedItem, setSelectedItem }) => {
  const { t } = useTranslation();
  const { getBranches } = useBranches();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [branchEdit, setBranchEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCreateSubmit = async (values) => {
    try {
      setLoading(true);

      await dataService.post(API_BRANCHES, {
        ...values,
      });

      getBranches();
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Common_Branch'),
        description: t('Branch_CreateSuccess'),
      });
    } catch (error) {
      notification.error({
        message: t('Common_Branch'),
        description: t('Branch_CreateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_BRANCH(branchEdit.id), {
        ...values,
      });
      const updatedAccount = response.data;

      const updatedAccounts = list.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setList(updatedAccounts);

      form.resetFields();
      setShowEdit(false);

      notification.success({
        message: t('Common_Branch'),
        description: t('Branch_EditSuccess'),
      });
    } catch (error) {
      notification.error({
        message: t('Common_Branch'),
        description: t('Branch_EditError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await dataService.delete(API_BRANCH(id));

      setList(list.filter((item) => item.id !== id));
      setSelectedItem(null);

      notification.success({
        message: t('Common_Branch'),
        description: t('Branch_DeleteSuccess'),
      });
    } catch (error) {
      notification.error({
        message: t('Common_Branch'),
        description: t('Branch_DeleteError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleEdit = (item) => {
    setBranchEdit(item);
    setShowEdit(true);
    form.setFieldsValue(item);
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
          label={t('Branch_Name')}
          rules={[{ required: true, message: t('Branch_Name_Required') }]}
          initialValue={showEdit ? branchEdit?.name : ''}
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
        <Cards title={t('Common_Branch')}>
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
