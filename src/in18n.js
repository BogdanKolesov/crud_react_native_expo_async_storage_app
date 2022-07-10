import i18n from "i18next"
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next"

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    backend: { //ns - nameSpace
        loadPath: '/assets/languages/{{ns}}/{{lng}}.json',
    },
    fallbackLng: 'en',
    debug: false,
    ns: ['search', 'hello', 'input'],


    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true,
        useSuspense: false
    },
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de', 'fr'],
    },
})

export default i18n