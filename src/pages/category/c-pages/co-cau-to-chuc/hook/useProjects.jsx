import axios from '@/mock/index';
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
    axios
      .get(`/projects/${selectedDepartment}`)
      .then((response) => {
        setProjects(response.data.projects);
        setLoadingProjects(false);
      })
      .catch(() => {
        setLoadingProjects(false);
      });
  }, [selectedDepartment, selectedBranch]);

  return { projects, setProjects, loadingProjects, setLoadingProjects };
};

export default useProjects;
