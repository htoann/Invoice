import { Button, Col, Form, Input, Row } from 'antd';
import { useAuth } from 'context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthFormWrap } from './style';

function SignIn() {
  const { t } = useTranslation();
  const { loading, login } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    login(values, () => navigate('/'));
  };

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
                <Input placeholder={t('Common_Username')} />
              </Form.Item>

              <Form.Item
                name="password"
                label={t('Common_Password')}
                rules={[{ message: t('Common_PleaseEnterPassword'), required: true }]}
              >
                <Input.Password placeholder={t('Common_Password')} style={{ height: 45 }} />
              </Form.Item>

              <Form.Item>
                <Button className="btn-signIn" htmlType="submit" type="primary" size="large">
                  {loading ? t('Auth_SigningIn') : t('Auth_SignIn')}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div style={{ padding: 5 }}></div>
          {/* <div className="invoice-authentication-bottom">
            <p>
              {t('Auth_DontHaveAccount')}
              <Link to={routes.register}>{t('Auth_SignUp')}</Link>
            </p>
          </div> */}
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
