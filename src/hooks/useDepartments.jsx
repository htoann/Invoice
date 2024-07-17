import { useEffect, useState } from 'react';
import axios from './../mock/index';

const useDepartments = () => {
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await axios.get('/departments');
        setDepartments(response.data.departments);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    getDepartments();
  }, []);

  return { loadingDepartments, departments, setDepartments };
};

export default useDepartments;
