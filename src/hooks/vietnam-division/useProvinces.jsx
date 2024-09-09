import { API_PROVINCES, dataService } from '@/service';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

export const useProvinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);

  const getProvinces = async () => {
    try {
      setLoadingProvinces(true);

      const response = await dataService.get(API_PROVINCES);
      const provinces = response?.data;
      setProvinces(provinces);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách tỉnh. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingProvinces(false);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return { provinces, setProvinces, loadingProvinces, setLoadingProvinces };
};
