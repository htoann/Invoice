import { FilterOrgStructure } from '@/components/FilterOrgStructure';
import { useAppState } from 'context/AppContext';

export const FilterHeader = ({ handleReset }) => {
  const { setSelectedDepartmentId, setSelectedProjectId, setSelectedAccountId } = useAppState();

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
      <FilterOrgStructure onChangeDepartment={changeDepartment} onChangeProject={changeProject} />
    </>
  );
};
