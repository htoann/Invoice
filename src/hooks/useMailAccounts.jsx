import { API_MAILS_ACCOUNTS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
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
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách tài khoản. Vui lòng thử lại sau.',
      });
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
