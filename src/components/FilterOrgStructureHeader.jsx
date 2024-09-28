import { FilterOrgStructure } from '@/components/FilterOrgStructure';
import { useAppState } from 'context/AppContext';

export const FilterOrgStructureHeader = ({ handleReset }) => {
  const { setSelectedDepartmentId, setSelectedProjectId, setSelectedAccountId, setSelectedBranchId } = useAppState();

  const changeBranch = (value) => {
    setSelectedBranchId(value);
    setSelectedDepartmentId('');
    setSelectedProjectId('');
    setSelectedAccountId('');
    handleReset();
  };

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

  return (
    <>
      <FilterOrgStructure
        onChangeBranch={changeBranch}
        onChangeDepartment={changeDepartment}
        onChangeProject={changeProject}
      />
    </>
  );
};
