import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './src/components/Intro'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './src/screens/NoteScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './src/components/NoteDetail';
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')
    // console.log(result)
    if (result !== null) {
      setUser(JSON.parse(result))
    }
  }
  useEffect(() => {
    findUser()
    // AsyncStorage.clear()
  }, [])

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />

  if (!user.name) return <Intro onFinish={findUser} />
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
        <Stack.Screen component={NoteDetail} name='NoteDetail' />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

