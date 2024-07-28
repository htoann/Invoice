import { Button } from '@/components/buttons/buttons';
import { Modal } from '@/components/modals/antd-modals';
import { BasicFormWrapper } from '@/container/styled';
import { Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

function CreateTaxAccount({ state, setState }) {
  const [form] = Form.useForm();

  const [imgCaptcha, setImgCaptcha] = useState();

  const getCaptcha = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_HDDT_CAPTCHA);
      setImgCaptcha(data?.data?.content || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  const handleOk = () => {};

  return (
    <div>
      <Modal type="primary" title="Tạo người dùng" visible={state.visible} footer={null} onCancel={onCancel}>
        <div className="project-modal">
          <BasicFormWrapper>
            <Form form={form} name="username" onFinish={handleOk} autoComplete="off">
              <Form.Item
                name="name"
                rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
                initialValue="invoice@dm.com"
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
                    name="captcha"
                    initialValue=""
                    label="Mã xác nhận"
                    rules={[{ message: 'Vui lòng nhập mã xác nhận', required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={12} xs={24}>
                  {imgCaptcha && (
                    <img
                      style={{ margin: 'auto', display: 'flex' }}
                      alt="Captcha image"
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(imgCaptcha)}`}
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
        </div>
      </Modal>
    </div>
  );
}

export default CreateTaxAccount;
