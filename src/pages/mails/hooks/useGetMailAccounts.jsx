import { API_MAILS_ACCOUNTS, dataService } from '@/service';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useEffect, useState } from 'react';

export const useGetMailAccounts = () => {
  const { selectedBranchId, selectedDepartmentId, selectedProjectId, setSelectedAccountId } = useAppState();

  const [mailAccountList, setMailAccountList] = useState([]);
  const [loadingMailAccounts, setLoadingMailAccounts] = useState(false);

  const getMailAccounts = async () => {
    try {
      setLoadingMailAccounts(true);

      const response = await dataService.get(API_MAILS_ACCOUNTS, {
        ...(selectedBranchId && { branch_id: selectedBranchId }),
        ...(selectedDepartmentId && { department_id: selectedDepartmentId }),
        ...(selectedProjectId && { project_id: selectedProjectId }),
      });

      const mailAccounts = response?.data?.results;

      setMailAccountList(mailAccounts);
      setSelectedAccountId(mailAccounts?.[0]?.id);
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
    getMailAccounts();
  }, [selectedBranchId, selectedDepartmentId, selectedProjectId]);

  return { mailAccountList, setMailAccountList, loadingMailAccounts, setLoadingMailAccounts };
};
