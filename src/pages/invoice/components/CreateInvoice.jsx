import { Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser } from '../../../container/pages/style';
import { BasicFormWrapper } from '../../../container/styled';
import { contactAddData } from '../../../redux/contact/actionCreator';
import { Modal } from '../../../components/modals/antd-modals';
import { Button } from '../../../components/buttons/buttons';

function CreateInvoice({ state, setState }) {
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

  const handleOk = (values) => {
    onCancel();
    const arrayData = [];
    users.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      contactAddData([
        ...users,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime(),
          img: 'static/img/users/6.png',
          live: false,
          stared: false,
        },
      ]),
    );
    form.resetFields();
  };

  return (
    <div>
      <Modal type="primary" title="Tạo người dùng" visible={state.visible} footer={null} onCancel={handleCancel}>
        <div className="project-modal">
          <AddUser>
            <BasicFormWrapper>
              <Form form={form} name="contact" onFinish={handleOk}>
                <Form.Item label="Name" name="name">
                  <Input placeholder="Input Name" />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ message: 'Please input your email!', type: 'email' }]}
                >
                  <Input placeholder="name@example.com" />
                </Form.Item>

                <Form.Item name="phone" label="Phone Number">
                  <Input placeholder="+440 2546 5236" />
                </Form.Item>

                <Form.Item name="designation" label="Position">
                  <Input placeholder="Input Position" />
                </Form.Item>

                <Form.Item name="company" label="Company Name">
                  <Input placeholder="Company Name" />
                </Form.Item>

                <div style={{ justifyContent: 'end', display: 'flex' }}>
                  <Button
                    size="default"
                    type="white"
                    style={{
                      marginRight: 8,
                    }}
                    outlined
                    onClick={() => {
                      setState({
                        ...state,
                        visible: false,
                      });
                    }}
                  >
                    Huỷ bỏ
                  </Button>
                  <Button htmlType="submit" size="default" type="primary" key="submit">
                    Tạo
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

export default CreateInvoice;
