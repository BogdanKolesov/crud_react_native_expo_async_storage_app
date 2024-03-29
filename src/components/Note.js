import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../misc/colors';

const Note = ({ item, onPress }) => {
    const { title, description } = item
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.description} numberOfLines={3}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: '100%',
        minHeight: 40,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.LIGHT
    },
    description: {
        fontSize: 20
    }
})

export default Note;
