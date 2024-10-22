import { Button } from '@/components/buttons';
import { PageHeader } from '@/components/page-headers';
import { BasicFormWrapper } from '@/container/styled';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_INVOICES_CONNECT_AUTHORITY, dataService } from '@/service';
import { Form, Input, notification, Skeleton } from 'antd';
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

      response?.data &&
        typeof response?.data === 'object' &&
        !Array.isArray(response?.data) &&
        Object.keys(response?.data)?.length > 0 &&
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
      const errMsg =
        error?.response?.data?.errors?.code === 'invalid_invoice_credentials'
          ? t('Tên người dùng hoặc mật khẩu không hợp lệ')
          : t('Common_UpdateFailure');
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: errMsg,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '35rem', maxWidth: '100%', margin: 'auto' }}>
      <PageHeader className="invoice-page-header-main" title={t('Common_ConnectTaxAuthorities')} />
      <LayoutContent borderLessHeading cards>
        {loading ? (
          <Skeleton active style={{ marginTop: 30 }} />
        ) : (
          <BasicFormWrapper>
            <Form form={form} onFinish={handleOk} autoComplete="off">
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                label="Tên đăng nhập"
              >
                <Input placeholder="Tên đăng nhập" />
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
                  {t('Common_Update')}
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        )}
      </LayoutContent>
    </div>
  );
}

export default ConnectTaxAuthority;
