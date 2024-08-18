import { API_DEPARTMENTS_BY_BRANCH } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useEffect, useState } from 'react';

const useDepartments = (selectedBranchId) => {
  const { departments, setDepartments, loadingDepartments, setLoadingDepartments } = useAppState();
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
      const response = await dataService.get(API_DEPARTMENTS_BY_BRANCH(selectedBranchId));
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách phòng ban. Vui lòng thử lại sau.',
      });
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
