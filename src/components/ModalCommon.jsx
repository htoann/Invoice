import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { AutoComplete, Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const ModalCommon = ({ form, handleOk, state, onCancel, loading, textSubmit, fields, onValuesChange }) => {
  const { t } = useTranslation();

  const renderField = (type, key, options = []) => {
    switch (type) {
      case 'select':
        return (
          <Select defaultValue={state?.update?.[key] || options?.[0]?.key}>
            {options?.map((option, index) => (
              <Select.Option key={index} value={option.key}>
                {t(option.label)}
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
        {fields.map(({ name, label, type, options, required, min, max }) => (
          <Form.Item
            key={name}
            initialValue={state?.update[name]}
            label={t(label)}
            name={name}
            valuePropName={type === 'checkbox' ? 'checked' : 'value'}
            rules={getRules(type, required, min, max)}
          >
            {renderField(type, name, options)}
          </Form.Item>
        ))}

        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
            {t('Common_Cancel')}
          </Button>
          <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
            {textSubmit}
          </Button>
        </div>
      </Form>
    </BasicFormWrapper>
  );
};
