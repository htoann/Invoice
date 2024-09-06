import { FilterOrgStructure } from '@/components/FilterOrgStructure';
import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useAppState } from 'context/AppContext';
import { useTranslation } from 'react-i18next';

export const FilterHeader = ({ handleReset, loadingMailAccounts, mailAccountList }) => {
  const { t } = useTranslation();

  const {
    selectedDepartmentId,
    setSelectedDepartmentId,
    selectedProjectId,
    setSelectedProjectId,
    setSelectedAccountId,
    selectedAccountId,
  } = useAppState();

  const changeDepartment = (value) => {
    setSelectedDepartmentId(value);
    setSelectedProjectId('');
    setSelectedAccountId('');
    handleReset();
  };

  const changeProject = (value) => {
    setSelectedProjectId(value);
    setSelectedAccountId('');
    handleReset();
  };

  const accountOptions = createOptions(mailAccountList, 'email', false);

  return (
    <>
      <FilterOrgStructure
        onChangeDepartment={changeDepartment}
        onChange={changeProject}
        departmentId={selectedDepartmentId}
        projectId={selectedProjectId}
        moreElements={
          <>
            <span className="label" style={{ marginLeft: 30 }}>
              {t('Common_Account')}
            </span>
            <Select
              popupClassName="dropdown-select"
              style={{ width: 300, marginLeft: 10 }}
              placeholder={t('Common_SelectAccount')}
              onChange={(value) => {
                setSelectedAccountId(value);
                handleReset();
              }}
              loading={loadingMailAccounts}
              disabled={loadingMailAccounts}
              value={selectedAccountId}
              options={accountOptions}
              key={selectedAccountId}
            />
          </>
        }
      />
    </>
  );
};
