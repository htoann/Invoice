import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: 'vi',
  resources: {
    vi: {
      translations: require('./vi.json'),
    },
    en: {
      translations: require('./en.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['vi', 'en'];

export default i18n;
