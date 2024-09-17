import { createOptions } from '@/utils/index';
import { Select } from 'antd';
import { useAppState } from 'context/AppContext';
import { useTranslation } from 'react-i18next';

export const FilterOrgStructure = ({
  onChangeBranch,
  onChangeDepartment,
  onChangeProject,
  branchId,
  departmentId,
  projectId,
  mode = 'horizontal',
  needTakeDefaultValue,
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

  const defaultBranchId = needTakeDefaultValue ? branchId : branchId || selectedBranchId;
  const defaultDepartmentId = needTakeDefaultValue ? departmentId : departmentId || selectedDepartmentId;
  const defaultProjectId = needTakeDefaultValue ? projectId : projectId || selectedProjectId;

  const isHorizontal = mode === 'horizontal';

  const containerStyles = {
    display: 'flex',
    gap: isHorizontal ? 30 : 10,
    alignItems: 'center',
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: isHorizontal ? 'wrap' : 'nowrap',
  };

  const itemContainerStyles = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: 'center',
    marginBottom: isHorizontal ? 0 : 10,
  };

  const labelStyles = {
    marginRight: isHorizontal ? 10 : 0,
  };

  const selectStyles = {
    width: 200,
    marginTop: isHorizontal ? 0 : 10,
  };

  return (
    <div style={containerStyles}>
      <div style={itemContainerStyles}>
        <span className="label" style={labelStyles}>
          {t('Common_Branch')}
        </span>
        <Select
          popupClassName="dropdown-select"
          style={selectStyles}
          loading={loadingBranches}
          disabled={loadingBranches}
          onChange={onChangeBranch}
          value={defaultBranchId}
          options={branchOptions}
        />
      </div>

      <div style={itemContainerStyles}>
        <span className="label" style={labelStyles}>
          {t('Common_Department')}
        </span>
        <Select
          popupClassName="dropdown-select"
          style={selectStyles}
          loading={loadingDepartments}
          disabled={loadingDepartments || !defaultBranchId}
          onChange={onChangeDepartment}
          value={defaultDepartmentId}
          options={departmentOptions}
        />
      </div>

      <div style={itemContainerStyles}>
        <span className="label" style={labelStyles}>
          {t('Common_Project')}
        </span>
        <Select
          popupClassName="dropdown-select"
          style={selectStyles}
          loading={loadingProjects}
          disabled={loadingProjects || !defaultDepartmentId}
          onChange={onChangeProject}
          value={defaultProjectId}
          options={projectOptions}
        />
      </div>
    </div>
  );
};
