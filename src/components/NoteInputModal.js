import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Keyboard, Text, StatusBar, TextInput, TouchableWithoutFeedback } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';


const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title)
            setDescription(note.description)
        }
    }, [isEdit]);


    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text)
        if (valueFor === 'description') setDescription(text)
    }
    const handleSubmit = () => {
        if (!title.trim() && !description.trim()) return onClose()
        if (isEdit) {
            onSubmit(title, description, Date.now())
        } else {
            onSubmit(title, description)
            setTitle('')
            setDescription('')
        }
        onClose()
    }

    const closeModal = () => {
        if (isEdit) {
        } else {
            setTitle('')
            setDescription('')
        }
        onClose()
    }

    const handleModalClose = () => {
        Keyboard.dismiss()
    }
    return (
        <>
            <StatusBar />
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>

                    <TextInput
                        value={title}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                        style={[styles.input, styles.title]}
                        placeholder='Title'
                    />
                    <TextInput
                        value={description}
                        onChangeText={(text) => handleOnChangeText(text, 'description')}
                        multiline
                        style={[styles.input, styles.description]}
                        placeholder='Note'
                    />
                    <View style={styles.btnContainer}>
                        <RoundIconBtn
                            onPress={closeModal}
                            size={15}
                            antIconName='close'
                        />
                        {
                            title.trim() || description.trim() ? (
                                <RoundIconBtn
                                    onPress={handleSubmit}
                                    size={15}
                                    style={{ marginLeft: 15 }}
                                    antIconName='check' />
                            ) : null
                        }
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBtn, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    description: {
        height: 100,

    },
    modalBtn: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    }
})

export default NoteInputModal;
