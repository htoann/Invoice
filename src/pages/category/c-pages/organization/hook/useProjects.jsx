import { API_PROJECTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useProjects = (selectedBranchId, selectedDepartmentId) => {
  const { projects, setProjects, loadingProjects, setLoadingProjects } = useAppState();

  const getProjects = async () => {
    setProjects([]);
    if (!selectedDepartmentId) {
      return;
    }

    setLoadingProjects(true);

    try {
      const response = await dataService.get(API_PROJECTS, {
        branch: selectedBranchId,
        department: selectedDepartmentId,
      });
      setProjects(response.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách dự án. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    selectedDepartmentId && getProjects();
  }, [selectedDepartmentId, selectedBranchId]);

  return { projects, setProjects, loadingProjects, setLoadingProjects, getProjects };
};
