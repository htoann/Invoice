import { apiConst } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useDepartments = (selectedBranchId) => {
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const getDepartments = async () => {
    setDepartments([]);
    setSelectedDepartmentId(null);

    if (!selectedBranchId) {
      setLoadingDepartments(false);
      return;
    }

    setLoadingDepartments(true);

    try {
      const response = await dataService.get(`${apiConst.orgsBranches}${selectedBranchId}${apiConst.orgsDepartments}`);
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDepartments(false);
    }
  };

  useEffect(() => {
    getDepartments();
  }, [selectedBranchId]);

  return {
    departments,
    setDepartments,
    loadingDepartments,
    setLoadingDepartments,
    selectedDepartmentId,
    setSelectedDepartmentId,
    getDepartments,
  };
};

export default useDepartments;
