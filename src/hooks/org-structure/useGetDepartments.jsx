import { API_DEPARTMENTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useEffect, useState } from 'react';

export const useGetDepartments = (selectedBranchId) => {
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
      const response = await dataService.get(API_DEPARTMENTS, { branch: selectedBranchId });
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
    selectedBranchId && getDepartments();
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
