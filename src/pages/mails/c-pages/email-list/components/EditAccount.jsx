import { Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser } from '../../../../../container/pages/style';
import { BasicFormWrapper } from '../../../../../container/styled';
import { contactAddData } from '../../../../../redux/contact/actionCreator';
import { Button } from '../../../../../components/buttons/buttons';
import { Modal } from '../../../../../components/modals/antd-modals';

function EditAccount({ state, setState }) {
  const dispatch = useDispatch();
  const { users } = useSelector((stateItem) => {
    return {
      users: stateItem.Contact.data,
    };
  });
  const [form] = Form.useForm();

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const { update } = state;

  const handleEditOk = (values) => {
    onCancel();
    const updateUsers = users;

    updateUsers.map((user) => {
      if (user.id === update.id) {
        const updateUser = user;
        updateUser.id = update.id;
        updateUser.name = values.name;
        updateUser.email = values.email;
        updateUser.phone = values.phone;
        updateUser.designation = values.designation;
        updateUser.company = values.company;
        updateUser.time = update.time;
        updateUser.img = update.img;
        updateUser.stared = update.stared;
      }
      return true;
    });
    dispatch(contactAddData(updateUsers));
    form.resetFields();
  };

  return (
    <div>
      <Modal
        type={state.modalType}
        title="Cập nhật người dùng"
        visible={state.editVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="project-modal">
          <AddUser>
            <BasicFormWrapper>
              <Form form={form} name="contactEdit" onFinish={handleEditOk}>
                <Form.Item initialValue={update.name} label="Name" name="name">
                  <Input placeholder="Input Name" />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ message: 'Please input your email!', type: 'email' }]}
                  initialValue={update.email}
                >
                  <Input placeholder="name@example.com" />
                </Form.Item>

                <Form.Item initialValue={update.phone} name="phone" label="Phone Number">
                  <Input placeholder="+440 2546 5236" />
                </Form.Item>

                <Form.Item initialValue={update.designation} name="designation" label="Position">
                  <Input placeholder="Input Position" />
                </Form.Item>

                <Form.Item initialValue={update.company} name="company" label="Company Name">
                  <Input placeholder="Company Name" />
                </Form.Item>

                <div style={{ justifyContent: 'end', display: 'flex' }}>
                  <Button
                    size="default"
                    type="white"
                    outlined
                    style={{
                      marginRight: 8,
                    }}
                    onClick={() => {
                      setState({
                        ...state,
                        editVisible: false,
                      });
                    }}
                  >
                    Huỷ bỏ
                  </Button>
                  <Button htmlType="submit" size="default" type="primary" key="submit">
                    Lưu
                  </Button>
                </div>
              </Form>
            </BasicFormWrapper>
          </AddUser>
        </div>
      </Modal>
    </div>
  );
}

export default EditAccount;
