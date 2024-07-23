import { Button, Col, Form, Input, notification, Row } from 'antd';
import { useEffect, useState } from 'react';

import { login } from '@/redux/authentication/actionCreator';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthFormWrap } from './style';

function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const [imgCaptcha, setImgCaptcha] = useState();
  const [keyCaptcha, setKeyCaptcha] = useState();

  const handleSubmit = (values) => {
    dispatch(
      login(
        { ...values, ckey: keyCaptcha },
        () => navigate('/'),
        () => {
          notification.error({
            message: t('Auth_SignIn'),
            description: t('Auth_SignIn_Failed'),
          });
        },
      ),
    );
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
            <h2 className="invoice-authentication-top__title">{t('Auth_SignIn_Title')}</h2>
          </div>

          <div className="invoice-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="username"
                rules={[{ message: t('Common_PleaseEnterUsername'), required: true }]}
                label={t('Common_Username')}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label={t('Common_Password')}
                rules={[{ message: t('Common_PleaseEnterPassword'), required: true }]}
              >
                <Input.Password placeholder={t('Common_Password')} style={{ height: 45 }} />
              </Form.Item>

              <Row justify="center" align="middle">
                <Col xl={12} xs={24}>
                  <Form.Item
                    name="cvalue"
                    label={t('Common_Captcha')}
                    rules={[{ message: t('Common_PleaseEnterCaptcha'), required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={12} xs={24}>
                  {imgCaptcha && (
                    <img
                      style={{ margin: 'auto', display: 'flex' }}
                      alt={t('Common_Captcha')}
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(imgCaptcha)}`}
                    />
                  )}
                </Col>
              </Row>

              <Form.Item>
                <Button className="btn-signIn" htmlType="submit" type="primary" size="large">
                  {isLoading ? t('Auth_SigningIn') : t('Auth_SignIn')}
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
