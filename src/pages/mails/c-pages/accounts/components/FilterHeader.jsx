import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const FilterHeader = ({
  departments,
  projects,
  loadingDepartments,
  loadingProjects,
  searchParams,
  handleFilterChange,
}) => {
  const { t } = useTranslation();

  const departmentOptions = createOptions(departments, 'name');
  const projectOptions = createOptions(projects, 'name');

  const handleChangeDepartment = (departmentId) => {
    handleFilterChange('departmentId', departmentId);
    handleFilterChange('projectId', '');
  };

  return (
    <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center', marginBottom: 20 }}>
      <span className="label">{t('Common_SelectDepartment')}</span>
      <Select
        popupClassName="dropdown-select"
        loading={loadingDepartments}
        disabled={loadingDepartments}
        onChange={handleChangeDepartment}
        style={{ width: 200, marginLeft: 10 }}
        value={searchParams.departmentId}
        options={departmentOptions}
      />

      <span className="label" style={{ marginLeft: 30 }}>
        {t('Common_SelectProject')}
      </span>
      <Select
        popupClassName="dropdown-select"
        loading={loadingProjects}
        disabled={loadingProjects || !searchParams.departmentId}
        onChange={(projectId) => handleFilterChange('projectId', projectId)}
        style={{ width: 200, marginLeft: 10 }}
        value={searchParams.projectId}
        options={projectOptions}
      />
    </div>
  );
};
