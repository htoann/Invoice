import { API_DEPARTMENTS_ALL } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useGetAllDepartments = () => {
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await dataService.get(API_DEPARTMENTS_ALL);
        setDepartments(response.data);
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

export default useGetAllDepartments;