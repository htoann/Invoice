import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { AddUser } from '@/container/pages/style';
import { BasicFormWrapper, BorderLessHeading } from '@/container/styled';
import axios from '@/mock/category/coCauToChucMockApi';
import { RightOutlined } from '@ant-design/icons';
import { Col, Form, Input, Menu, Modal, notification, Skeleton } from 'antd';
import { useState } from 'react';
import MenuItem from '../components/MenuItem';

const DepartmentList = ({
  departments,
  setDepartments,
  loadingDepartments,
  selectedDepartment,
  setSelectedDepartment,
}) => {
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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/departments/${id}`);
      notification.success({
        message: 'Xóa phòng ban',
        description: 'Phòng ban đã được xóa thành công.',
      });
      setDepartments(departments.filter((item) => item.id !== id));
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi xóa phòng ban.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/departments', {
        department: values,
      });
      setDepartments([...departments, response.data]);
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: 'Thêm phòng ban',
        description: 'Phòng ban đã được thêm thành công.',
      });
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi thêm phòng ban.',
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelCreate = () => {
    setShowCreate(false);
    form.resetFields();
  };

  const handleEditSubmit = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      const response = await axios.put(`/departments/${editItem.id}`, { department: values });
      const updatedAccount = response.data;

      const updatedAccounts = departments.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setDepartments(updatedAccounts);

      form.resetFields();
      setShowEdit(false);
      notification.success({
        message: 'Chỉnh sửa phòng ban',
        description: 'Phòng ban đã được chỉnh sửa thành công.',
      });
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi chỉnh sửa phòng ban.',
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setShowEdit(false);
    form.resetFields();
  };

  const customModal = (textSubmit = 'Lưu', onSubmit, onCancel, loading, editItem) => (
    <AddUser>
      <BasicFormWrapper>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="Tên phòng ban"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
            initialValue={editItem?.name}
          >
            <Input />
          </Form.Item>
          <div style={{ justifyContent: 'end', display: 'flex' }}>
            <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
              Huỷ bỏ
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
        <Cards title="Phòng ban" style={{ height: 1000 }}>
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
              <Skeleton active style={{ marginTop: 10, paddingRight: 10 }} />
            ) : (
              departments?.length > 0 &&
              departments.map((department) => (
                <Menu.Item key={department.id}>
                  <MenuItem
                    key={department.id}
                    item={department}
                    onEdit={() => handleEdit(department)}
                    onDelete={() => handleDelete(department.id)}
                    loading={loading}
                  />
                </Menu.Item>
              ))
            )}
          </Menu>
        </Cards>
      </BorderLessHeading>

      <Modal title="Thêm phòng ban" open={showCreate} onCancel={cancelCreate} footer={null}>
        {customModal('Thêm', handleCreateSubmit, cancelCreate, false)}
      </Modal>

      <Modal title="Chỉnh sửa phòng ban" open={showEdit} onCancel={cancelEdit} footer={null}>
        {customModal('Lưu', handleEditSubmit, cancelEdit, false, editItem)}
      </Modal>
    </Col>
  );
};

export default DepartmentList;