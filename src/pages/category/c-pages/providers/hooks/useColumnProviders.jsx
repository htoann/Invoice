import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useColumnProviders = () => {
  const { t } = useTranslation();

  const columnData = useMemo(
    () => [
      { title: 'Common_STT', dataIndex: 'stt', key: 'stt' },
      { title: 'Provider_Code', dataIndex: 'code', key: 'code' },
      { title: 'Provider_Name', dataIndex: 'name', key: 'name' },
      { title: 'Provider_Address', dataIndex: 'address', key: 'address' },
      { title: 'Common_Note', dataIndex: 'note', key: 'note' },
      { title: 'Provider_TaxCode', dataIndex: 'tax_code', key: 'tax_code' },
      { title: 'Provider_PhoneNumber', dataIndex: 'phone_number', key: 'phone_number' },
      { title: 'Provider_Website', dataIndex: 'website', key: 'website' },
      { title: 'Provider_IDNumber', dataIndex: 'id_number', key: 'id_number' },
      { title: 'Provider_IDIssueDay', dataIndex: 'id_issue_day', key: 'id_issue_day' },
      { title: 'Provider_IDIssueAddress', dataIndex: 'id_issue_address', key: 'id_issue_address' },
      { title: 'Provider_Term', dataIndex: 'term', key: 'term' },
      { title: 'Provider_NumOfDaysDebt', dataIndex: 'num_of_days_debt', key: 'num_of_days_debt' },
      { title: 'Provider_MaxDebtAmount', dataIndex: 'max_debt_amount', key: 'max_debt_amount' },
      { title: 'Provider_AccountPayable', dataIndex: 'account_payable', key: 'account_payable' },
      { title: 'Provider_Employee', dataIndex: 'employee', key: 'employee' },
      { title: 'Provider_EmployeeName', dataIndex: 'employee_name', key: 'employee_name' },
      { title: 'Provider_BankAccount', dataIndex: 'bank_account', key: 'bank_account' },
      { title: 'Provider_BankName', dataIndex: 'bank_name', key: 'bank_name' },
      { title: 'Provider_BankAccountBranch', dataIndex: 'bank_account_branch', key: 'bank_account_branch' },
      { title: 'Provider_BankAccountCity', dataIndex: 'bank_account_city', key: 'bank_account_city' },
      { title: 'Provider_Country', dataIndex: 'country', key: 'country' },
      { title: 'Provider_Province', dataIndex: 'province', key: 'province' },
      { title: 'Provider_District', dataIndex: 'district', key: 'district' },
      { title: 'Provider_Ward', dataIndex: 'ward', key: 'ward' },
      { title: 'Provider_ContactPersonTitle', dataIndex: 'contact_person_title', key: 'contact_person_title' },
      { title: 'Provider_ContactPersonName', dataIndex: 'contact_person_name', key: 'contact_person_name' },
      {
        title: 'Provider_ContactPersonPhoneNumber',
        dataIndex: 'contact_person_phone_number',
        key: 'contact_person_phone_number',
      },
      { title: 'Provider_ContactPersonEmail', dataIndex: 'contact_person_email', key: 'contact_person_email' },
      { title: 'Provider_LegalRepresentative', dataIndex: 'legal_representative', key: 'legal_representative' },
      { title: 'Provider_DeliveryAddress', dataIndex: 'delivery_address', key: 'delivery_address' },
      { title: 'Provider_IsIndividual', dataIndex: 'is_individual', key: 'is_individual' },
      { title: 'Provider_IsCustomer', dataIndex: 'is_customer', key: 'is_customer' },
      { title: 'Common_Status', dataIndex: 'status', key: 'status' },
      { title: 'Provider_CreatedAt', dataIndex: 'created_at', key: 'created_at' },
      { title: 'Provider_UpdatedAt', dataIndex: 'updated_at', key: 'updated_at' },
      { title: 'Common_Branch', dataIndex: 'branch', key: 'branch' },
      { title: 'Common_Action', dataIndex: 'action', key: 'action', fixed: 'right' },
    ],
    [t],
  );

  return columnData;
};

export default useColumnProviders;
