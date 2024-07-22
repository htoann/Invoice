import axios from '@/mock/index';
import { useEffect, useState } from 'react';

const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  useEffect(() => {
    const getBranches = async () => {
      try {
        setLoadingBranches(true);
        const response = await axios.get('/branches');
        setBranches(response.data.branches);
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
