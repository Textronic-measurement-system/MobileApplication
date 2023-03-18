import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

import TranslationPL from './pl/translation.json';
import TranslationEN from './en/translation.json';

const resources = {
    en: {
        translation: TranslationEN,
    },
    pl: {
        translation: TranslationPL,
    },
};

i18n.use(RNLanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        compatibilityJSON: 'v3',
        fallbackLng: 'pl',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
