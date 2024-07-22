import { useTranslation } from 'react-i18next';

const useUnit = () => {
  const { t } = useTranslation();

  const unitOptions = [
    { value: 'cai', label: t('Common_UnitPiece') },
    { value: 'kilogram', label: t('Common_UnitKilogram') },
    { value: 'met', label: t('Common_UnitMeter') },
    { value: 'lit', label: t('Common_UnitLiter') },
    { value: 'hop', label: t('Common_UnitBox') },
    { value: 'goi', label: t('Common_UnitPack') },
  ];

  const EUnit = {
    cai: t('Common_UnitPiece'),
    kilogram: t('Common_UnitKilogram'),
    met: t('Common_UnitMeter'),
    lit: t('Common_UnitLiter'),
    hop: t('Common_UnitBox'),
    goi: t('Common_UnitPack'),
  };

  return { unitOptions, EUnit };
};

export default useUnit;
