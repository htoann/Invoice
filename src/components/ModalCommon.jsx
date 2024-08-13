import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { AutoComplete, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const ModalCommon = ({ form, handleOk, state, onCancel, loading, textSubmit, fields }) => {
  const { t } = useTranslation();

  const renderField = (type, key, options) => {
    switch (type) {
      case 'select':
        return (
          <Select defaultValue={state?.update[key] || options[0]}>
            {options.map((option) => (
              <Select.Option key={option} value={option}>
                {t(option.charAt(0).toUpperCase() + option.slice(1))}
              </Select.Option>
            ))}
          </Select>
        );
      case 'date':
        return <DatePicker format="DD/MM/yyyy" />;
      case 'checkbox':
        return <Input type="checkbox" />;
      case 'autocomplete':
        return <AutoComplete />;
      case 'number':
        return <InputNumber stringMode keyboard={false} />;
      case 'input':
      default:
        return <Input />;
    }
  };

  return (
    <BasicFormWrapper>
      <Form form={form} name="contactEdit" onFinish={handleOk} autoComplete="off">
        {fields.map(({ name, label, type, options, required }) => (
          <Form.Item
            key={name}
            initialValue={state?.update[name]}
            label={t(label)}
            name={name}
            valuePropName={type === 'checkbox' ? 'checked' : 'value'}
            rules={required ? [{ required: true, message: t('Common_Input_Required') }] : []}
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
