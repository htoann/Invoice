import { Checkbox } from '@/components/checkbox/checkbox';
import { Button, Col, Form, Input, Row } from 'antd';
import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthFormWrap } from './style';

function SignUp() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = (values) => {
    register(values);
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
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
                name="name"
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

              <Form.Item
                label={t('Common_OrgCode')}
                name="org_code"
                rules={[{ required: true, message: t('Common_OrgCodeRequired') }]}
              >
                <Input placeholder={t('Common_OrgCode')} style={{ height: 45 }} />
              </Form.Item>

              <div className="invoice-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Tạo tài khoản nghĩa là bạn đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của chúng tôi
                </Checkbox>
              </div>
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
