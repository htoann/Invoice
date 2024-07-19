import { Button } from '@/components/buttons/buttons';
import { AddUser } from '@/container/pages/style';
import { BasicFormWrapper } from '@/container/styled';
import { AutoComplete, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const ModalHangHoa = ({ form, handleOk, state, onCancel, loading, textSubmit }) => {
  const { t } = useTranslation();

  return (
    <AddUser>
      <BasicFormWrapper>
        <Form form={form} name="contactEdit" onFinish={handleOk}>
          <Form.Item
            initialValue={state?.update.mahang}
            label={t('Product_Code')}
            name="mahang"
            required
            rules={[{ message: t('Product_RequiredCode') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={t('Product_Unit')} name="donViTinh" initialValue={state?.update.donViTinh}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={state?.update.taiKhoanHang} name="taiKhoanHang" label={t('Product_AccountGoods')}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={state?.update.taiKhoanGiaVon} name="taiKhoanGiaVon" label={t('Product_AccountCost')}>
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={state?.update.taiKhoanDoanhThu}
            name="taiKhoanDoanhThu"
            label={t('Product_AccountRevenue')}
          >
            <Input />
          </Form.Item>

          <Form.Item initialValue={state?.update.tenHangBan} name="tenHangBan" label={t('Product_SellingName')}>
            <AutoComplete />
          </Form.Item>

          <Form.Item initialValue={state?.update.tenHangMua} name="tenHangMua" label={t('Product_PurchasingName')}>
            <Input />
          </Form.Item>

          <div style={{ justifyContent: 'end', display: 'flex' }}>
            <Button
              size="default"
              type="white"
              outlined
              style={{
                marginRight: 8,
              }}
              onClick={onCancel}
            >
              {t('Common_Cancel')}
            </Button>
            <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
              {textSubmit}
            </Button>
          </div>
        </Form>
      </BasicFormWrapper>
    </AddUser>
  );
};

export default ModalHangHoa;
