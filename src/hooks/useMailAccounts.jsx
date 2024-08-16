import { API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { useEffect, useState } from 'react';

const useMailAccounts = (onHandleResult, selectedDepartmentId = '') => {
  const [mailAccountList, setMailAccountList] = useState([]);
  const [loadingMailAccounts, setLoadingMailAccounts] = useState(false);

  const getMailAccounts = async ({ departmentId = '' } = {}) => {
    try {
      setLoadingMailAccounts(true);

      const response = await dataService.get(API_MAILS_ACCOUNTS, { department_id: departmentId });
      const mailAccounts = response?.data?.results;
      setMailAccountList(mailAccounts);

      mailAccounts?.length > 0 && onHandleResult && onHandleResult(mailAccounts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMailAccounts(false);
    }
  };

  useEffect(() => {
    getMailAccounts({ departmentId: selectedDepartmentId });
  }, [selectedDepartmentId]);

  return { mailAccountList, setMailAccountList, loadingMailAccounts, setLoadingMailAccounts };
};

export default useMailAccounts;
