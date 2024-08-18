import { API_CUSTOMERS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useState } from 'react';

const useGetCustomers = (onHandleResult) => {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isLoadingGetList, setIsLoadingGetList] = useState(false);

  const getList = async ({
    page = 1,
    page_size = 20,
    searchLoading: isSearchLoading = true,
    searchParams = {},
  } = {}) => {
    try {
      if (isSearchLoading) {
        setSearchLoading(true);
      } else {
        setIsLoadingGetList(true);
      }

      const response = await dataService.get(API_CUSTOMERS, {
        ...(Object.keys(searchParams).length && { ...searchParams }),
        page,
        page_size,
      });

      if (response?.data) {
        setList(response?.data?.results);
        onHandleResult && onHandleResult(response);
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách khách hàng. Vui lòng thử lại sau.',
      });
    } finally {
      if (isSearchLoading) {
        setSearchLoading(false);
      } else {
        setIsLoadingGetList(false);
      }
    }
  };

  return {
    list,
    searchLoading,
    isLoadingGetList,
    getList,
    setList,
  };
};

export default useGetCustomers;
