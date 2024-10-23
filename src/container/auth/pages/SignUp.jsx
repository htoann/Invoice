import { Button, Col, Form, Input, Row } from 'antd';
import { useAuth } from 'context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormWrap } from './style';

function SignUp() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    register(values, () => navigate('/'));
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="invoice-authentication-top">
            <h2 className="invoice-authentication-top__title">Đăng ký vào hệ thống hoá đơn</h2>
          </div>
          <div className="invoice-authentication-content">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
              >
                <Input placeholder={t('Common_Username')} />
              </Form.Item>

              <Form.Item
                label={t('Common_Password')}
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password placeholder={t('Common_Password')} style={{ height: 45 }} />
              </Form.Item>

              {/* <div className="invoice-auth-extra-links">
                <Checkbox>
                  Tạo tài khoản nghĩa là bạn đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của chúng tôi
                </Checkbox>
              </div> */}
              <Form.Item>
                <Button className="btn-create" htmlType="submit" type="primary" size="large">
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="invoice-authentication-bottom">
            <p>
              Đã có tài khoản?<Link to="/">Đăng nhập</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignUp;
