import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundIconBtn = ({ onPress, antIconName, size, color, style }) => {
    return (
        <AntDesign onPress={onPress} style={[styles.icon, { ...style }]} name={antIconName} size={size || 24} color={color || colors.LIGHT} />
    );
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    }
})

export default RoundIconBtn;
