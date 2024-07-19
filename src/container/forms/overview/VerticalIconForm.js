import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilLock from '@iconscout/react-unicons/icons/uil-lock';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import { Button, Form, Input } from 'antd';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { VerticalFormStyleWrap } from './Style';

function VerticalIconForm() {
  return (
    <BasicFormWrapper>
      <VerticalFormStyleWrap>
        <Cards title="Vertical Form With Icons">
          <Form name="login" layout="vertical">
            <Form.Item name="name" initialValue="Duran Clayton" label="Name">
              <Input prefix={<UilUser />} />
            </Form.Item>
            <Form.Item name="email" initialValue="username@email.com" label="Email Address">
              <Input prefix={<UilEnvelope />} placeholder="Enter Email" />
            </Form.Item>
            <Form.Item name="password" initialValue="1234567" label="Password">
              <Input.Password prefix={<UilLock />} />
            </Form.Item>
            <div className="invoice-form-action">
              <Button className="btn-signIn" htmlType="submit" type="light" size="large">
                Cancel
              </Button>
              <Button className="btn-signIn" type="primary" size="large">
                Save
              </Button>
            </div>
          </Form>
        </Cards>
      </VerticalFormStyleWrap>
    </BasicFormWrapper>
  );
}

export { VerticalIconForm };
