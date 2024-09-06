import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useAppState } from 'context/AppContext';
import { useTranslation } from 'react-i18next';

export const FilterOrgStructure = ({ onChangeDepartment, onChangeProject, departmentId, projectId, moreElements }) => {
  const { t } = useTranslation();

  const { loadingDepartments, departments, projects, loadingProjects } = useAppState();

  const departmentOptions = createOptions(departments, 'name');
  const projectOptions = createOptions(projects, 'name');

  return (
    <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center' }}>
      <span className="label">{t('Common_Department')}</span>
      <Select
        popupClassName="dropdown-select"
        style={{ width: 200, marginLeft: 10 }}
        loading={loadingDepartments}
        disabled={loadingDepartments}
        onChange={onChangeDepartment}
        value={departmentId}
        options={departmentOptions}
      />

      <span className="label" style={{ marginLeft: 30 }}>
        {t('Common_Project')}
      </span>
      <Select
        popupClassName="dropdown-select"
        style={{ width: 200, marginLeft: 10 }}
        loading={loadingProjects}
        disabled={loadingProjects || !departmentId}
        onChange={onChangeProject}
        value={projectId}
        options={projectOptions}
      />

      {moreElements}
    </div>
  );
};
