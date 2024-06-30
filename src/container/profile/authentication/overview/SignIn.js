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
            <h2 className="ninjadash-authentication-top__title">Sign in Invoice</h2>
          </div>

          <div className="ninjadash-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ message: 'Please input your username or Email!', required: true }]}
                initialValue="example@gmail.com"
                label="Username or Email Address"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item name="password" initialValue="123456" label="Password">
                <Input.Password placeholder="Password" />
              </Form.Item>
              {imgCapcha && (
                <img
                  style={{ margin: 'auto', display: 'flex' }}
                  alt="Capcha image"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(imgCapcha)}`}
                />
              )}
              <Form.Item name="capcha" initialValue="" label="Capcha">
                <Input placeholder="Capcha" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Don`t have an account?<Link to="/register">Sign up</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
