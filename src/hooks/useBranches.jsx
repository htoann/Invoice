import { API_BRANCHES } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

const useBranches = () => {
  const { branches, setBranches, loadingBranches, setLoadingBranches } = useAppState();

  const getBranches = async () => {
    try {
      setLoadingBranches(true);
      const response = await dataService.get(API_BRANCHES);
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
