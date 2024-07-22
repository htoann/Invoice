import { useTranslation } from 'react-i18next';

const useUnit = () => {
  const { t } = useTranslation();

  const unitOptions = [
    { value: 'cai', label: t('Unit_Piece') },
    { value: 'kilogram', label: t('Unit_Kilogram') },
    { value: 'met', label: t('Unit_Meter') },
    { value: 'lit', label: t('Unit_Liter') },
    { value: 'hop', label: t('Unit_Box') },
    { value: 'goi', label: t('Unit_Pack') },
  ];

  const EUnit = {
    cai: t('Unit_Piece'),
    kilogram: t('Unit_Kilogram'),
    met: t('Unit_Meter'),
    lit: t('Unit_Liter'),
    hop: t('Unit_Box'),
    goi: t('Unit_Pack'),
  };

  return { unitOptions, EUnit };
};

export default useUnit;
