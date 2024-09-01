import { dataService } from '@/utils/dataService';
import { notification } from 'antd';
import { useState } from 'react';
import { convertKeysToSnakeCase } from '../utils';

export const useList = (state, setState, apiUrl, litsName) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { current, pageSize } = state?.pagination ? state.pagination : state;

  const getList = async (searchParams = {}) => {
    setLoading(true);
    try {
      const response = await dataService.get(apiUrl, {
        page: current,
        page_size: pageSize,
        ...Object.fromEntries(Object.entries(convertKeysToSnakeCase(searchParams)).filter(([, v]) => v)),
      });

      setList(response?.data?.results);
      if (state?.pagination) {
        setState((prev) => ({
          ...prev,
          total: Number(response?.data?.count) || 0,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: Number(response?.data?.count) || 0,
          },
        }));
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: `Không thể tải danh sách ${litsName}. Vui lòng thử lại sau.`,
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
