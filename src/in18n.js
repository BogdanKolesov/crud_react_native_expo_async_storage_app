// import i18n from "i18next"
// import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import en from './languages/eng.json'
import ge from './languages/ger.json'
import ua from './languages/ua.json'
import ru from './languages/ru.json'

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        ge: ge,
        ua: ua,
        ru: ru
    },
    react: {
        useSuspense: false,
    }
})

export default i18next