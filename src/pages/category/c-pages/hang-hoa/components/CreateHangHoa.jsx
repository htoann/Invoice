import { AutoComplete, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../components/buttons/buttons';
import { Modal } from '../../../../../components/modals/antd-modals';
import { AddUser } from '../../../../../container/pages/style';
import { BasicFormWrapper } from '../../../../../container/styled';
import { contactAddData } from '../../../../../redux/contact/actionCreator';

function CreateHangHoa({ state, setState }) {
  const dispatch = useDispatch();
  const { users } = useSelector((stateItem) => {
    return {
      users: stateItem.Contact.data,
    };
  });
  const [form] = Form.useForm();

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = (values) => {
    onCancel();
    const arrayData = [];
    users.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      contactAddData([
        ...users,
        {
          ...values,
          id: max + 1,
        },
      ]),
    );
    form.resetFields();
  };

  return (
    <div>
      <Modal type="primary" title="Thêm mã hàng" visible={state.visible} footer={null} onCancel={handleCancel}>
        <div className="project-modal">
          <AddUser>
            <BasicFormWrapper>
              <Form form={form} name="username" onFinish={handleOk}>
                <Form.Item label="Mã hàng" name="name" required rules={[{ message: 'Vui lòng nhập mã hàng' }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Đơn vị tính" name="email">
                  <Input />
                </Form.Item>

                <Form.Item name="phone" label="Tài khoản hàng hoá (15_)">
                  <Input />
                </Form.Item>

                <Form.Item name="designation" label="Tài khoản giá vốn (63_)">
                  <Input />
                </Form.Item>

                <Form.Item name="company" label="Tài khoản doanh thu (51_)">
                  <Input />
                </Form.Item>

                <Form.Item name="company" label="Tên hàng bán ra">
                  <AutoComplete />
                </Form.Item>

                <Form.Item name="company" label="Tên hàng mua vào">
                  <Input />
                </Form.Item>

                <div style={{ justifyContent: 'end', display: 'flex' }}>
                  <Button
                    size="default"
                    type="white"
                    style={{
                      marginRight: 8,
                    }}
                    outlined
                    onClick={() => {
                      setState({
                        ...state,
                        visible: false,
                      });
                    }}
                  >
                    Huỷ bỏ
                  </Button>
                  <Button htmlType="submit" size="default" type="primary" key="submit">
                    Tạo
                  </Button>
                </div>
              </Form>
            </BasicFormWrapper>
          </AddUser>
        </div>
      </Modal>
    </div>
  );
}

export default CreateHangHoa;
