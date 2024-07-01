import { Button, Col, Form, Input, Row } from 'antd';
import { Auth0Lock } from 'auth0-lock';
import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth0options } from '../../../../config/auth0';
import { authOLogin, login } from '../../../../redux/authentication/actionCreator';
import { AuthFormWrap } from './style';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const [imgCapcha, setImgCapcha] = useState();

  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(login(values, () => navigate('/admin')));
    },
    [navigate, dispatch],
  );

  const handleAuthOSubmit = useCallback(
    (values) => {
      dispatch(authOLogin(values, () => navigate('/admin')));
    },
    [navigate, dispatch],
  );

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }
      handleAuthOSubmit(authResult);
      lock.hide();
    });
  });

  const getCapcha = async () => {
    const data = await axios.get('https://hoadondientu.gdt.gov.vn:30000/captcha');
    console.log(data);
    setImgCapcha(data?.data?.content || null);
  };

  useEffect(() => {
    getCapcha();
  }, []);

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Đăng nhập vào hệ thống hoá đơn</h2>
          </div>

          <div className="ninjadash-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
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
                <Input.Password placeholder="Password" />
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

              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Chưa có tài khoản?<Link to="/register">Đăng ký</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
