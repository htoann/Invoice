import { API_DISTRICTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

export const useDistricts = (provinceId) => {
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const getDistricts = async () => {
    try {
      setLoadingDistricts(true);

      const response = await dataService.get(API_DISTRICTS, { province_id: provinceId });
      const districts = response?.data;
      setDistricts(districts);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách quận. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingDistricts(false);
    }
  };

  useEffect(() => {
    provinceId && getDistricts();
  }, [provinceId]);

  return { districts, setDistricts, loadingDistricts, setLoadingDistricts };
};
