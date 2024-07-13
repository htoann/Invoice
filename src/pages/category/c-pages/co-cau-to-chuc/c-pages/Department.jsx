import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { Modal } from '@/components/modals/antd-modals';
import { AddUser } from '@/container/pages/style';
import { BasicFormWrapper, BorderLessHeading } from '@/container/styled';
import { RightOutlined } from '@ant-design/icons';
import { Col, Form, Input, Menu, Skeleton } from 'antd';
import { useState } from 'react';
import MenuItem from '../components/MenuItem';
import axios from '../mockApi';

const DepartmentList = ({ departments, loadingDepartments, selectedDepartment, setSelectedDepartment }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [form] = Form.useForm();

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowEdit(true);
    form.setFieldsValue(item);
  };

  const handleDelete = (id) => {
    axios.delete(`/departments/${id}`);
  };

  const handleCreateSubmit = (values) => {
    axios.post('/departments', values).then(() => {
      setShowCreate(false);
    });
    form.resetFields();
  };

  const cancelCreate = () => {
    setShowCreate(false);
    form.resetFields();
  };

  const handleEditSubmit = (values) => {
    axios.put(`/departments/${editItem.id}`, values).then(() => {
      setShowEdit(false);
    });
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
                    key={department.id}
                    item={department}
                    onEdit={() => handleEdit(department)}
                    onDelete={() => handleDelete(department.id)}
                  />
                </Menu.Item>
              ))
            )}
          </Menu>
        </Cards>
      </BorderLessHeading>

      <Modal title="Thêm phòng ban" visible={showCreate} onCancel={cancelCreate} footer={null}>
        {customModal('Thêm', handleCreateSubmit, cancelCreate, false)}
      </Modal>

      <Modal title="Chỉnh sửa phòng ban" visible={showEdit} onCancel={cancelEdit} footer={null}>
        {customModal('Lưu', handleEditSubmit, cancelEdit, false, editItem)}
      </Modal>
    </Col>
  );
};

export default DepartmentList;
