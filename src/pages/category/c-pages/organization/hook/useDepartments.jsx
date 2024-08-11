import { apiConst } from '@/utils/apiConst';
import { DataService } from '@/utils/dataService';
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
    DataService.get(`${apiConst.departments}`)
      .then((response) => {
        setDepartments(response.data);
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
