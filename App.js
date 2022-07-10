import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Suspense } from 'react';
import Intro from './src/components/Intro'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './src/screens/NoteScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './src/components/NoteDetail';
import { NavigationContainer } from '@react-navigation/native'
import NoteProvider from './src/contexts/NoteProvider';
import LanguageProvider from './src/contexts/LanguageProvider';

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')

    if (result == null) return setIsAppFirstTimeOpen(true)

    // console.log(result)
    if (result !== null) {
      setUser(JSON.parse(result))
      setIsAppFirstTimeOpen(false)
    }
  }
  useEffect(() => {
    findUser()
    // AsyncStorage.clear()
  }, [])

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />
  return (
    <NavigationContainer>
      <Suspense fallback={null}>
        <LanguageProvider>
          <NoteProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
              <Stack.Screen component={NoteDetail} name='NoteDetail' />
            </Stack.Navigator>
          </NoteProvider>
        </LanguageProvider>
      </Suspense>
    </NavigationContainer>
  )
}

