import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';

const NoteScreen = ({ user }) => {
    const [greet, setGreet] = useState('');
    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs < 12) return setGreet('Morning')
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon')
        setGreet('Evening')
    }

    useEffect(() => {
        findGreet()
    }, []);
    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <View style={styles.container}>
                <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                <SearchBar containerStyle={{ marginVertical: 15 }} />
                <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}>
                        Add notes
                    </Text>
                    <RoundIconBtn onPress={console.log('open')} antIconName='plus' style={styles.addBtn} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    emptyHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: -1
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.3
    },
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 50
    }
})

export default NoteScreen;
