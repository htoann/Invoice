import { API_DISTRICTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useDistricts = (provinceId) => {
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
    } finally {
      setLoadingDistricts(false);
    }
  };

  useEffect(() => {
    provinceId && getDistricts();
  }, [provinceId]);

  return { districts, setDistricts, loadingDistricts, setLoadingDistricts };
};

export default useDistricts;
