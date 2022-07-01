import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import colors from '../misc/colors';

const NoteScreen = ({ user }) => {
    const [greet, setGreet] = useState('Evening');
    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <View>
                <Text>{`Good ${greet} ${user.name}`}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({})

export default NoteScreen;
