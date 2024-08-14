import useBranches from '@/pages/category/c-pages/organization/hook/useBranches';
import { useEffect, useState } from 'react';
import useCommunes from './useCommunes';
import useDistricts from './useDistricts';
import useProvinces from './useProvinces';

const useDivision = () => {
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');

  const { branches } = useBranches();
  const { provinces } = useProvinces();
  const { districts } = useDistricts(provinceId);
  const { communes } = useCommunes(districtId);

  useEffect(() => {
    setDistrictId('');
  }, [provinceId]);

  return { branches, provinces, districts, communes, setProvinceId, setDistrictId };
};

export default useDivision;
