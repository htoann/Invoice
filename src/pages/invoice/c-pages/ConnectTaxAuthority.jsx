import Alert from '@/components/alerts/alerts';
import { Button } from '@/components/buttons';
import { WarningModal } from '@/components/modals/ModalAlert';
import { PageHeader } from '@/components/page-headers';
import { BasicFormWrapper } from '@/container/styled';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_INVOICES_CONNECT_AUTHORITY, dataService } from '@/service';
import { Form, Input, notification, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EStatusTax, statusIconMap, statusTextMap, statusTypeMap } from '../utils';

function ConnectTaxAuthority() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isCreate, setIsCreate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [showWarningUpdate, setShowWarningUpdate] = useState(false);
  const [showWarningCreate, setShowWarningCreate] = useState(false);

  const alertType = statusTypeMap[status] || 'info';
  const alertMessage = statusTextMap[status] || '';
  const alertIcon = statusIconMap[status] || null;

  const intervalRef = useRef(null);

  useEffect(() => {
    (!showWarningCreate || !showWarningUpdate) && setSaving(false);
  }, [showWarningUpdate, showWarningCreate]);

  useEffect(() => {
    const fetchStatus = async () => {
      await getStatus();
    };

    intervalRef.current = setInterval(fetchStatus, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const getStatus = async () => {
    try {
      const response = await dataService.get(API_INVOICES_CONNECT_AUTHORITY);
      setStatus(response?.data?.status);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Invoice_GetTaxConnectFailure'),
      });
    }
  };

  const getList = async () => {
    setLoading(true);
    try {
      const response = await dataService.get(API_INVOICES_CONNECT_AUTHORITY);
      const { status, ...fields } = response?.data || {};

      setStatus(status);
      fields && Object.keys(fields)?.length > 0 && form.setFieldsValue(fields);

      setIsCreate(!response?.data?.username);
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

  const handleOk = async () => {
    const values = form.getFieldsValue();

    setSaving(true);
    setStatus(EStatusTax.Waiting);

    try {
      const response = await dataService.post(API_INVOICES_CONNECT_AUTHORITY, { ...values });
      const { status, ...fields } = response?.data || {};

      form.setFieldsValue(fields);

      setIsCreate(!response?.data?.username);

      notification.success({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Common_UpdateSuccess'),
      });

      if (status === EStatusTax.Success || status === EStatusTax.Failure) {
        clearInterval(intervalRef.current);
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.errors?.code === 'invalid_invoice_credentials'
          ? t('Tên đăng nhập hoặc mật khẩu không hợp lệ')
          : t('Common_UpdateFailure');

      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: errMsg,
      });
    } finally {
      setSaving(false);
      setShowWarningUpdate(false);
      setShowWarningCreate(false);
    }
  };

  const renderAlert = () =>
    status ? (
      <div style={{ marginBottom: 15 }}>
        <Alert
          message={alertMessage}
          type={alertType}
          description={status === EStatusTax.Failure ? 'Kiểm tra thông tin đăng nhập' : undefined}
          showIcon
          icon={alertIcon}
        />
      </div>
    ) : null;

  return (
    <div style={{ width: '35rem', maxWidth: '100%', margin: 'auto' }}>
      <PageHeader className="invoice-page-header-main" title={t('Common_ConnectTaxAuthorities')} />
      <LayoutContent borderLessHeading cards>
        {loading ? (
          <Skeleton active style={{ marginTop: 30 }} />
        ) : (
          <BasicFormWrapper>
            {renderAlert()}
            <Form
              form={form}
              onFinish={() => {
                if (isCreate) {
                  setShowWarningCreate(true);
                } else {
                  setShowWarningUpdate(true);
                }
              }}
              autoComplete="off"
            >
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
                <Button htmlType="submit" size="default" type="primary">
                  {isCreate ? t('Common_Save') : t('Common_Update')}
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        )}
      </LayoutContent>

      <WarningModal
        open={showWarningUpdate}
        setOpen={setShowWarningUpdate}
        onConfirm={handleOk}
        loading={saving}
        description="Nếu thay đổi thông tin đăng nhập, hệ thống sẽ tiến hành đồng bộ lại dữ liệu hoá đơn. Bạn có muốn tiếp tục?"
      />

      <WarningModal
        open={showWarningCreate}
        setOpen={setShowWarningCreate}
        onConfirm={handleOk}
        loading={saving}
        description="Hệ thống sẽ tiến hành đồng bộ dữ liệu hoá đơn lần đầu. Bạn có muốn tiếp tục?"
      />
    </div>
  );
}

export default ConnectTaxAuthority;
