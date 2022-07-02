import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle }) => {
    return (
        <View >
            <TextInput style={[styles.searchBar, { ...containerStyle }]} placeholder='Search' />
        </View>
    );
}

const styles = StyleSheet.create({

    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    }
})

export default SearchBar;