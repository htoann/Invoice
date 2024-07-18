import { AutoComplete, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../components/buttons/buttons';
import { Modal } from '../../../../../components/modals/antd-modals';
import { AddUser } from '../../../../../container/pages/style';
import { BasicFormWrapper } from '../../../../../container/styled';
import { contactAddData } from '../../../../../redux/contact/actionCreator';

function EditHangHoa({ state, setState }) {
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

  const { update } = state;

  const handleEditOk = (values) => {
    onCancel();
    const updateUsers = users;

    updateUsers.map((user) => {
      if (user.id === update.id) {
        const updateUser = user;
        updateUser.id = update.id;
        updateUser.name = values.name;
        updateUser.email = values.email;
        updateUser.phone = values.phone;
        updateUser.designation = values.designation;
        updateUser.company = values.company;
        updateUser.time = update.time;
        updateUser.img = update.img;
        updateUser.stared = update.stared;
      }
      return true;
    });
    dispatch(contactAddData(updateUsers));
    form.resetFields();
  };

  return (
    <div>
      <Modal
        type={state.modalType}
        title="Chỉnh sửa mã hàng"
        open={state.editVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="project-modal">
          <AddUser>
            <BasicFormWrapper>
              <Form form={form} name="contactEdit" onFinish={handleEditOk}>
                <Form.Item
                  initialValue={update.name}
                  label="Mã hàng"
                  name="name"
                  required
                  rules={[{ message: 'Vui lòng nhập mã hàng' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Đơn vị tính" name="email" initialValue={update.email}>
                  <Input />
                </Form.Item>

                <Form.Item initialValue={update.phone} name="phone" label="Tài khoản hàng hoá (15_)">
                  <Input />
                </Form.Item>

                <Form.Item initialValue={update.designation} name="designation" label="Tài khoản giá vốn (63_)">
                  <Input />
                </Form.Item>

                <Form.Item initialValue={update.company} name="company" label="Tài khoản doanh thu (51_)">
                  <Input />
                </Form.Item>

                <Form.Item initialValue={update.company} name="company" label="Tên hàng bán ra">
                  <AutoComplete />
                </Form.Item>

                <Form.Item initialValue={update.company} name="company" label="Tên hàng mua vào">
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
                    onClick={() => {
                      setState({
                        ...state,
                        editVisible: false,
                      });
                    }}
                  >
                    Huỷ bỏ
                  </Button>
                  <Button htmlType="submit" size="default" type="primary" key="submit">
                    Lưu
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

export default EditHangHoa;
