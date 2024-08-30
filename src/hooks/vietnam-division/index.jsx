import { useEffect, useState } from 'react';
import { useCommunes } from './useCommunes';
import { useDistricts } from './useDistricts';
import { useProvinces } from './useProvinces';

export const useDivision = () => {
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');

  const { provinces } = useProvinces();
  const { districts } = useDistricts(provinceId);
  const { communes } = useCommunes(districtId);

  useEffect(() => {
    setDistrictId('');
  }, [provinceId]);

  return { provinces, districts, communes, setProvinceId, setDistrictId };
};
