import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar, Dimensions } from 'react-native';
import colors from '../misc/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RoundIconBtn from './RoundIconBtn';


const Intro = () => {
    const [name, setName] = useState('');
    const handleOnChangeText = (text) => {
        setName(text)
    }
    const handleSubmit = async () => {
        const user = { name: name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
    }

    return (
        <>
            <StatusBar />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>
                    Enter Your Name to Continue
                </Text>
                <TextInput onChangeText={handleOnChangeText} value={name} placeholder='Enter your name' style={styles.textInput} />
                {
                    name.trim().length >= 3 ? <RoundIconBtn onPress={handleSubmit} antIconName='arrowright' /> : null
                }
            </View>
        </>
    );
}
const width = Dimensions.get('window').width - 50

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        width,
        height: 40,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        color: colors.PRIMARY,
        marginBottom: 10
    },
    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
        fontSize: 20
    }
})

export default Intro;
