import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useAppState } from 'context/AppContext';
import { useTranslation } from 'react-i18next';

export const FilterOrgStructure = ({
  onChangeBranch,
  onChangeDepartment,
  onChangeProject,
  moreElements,
  branchId,
  departmentId,
  projectId,
}) => {
  const { t } = useTranslation();

  const {
    loadingBranches,
    branches,
    loadingDepartments,
    departments,
    projects,
    loadingProjects,
    selectedBranchId,
    selectedDepartmentId,
    selectedProjectId,
  } = useAppState();

  const branchOptions = createOptions(branches, 'name');
  const departmentOptions = createOptions(departments, 'name');
  const projectOptions = createOptions(projects, 'name');

  const defaultBranchId = branchId || selectedBranchId;
  const defaultDepartmentId = departmentId || selectedDepartmentId;
  const defaultProjectId = projectId || selectedProjectId;

  return (
    <div style={{ display: 'flex', gap: 2, flexWrap: 'auto', alignItems: 'center' }}>
      <span className="label">{t('Common_Branch')}</span>
      <Select
        popupClassName="dropdown-select"
        style={{ width: 200, marginLeft: 10 }}
        loading={loadingBranches}
        disabled={loadingBranches}
        onChange={onChangeBranch}
        value={defaultBranchId}
        options={branchOptions}
      />

      <span className="label">{t('Common_Department')}</span>
      <Select
        popupClassName="dropdown-select"
        style={{ width: 200, marginLeft: 10 }}
        loading={loadingDepartments}
        disabled={loadingDepartments}
        onChange={onChangeDepartment}
        value={defaultDepartmentId}
        options={departmentOptions}
      />

      <span className="label" style={{ marginLeft: 30 }}>
        {t('Common_Project')}
      </span>
      <Select
        popupClassName="dropdown-select"
        style={{ width: 200, marginLeft: 10 }}
        loading={loadingProjects}
        disabled={loadingProjects || !selectedDepartmentId}
        onChange={onChangeProject}
        value={defaultProjectId}
        options={projectOptions}
      />

      {moreElements}
    </div>
  );
};
