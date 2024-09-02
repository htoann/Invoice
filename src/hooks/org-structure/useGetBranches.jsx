import { API_BRANCHES } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useGetBranches = () => {
  const { branches, setBranches, loadingBranches, setLoadingBranches } = useAppState();

  const getBranches = async () => {
    try {
      setLoadingBranches(true);
      const response = await dataService.get(API_BRANCHES);
      setBranches(response.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách chi nhánh. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  return { branches, setBranches, loadingBranches, setLoadingBranches, getBranches };
};
