import { API_COMMUNES } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useCommunes = (districtId) => {
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
    } finally {
      setLoadingCommunes(false);
    }
  };

  useEffect(() => {
    getCommunes();
  }, []);

  return { communes, setCommunes, loadingCommunes, setLoadingCommunes };
};

export default useCommunes;
