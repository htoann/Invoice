import { API_PROJECTS_BY_BRANCH_AND_DEPARTMENT } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

const useProjects = (selectedBranchId, selectedDepartmentId) => {
  const { projects, setProjects, loadingProjects, setLoadingProjects } = useAppState();

  const getProjects = async () => {
    setProjects([]);
    if (!selectedDepartmentId) {
      return;
    }

    setLoadingProjects(true);

    try {
      const response = await dataService.get(
        API_PROJECTS_BY_BRANCH_AND_DEPARTMENT(selectedBranchId, selectedDepartmentId),
      );
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [selectedDepartmentId, selectedBranchId]);

  return { projects, setProjects, loadingProjects, setLoadingProjects, getProjects };
};

export default useProjects;
