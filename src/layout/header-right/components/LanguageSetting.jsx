import EngImg from '@/static/img/flag/en.png';
import VieImg from '@/static/img/flag/vi.png';
import { setLocalStorage } from '@/utils/localStorage';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavAuth } from '../style';

export const LanguageSetting = ({ setState }) => {
  const { t, i18n } = useTranslation();

  const onFlagChangeHandle = (value, e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      flag: value,
    }));
    i18n.changeLanguage(value);
    setLocalStorage('lang', value);
  };

  return (
    <NavAuth>
      <Link onClick={(e) => onFlagChangeHandle('vi', e)} style={{ marginBottom: 5, borderRadius: 5 }}>
        <img width="20" src={VieImg} alt="" />
        <span>{t('Language_Vietnamese')}</span>
      </Link>
      <Link onClick={(e) => onFlagChangeHandle('en', e)} style={{ borderRadius: 5 }}>
        <img src={EngImg} alt="" />
        <span>{t('Language_English')}</span>
      </Link>
    </NavAuth>
  );
};
