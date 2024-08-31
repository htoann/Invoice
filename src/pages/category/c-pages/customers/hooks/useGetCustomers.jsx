import { API_CUSTOMERS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useState } from 'react';

export const useGetCustomers = (setState) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getList = async ({ page = 1, page_size = 20, searchParams = {} } = {}) => {
    setLoading(true);
    try {
      const response = await dataService.get(API_CUSTOMERS, {
        page,
        page_size,
        // eslint-disable-next-line no-unused-vars
        ...Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v)),
      });

      setList(response?.data?.results);
      setState((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: Number(response?.data?.count) || 0,
        },
      }));
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách khách hàng. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    list,
    loading,
    getList,
    setList,
  };
};
