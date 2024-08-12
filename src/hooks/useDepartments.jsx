import { apiConst } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useDepartments = () => {
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await dataService.get(`${apiConst.departments}`);
        setDepartments(response.data.departments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    getDepartments();
  }, []);

  return { loadingDepartments, setLoadingDepartments, departments, setDepartments };
};

export default useDepartments;
