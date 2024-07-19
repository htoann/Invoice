import axios from '@/mock/index';
import { useEffect, useState } from 'react';

const useDepartments = (selectedBranch) => {
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    setDepartments([]);
    setSelectedDepartment(null);

    if (!selectedBranch) {
      return;
    }

    setLoadingDepartments(true);
    axios
      .get(`/departments/${selectedBranch}`)
      .then((response) => {
        setDepartments(response.data.departments);
        setLoadingDepartments(false);
      })
      .catch(() => {
        setLoadingDepartments(false);
      });
  }, [selectedBranch]);

  return {
    departments,
    setDepartments,
    loadingDepartments,
    setLoadingDepartments,
    selectedDepartment,
    setSelectedDepartment,
  };
};

export default useDepartments;
