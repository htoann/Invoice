import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { BasicFormWrapper, BorderLessHeading, Main } from '@/container/styled';
import { API_INVOICES_CONNECT_AUTHORITY } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { Col, Form, Input, notification, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ConnectTaxAuthority() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const getList = async () => {
    setLoading(true);
    try {
      const response = await dataService.get(API_INVOICES_CONNECT_AUTHORITY);
      form.setFieldsValue(response?.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Invoice_GetTaxConnectFailure'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleOk = async (values) => {
    setSaving(true);

    try {
      const response = await dataService.post(API_INVOICES_CONNECT_AUTHORITY, {
        ...values,
      });

      form.setFieldsValue(response.data);

      notification.success({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Common_UpdateSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Common_UpdateFailure'),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '35rem', maxWidth: '100%', margin: 'auto' }}>
      <PageHeader className="invoice-page-header-main" title={t('Common_ConnectTaxAuthorities')} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards>
                {loading ? (
                  <Skeleton active style={{ marginTop: 30 }} />
                ) : (
                  <BasicFormWrapper>
                    <Form form={form} name="taxConnect" onFinish={handleOk}>
                      <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                        label="Tên đăng nhập"
                      >
                        <Input placeholder="name@example.com" />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                      >
                        <Input.Password placeholder="Mật khẩu" />
                      </Form.Item>

                      <div style={{ justifyContent: 'end', display: 'flex' }}>
                        <Button htmlType="submit" size="default" type="primary" loading={saving}>
                          Cập nhật
                        </Button>
                      </div>
                    </Form>
                  </BasicFormWrapper>
                )}
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default ConnectTaxAuthority;
