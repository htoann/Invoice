import { API_PROVINCES } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useProvinces = () => {
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
    } finally {
      setLoadingProvinces(false);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return { provinces, setProvinces, loadingProvinces, setLoadingProvinces };
};

export default useProvinces;