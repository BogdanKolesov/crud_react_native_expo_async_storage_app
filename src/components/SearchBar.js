import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../misc/colors';
import { AntDesign } from '@expo/vector-icons'

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
    return (
        <View style={styles.container} >
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={[styles.searchBar, { ...containerStyle }]}
                placeholder='Search'
            />
            {
                value ?
                    <AntDesign
                        name='close'
                        size={20}
                        color={colors.PRIMARY}
                        onPress={onClear}
                        style={styles.clearIcon}
                    />
                    : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    },
    clearIcon: {
        position: 'absolute',
        right: 10,

    }
})

export default SearchBar;
