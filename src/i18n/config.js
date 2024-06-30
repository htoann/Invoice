import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: 'vi',
  resources: {
    vi: {
      translations: require('./localization/vi/translation.json'),
    },
    en: {
      translations: require('./localization/en/translation.json'),
    },
    esp: {
      translations: require('./localization/esp/translation.json'),
    },
    ar: {
      translations: require('./localization/ar/translation.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['vi', 'en', 'esp', 'ar'];

export default i18n;
