import { API_COMMUNES, dataService } from '@/service';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

export const useCommunes = (districtId) => {
  const [communes, setCommunes] = useState([]);
  const [loadingCommunes, setLoadingCommunes] = useState(false);

  const getCommunes = async () => {
    try {
      setLoadingCommunes(true);

      const response = await dataService.get(API_COMMUNES, {
        district_id: districtId,
      });
      const communes = response?.data;
      setCommunes(communes);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách xã. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingCommunes(false);
    }
  };

  useEffect(() => {
    districtId && getCommunes();
  }, [districtId]);

  return { communes, setCommunes, loadingCommunes, setLoadingCommunes };
};
