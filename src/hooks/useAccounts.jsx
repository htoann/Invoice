import { DataService } from '@/config/dataService';
import { useEffect, useState } from 'react';

const useAccounts = (onHandleResult, selectedDepartmentId = '') => {
  const [accountList, setAccountList] = useState([]);
  const [loadingUsers, setLoadingUser] = useState(false);

  const getUsers = async ({ departmentId = '' } = {}) => {
    try {
      setLoadingUser(true);
      const response = await DataService.get('/mails/accounts', { department_id: departmentId });
      setAccountList(response?.data?.results);

      response?.data?.results?.length > 0 && onHandleResult && onHandleResult(response?.data?.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    getUsers({ departmentId: selectedDepartmentId });
  }, [selectedDepartmentId]);

  return { accountList, setAccountList, loadingUsers, setLoadingUser };
};

export default useAccounts;
