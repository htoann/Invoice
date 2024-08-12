import { apiConst } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  const getBranches = async () => {
    try {
      setLoadingBranches(true);
      const response = await dataService.get(`${apiConst.branches}/`);
      setBranches(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  return { branches, setBranches, loadingBranches, setLoadingBranches, getBranches };
};

export default useBranches;
