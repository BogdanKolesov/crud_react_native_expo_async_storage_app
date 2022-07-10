import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const findLanguage = async () => {
        const result = await AsyncStorage.getItem('language')
        if (result !== null) setLanguage(JSON.parse(result))
    }

    useEffect(() => {
        findLanguage()
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, findLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
export const useLanguage = () => useContext(LanguageContext)


export default LanguageProvider;
