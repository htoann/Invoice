import { apiConst } from '@/utils/apiConst';
import { DataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  useEffect(() => {
    const getBranches = async () => {
      try {
        setLoadingBranches(true);
        const response = await DataService.get(apiConst.branches);
        setBranches(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingBranches(false);
      }
    };

    getBranches();
  }, []);

  return { branches, setBranches, loadingBranches, setLoadingBranches };
};

export default useBranches;
