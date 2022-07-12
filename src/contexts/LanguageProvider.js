import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const { i18n } = useTranslation()
    const findLanguage = async () => {
        const result = await AsyncStorage.getItem('language')
        console.log(language)
        if (result !== null) setLanguage(JSON.parse(result))
    }

    const changeLanguage = () => {
        i18n.changeLanguage(language)
    }

    useEffect(() => {
        findLanguage()
    });


    useEffect(() => {
        changeLanguage()
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, setLanguage, findLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
export const useLanguage = () => useContext(LanguageContext)


export default LanguageProvider;
