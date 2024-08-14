import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { AutoComplete, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const ModalCommon = ({
  form,
  handleOk,
  dataUpdate = {},
  onCancel,
  loading,
  textSubmit,
  fields,
  onValuesChange,
  size = 'default',
}) => {
  const { t } = useTranslation();

  const renderField = (type, key, options = []) => {
    switch (type) {
      case 'select':
        return (
          <Select defaultValue={dataUpdate?.[key] || options?.[0]?.id}>
            {options?.map((option, index) => (
              <Select.Option key={index} value={option.id}>
                {t(option.name)}
              </Select.Option>
            ))}
          </Select>
        );
      case 'date':
        return <DatePicker format="DD/MM/yyyy" />;
      case 'checkbox':
        return <Checkbox />;
      case 'autocomplete':
        return <AutoComplete />;
      case 'email':
        return <Input type="email" />;
      case 'number':
        return <InputNumber />;
      case 'input':
      default:
        return <Input />;
    }
  };

  const getRules = (type, required) => {
    const rules = [];

    if (required) {
      rules.push({ required: true, message: t('Common_Input_Required') });
    }

    if (type === 'email') {
      rules.push({ type: 'email', message: t('Common_Invalid_Email') });
    }

    return rules;
  };

  return (
    <BasicFormWrapper>
      <Form form={form} name="contactEdit" onFinish={handleOk} autoComplete="off" onValuesChange={onValuesChange}>
        <Row gutter={size === 'large' ? 24 : 0}>
          {fields.map(({ name, label, type, options, required }) => (
            <Col span={size === 'large' ? 12 : 24} key={name}>
              <Form.Item
                initialValue={dataUpdate?.[name]}
                label={t(label)}
                name={name}
                valuePropName={type === 'checkbox' ? 'checked' : 'value'}
                rules={getRules(type, required)}
                style={{ marginBottom: 14 }}
              >
                {renderField(type, name, options)}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
            {t('Common_Cancel')}
          </Button>
          <Button type="primary" htmlType="submit" size="default" key="submit" loading={loading}>
            {textSubmit}
          </Button>
        </div>
      </Form>
    </BasicFormWrapper>
  );
};
