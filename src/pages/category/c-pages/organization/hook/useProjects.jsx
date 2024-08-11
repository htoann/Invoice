import { apiConst } from '@/utils/apiConst';
import { DataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useProjects = (selectedDepartment, selectedBranch) => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    setProjects([]);

    if (!selectedDepartment) {
      return;
    }

    setLoadingProjects(true);

    DataService.get(`${apiConst.projects}${selectedDepartment}`)
      .then((response) => {
        setProjects(response.data);
        setLoadingProjects(false);
      })
      .catch(() => {
        setLoadingProjects(false);
      });
  }, [selectedDepartment, selectedBranch]);

  return { projects, setProjects, loadingProjects, setLoadingProjects };
};

export default useProjects;
