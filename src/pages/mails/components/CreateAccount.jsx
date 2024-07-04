import { Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { AddUser } from '../../../container/pages/style';
import { BasicFormWrapper } from '../../../container/styled';
import { contactAddData } from '../../../redux/contact/actionCreator';

function CreateAccount({ state, setState }) {
  const dispatch = useDispatch();
  const { users } = useSelector((stateItem) => {
    return {
      users: stateItem.Contact.data,
    };
  });
  const [form] = Form.useForm();

  const [imgCapcha, setImgCapcha] = useState();

  const getCapcha = async () => {
    const data = await axios.get(process.env.REACT_APP_HDDT_CAPTCHA);
    setImgCapcha(data?.data?.content || null);
  };

  useEffect(() => {
    getCapcha();
  }, []);

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
              <Form form={form} name="username" onFinish={handleOk}>
                <Form.Item
                  name="name"
                  rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
                  initialValue="ninjadash@dm.com"
                  label="Tên đăng nhập"
                >
                  <Input placeholder="name@example.com" />
                </Form.Item>

                <Form.Item
                  name="password"
                  initialValue="123456"
                  label="Mật khẩu"
                  rules={[{ message: 'Vui lòng nhập mật khẩu', required: true }]}
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Row justify="center" align="middle">
                  <Col xl={12} xs={24}>
                    <Form.Item
                      name="capcha"
                      initialValue=""
                      label="Mã xác nhận"
                      rules={[{ message: 'Vui lòng nhập mã xác nhận', required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={12} xs={24}>
                    {imgCapcha && (
                      <img
                        style={{ margin: 'auto', display: 'flex' }}
                        alt="Capcha image"
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(imgCapcha)}`}
                      />
                    )}
                  </Col>
                </Row>

                <div style={{ padding: '20px' }}>
                  <Row gutter={16} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <Col span={12}>
                      <Checkbox>Đồng bộ hoá đơn bán ra</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Đồng bộ từ ngày">
                        <DatePicker placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
                    <Col span={12}>
                      <Checkbox>Đồng bộ hoá đơn mua vào</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Đồng bộ từ ngày">
                        <DatePicker placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

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

export default CreateAccount;
