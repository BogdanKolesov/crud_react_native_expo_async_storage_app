import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';






const LanguageIcon = ({ language }) => {


    const storeLanguage = async (value) => {
        try {
            await AsyncStorage.setItem("language", JSON.stringify(value));
            console.log(value)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity language={language} data='ru' onPress={() => storeLanguage('ru')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    RU
                </Text>
            </TouchableOpacity>
            <TouchableOpacity language={language} data='ua' onPress={() => storeLanguage('ua')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    UA
                </Text>
            </TouchableOpacity>
            <TouchableOpacity language={language} data='en' onPress={() => storeLanguage('en')} style={styles.iconContainer}>
                <Text style={styles.text}>
                    EN
                </Text>
            </TouchableOpacity>
            <TouchableOpacity language={language} data='ge' onPress={() => storeLanguage('ge')} style={styles.iconContainer}>
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
