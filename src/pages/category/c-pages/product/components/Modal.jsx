import { Button } from '@/components/buttons/buttons';
import { AddUser } from '@/container/pages/style';
import { BasicFormWrapper } from '@/container/styled';
import { AutoComplete, Form, Input } from 'antd';

const ModalHangHoa = ({ form, handleOk, state, onCancel, loading, textSubmit = 'Lưu' }) => {
  return (
    <AddUser>
      <BasicFormWrapper>
        <Form form={form} name="contactEdit" onFinish={handleOk}>
          <Form.Item
            initialValue={state?.update.mahang}
            label="Mã hàng"
            name="mahang"
            required
            rules={[{ message: 'Vui lòng nhập mã hàng' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Đơn vị tính" name="donViTinh" initialValue={state?.update.donViTinh}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={state?.update.taiKhoanHang} name="taiKhoanHang" label="Tài khoản hàng hoá (15_)">
            <Input />
          </Form.Item>

          <Form.Item initialValue={state?.update.taiKhoanGiaVon} name="taiKhoanGiaVon" label="Tài khoản giá vốn (63_)">
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={state?.update.taiKhoanDoanhThu}
            name="taiKhoanDoanhThu"
            label="Tài khoản doanh thu (51_)"
          >
            <Input />
          </Form.Item>

          <Form.Item initialValue={state?.update.tenHangBan} name="tenHangBan" label="Tên hàng bán ra">
            <AutoComplete />
          </Form.Item>

          <Form.Item initialValue={state?.update.tenHangMua} name="tenHangMua" label="Tên hàng mua vào">
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
              Huỷ bỏ
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
