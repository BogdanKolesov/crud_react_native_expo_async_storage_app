import React from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';


const NoteDetail = (props) => {
    const { note } = props.route.params
    const formatDate = ms => {
        const date = new Date(ms)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()

        return `${day} ${month} ${year} at ${hours}:${min}:${sec}`
    }

    const displayDeleteAlert = () => {
        Alert.alert('Are you sure?', 'This action will delete your note!',
            [
                {
                    text: 'Delete',
                    onPress: () => console.log('deleted')
                },
                {
                    text: 'No, thanks',
                    onPress: () => console.log('No')
                },
                {
                    cancelable: true,
                    text: 'Close'
                }
            ]
        )
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.time}>
                    {`Created at ${formatDate(note.time)}`}
                </Text>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.description}>{note.description}</Text>
            </ScrollView>
            <View style={styles.btnContainer}>
                <RoundIconBtn
                    antIconName='delete'
                    style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
                    onPress={displayDeleteAlert}
                />
                <RoundIconBtn
                    antIconName='edit'
                    style={{ backgroundColor: colors.PRIMARY }}
                    onPress={() => console.log('pressed')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 15
    },
    title: {
        fontSize: 40,
        color: colors.PRIMARY,
        fontWeight: 'bold',
        marginBottom: 15
    },
    description: {
        fontSize: 24,
        opacity: 0.6
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5
    },
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 20
    }
})

export default NoteDetail;
