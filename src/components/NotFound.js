import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import colors from '../misc/colors';

const NotFound = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AntDesign name='frowno' size={80} color={colors.DARK} />
            <Text style={styles.text}>Result not found</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1,

    },
    text: {
        marginTop: 20,
        fontSize: 20,
        opacity: 0.6
    }
})

export default NotFound;
