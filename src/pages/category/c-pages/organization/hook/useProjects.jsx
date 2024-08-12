import { apiConst } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useProjects = (selectedDepartmentId, selectedBranchId) => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const getProjects = async () => {
    setProjects([]);
    if (!selectedDepartmentId) {
      return;
    }

    setLoadingProjects(true);

    try {
      const response = await dataService.get(
        `${apiConst.branches}/${selectedDepartmentId}/${apiConst.departments}/${selectedDepartmentId}/${apiConst.projects}`,
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
