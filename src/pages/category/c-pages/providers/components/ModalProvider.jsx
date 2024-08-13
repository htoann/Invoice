import { Button } from '@/components/buttons/buttons';
import { BasicFormWrapper } from '@/container/styled';
import { AutoComplete, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const fields = [
  { key: 'code', label: 'Provider_Code', type: 'input' },
  { key: 'name', label: 'Provider_Name', type: 'input' },
  { key: 'address', label: 'Provider_Address', type: 'input' },
  { key: 'tax_code', label: 'Provider_TaxCode', type: 'input' },
  { key: 'phone_number', label: 'Provider_PhoneNumber', type: 'input' },
  { key: 'website', label: 'Provider_Website', type: 'input' },
  { key: 'id_number', label: 'Provider_IDNumber', type: 'input' },
  { key: 'id_issue_day', label: 'Provider_IDIssueDay', type: 'date' },
  { key: 'id_issue_address', label: 'Provider_IDIssueAddress', type: 'input' },
  { key: 'term', label: 'Provider_Term', type: 'input' },
  { key: 'num_of_days_debt', label: 'Provider_NumOfDaysDebt', type: 'input' },
  { key: 'max_debt_amount', label: 'Provider_MaxDebtAmount', type: 'input' },
  { key: 'account_payable', label: 'Provider_AccountPayable', type: 'input' },
  { key: 'employee', label: 'Provider_Employee', type: 'input' },
  { key: 'employee_name', label: 'Provider_EmployeeName', type: 'input' },
  { key: 'bank_account', label: 'Provider_BankAccount', type: 'input' },
  { key: 'bank_name', label: 'Provider_BankName', type: 'input' },
  { key: 'bank_account_branch', label: 'Provider_BankAccountBranch', type: 'input' },
  { key: 'bank_account_city', label: 'Provider_BankAccountCity', type: 'input' },
  { key: 'country', label: 'Provider_Country', type: 'input' },
  { key: 'province', label: 'Provider_Province', type: 'input' },
  { key: 'district', label: 'Provider_District', type: 'input' },
  { key: 'ward', label: 'Provider_Ward', type: 'input' },
  { key: 'contact_person_title', label: 'Provider_ContactPersonTitle', type: 'input' },
  { key: 'contact_person_name', label: 'Provider_ContactPersonName', type: 'input' },
  { key: 'contact_person_phone_number', label: 'Provider_ContactPersonPhoneNumber', type: 'input' },
  { key: 'contact_person_email', label: 'Provider_ContactPersonEmail', type: 'input' },
  { key: 'legal_representative', label: 'Provider_LegalRepresentative', type: 'input' },
  { key: 'delivery_address', label: 'Provider_DeliveryAddress', type: 'input' },
  { key: 'is_individual', label: 'Provider_IsIndividual', type: 'checkbox' },
  { key: 'is_customer', label: 'Provider_IsCustomer', type: 'checkbox' },
  { key: 'status', label: 'Provider_Status', type: 'select', options: ['active', 'inactive'] },
  { key: 'branch', label: 'Provider_Branch', type: 'input' },
];

const ModalProvider = ({ form, handleOk, state, onCancel, loading, textSubmit }) => {
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
        return <Input type="date" />;
      case 'checkbox':
        return <Input type="checkbox" />;
      case 'autocomplete':
        return <AutoComplete />;
      case 'input':
      default:
        return <Input />;
    }
  };

  return (
    <BasicFormWrapper>
      <Form form={form} name="contactEdit" onFinish={handleOk} autoComplete="off">
        {fields.map(({ key, label, type, options }) => (
          <Form.Item
            key={key}
            initialValue={state?.update[key]}
            label={t(label)}
            name={key}
            valuePropName={type === 'checkbox' ? 'checked' : 'value'}
          >
            {renderField(type, key, options)}
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

export default ModalProvider;
