import { API_PROVIDERS } from '@/utils/apiConst';
import { dataService } from '@/utils/dataService';
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

      const response = await dataService.get(API_PROVIDERS, {
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
