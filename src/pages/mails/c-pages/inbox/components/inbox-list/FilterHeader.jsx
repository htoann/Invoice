import { FilterOrgStructure } from '@/components/FilterOrgStructure';
import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useAppState } from 'context/AppContext';
import { useTranslation } from 'react-i18next';

export const FilterHeader = ({ handleReset, loadingMailAccounts, mailAccountList }) => {
  const { t } = useTranslation();

  const { setSelectedDepartmentId, setSelectedProjectId, setSelectedAccountId, selectedAccountId } = useAppState();

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
        onChangeProject={changeProject}
        moreElements={
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
            <span className="label">{t('Common_Account')}</span>
            <Select
              popupClassName="dropdown-select"
              style={{ width: 300, marginTop: 10 }}
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
          </div>
        }
      />
    </>
  );
};
