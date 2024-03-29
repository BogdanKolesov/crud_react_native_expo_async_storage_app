import React, { useState, useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
import NoteInputModal from '../components/NoteInputModal';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';
import LanguageIcon from '../components/LanguageIcon';


const NoteScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { notes, setNotes, findNotes } = useNotes()
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);

    const { t } = useTranslation()

    const reverseData = data => {
        return data.sort((a, b) => {
            const aInt = parseInt(a.time)
            const bInt = parseInt(b.time)
            if (aInt < bInt) return 1
            if (aInt == bInt) return 0
            if (aInt > bInt) return -1
        })
    }

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

    useEffect(() => {
        findGreet()
    }, []);

    const openNote = (note) => {
        navigation.navigate('NoteDetail', { note })
    }

    const handleOnSearchInput = async (text) => {
        setSearchQuery(text)
        if (!text.trim()) {
            setSearchQuery('')
            setResultNotFound(false)
            return await findNotes()
        }
        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note
            }
        })
        if (filteredNotes.length) {
            setNotes([...filteredNotes])
        } else {
            setResultNotFound(true)
        }
    }

    const handleOnClear = async () => {
        setSearchQuery('')
        setResultNotFound(false)
        await findNotes()
    }

    const reverseNotes = reverseData(notes)

    return (
        <>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.LIGHT}
            />
            <ScrollView contentContainerStyle={{ height: '100%' }}  >
                <LanguageIcon />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Text style={styles.header}>{`${t('good')} ${greet} ${user.name}`}</Text>
                        {
                            notes.length ?

                                <SearchBar
                                    value={searchQuery}
                                    onChangeText={handleOnSearchInput}
                                    containerStyle={{ marginVertical: 15 }}
                                    onClear={handleOnClear}
                                /> : null
                        }
                        <Text>
                            {t("WelcomeText")}
                        </Text>
                        {
                            resultNotFound ?
                                <NotFound />
                                : <View style={styles.noteView}>
                                    {
                                        reverseNotes.map((item) => (
                                            <View style={styles.noteContainer} key={item.id}>
                                                <Note onPress={() => openNote(item)} item={item} />
                                            </View>
                                        ))
                                    }
                                </View>
                        }

                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <RoundIconBtn onPress={() => setModalVisible(true)} antIconName='plus' style={styles.addBtn} />
            <NoteInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}
            />
            {
                !notes.length ?
                    (<View style={styles.emptyHeaderContainer}>
                        <Text style={styles.emptyHeader}>Add notes</Text>
                    </View>)
                    : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
        paddingVertical: 15
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    emptyHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        zIndex: -100,
        background: 'transparent'
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
