import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../contexts/LanguageProvider';
// import i18n from '../in18n'




const LanguageIcon = () => {

    const { language, setLanguage, findLanguage } = useLanguage()

    const changeLanguage = async (lang) => {
        // const lang = 'en'
        const updatedLanguage = lang
        setLanguage(updatedLanguage)
        // console.log(lang);
        await AsyncStorage.setItem('language', JSON.stringify(updatedLanguage))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity data='ru' onPress={() => changeLanguage('ru')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    RU
                </Text>
            </TouchableOpacity>
            <TouchableOpacity data='ua' onPress={() => changeLanguage('ua')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    UA
                </Text>
            </TouchableOpacity>
            <TouchableOpacity data='en' onPress={() => changeLanguage('en')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    EN
                </Text>
            </TouchableOpacity>
            <TouchableOpacity data='ge' onPress={() => changeLanguage('ge')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    GE
                </Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.DARK,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 20,
        opacity: 0.5
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    }
})

export default LanguageIcon;
