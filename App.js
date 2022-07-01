import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './src/components/Intro'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './src/screens/NoteScreen';

export default function App() {
  const [user, setUser] = useState();

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')
    console.log(result)
    setUser(JSON.parse(result))
  }
  useEffect(() => {
    findUser()
  }, [])
  return (
    <NoteScreen user={user} />
  );
}

