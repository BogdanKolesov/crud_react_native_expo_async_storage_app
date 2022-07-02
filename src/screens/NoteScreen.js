import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
import NoteInputModal from '../components/NoteInputModal';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';

const NoteScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs < 12) return setGreet('Morning')
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon')
        setGreet('Evening')
    }
    const handleOnSubmit = async (title, description) => {
        const note = {
            id: Date.now(),
            title,
            description,
            time: Date.now()
        }
        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        // console.log(notes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes')
        if (result !== null) setNotes(JSON.parse(result))
    }

    useEffect(() => {
        findGreet()
        findNotes()
    }, []);

    const openNote = (note) => {
        navigation.navigate('NoteDetail', { note })
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <ScrollView style={{ heigth: 'auto' }} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                        {
                            notes.length ? <SearchBar containerStyle={{ marginVertical: 15 }} /> : null
                        }
                        <View style={styles.noteView}>
                            {
                                notes.map((item) => (
                                    <View style={styles.noteContainer} key={item.id}>
                                        <Note onPress={() => openNote(item)} item={item} />
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <RoundIconBtn onPress={() => setModalVisible(true)} antIconName='plus' style={styles.addBtn} />
            <NoteInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}
            />

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
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
        bottom: 50,
    },
    noteView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flex: 1
    },
    noteContainer: {
        width: '45%',
        minHeight: 40
    }
})

export default NoteScreen;
