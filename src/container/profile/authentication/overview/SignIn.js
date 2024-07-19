import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../../redux/authentication/actionCreator';
import { AuthFormWrap } from './style';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const [imgCaptcha, setImgCaptcha] = useState();
  const [keyCaptcha, setKeyCaptcha] = useState();

  const handleSubmit = (values) => {
    dispatch(login({ ...values, ckey: keyCaptcha }, () => navigate('/')));
  };

  const getCaptcha = async () => {
    const data = await axios.get(process.env.REACT_APP_HDDT_CAPTCHA);
    setImgCaptcha(data?.data?.content || null);
    setKeyCaptcha(data?.data?.key || null);
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="invoice-authentication-top">
            <h2 className="invoice-authentication-top__title">Đăng nhập vào hệ thống hoá đơn</h2>
          </div>

          <div className="invoice-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="username"
                rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
                label="Tên đăng nhập"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ message: 'Vui lòng nhập mật khẩu', required: true }]}
              >
                <Input.Password placeholder="Mật khẩu" style={{ height: 45 }} />
              </Form.Item>

              <Row justify="center" align="middle">
                <Col xl={12} xs={24}>
                  <Form.Item
                    name="cvalue"
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

              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
