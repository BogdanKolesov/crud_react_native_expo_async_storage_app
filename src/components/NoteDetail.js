import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const NoteDetail = (props) => {
    const { note } = props.route.params.note
    return (
        <View>
            <Text>
                Note detail
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default NoteDetail;
