import { API_DEPARTMENTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

const useGetAllDepartments = () => {
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await dataService.get(API_DEPARTMENTS);
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

    getDepartments();
  }, []);

  return { loadingDepartments, setLoadingDepartments, departments, setDepartments };
};

export default useGetAllDepartments;
