import React, { useEffect, useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './components/LoginScreen'
import MainApp from './components/MainApp'
import SplashScreen from './components/SplashScreen'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SecureStore from 'expo-secure-store'

const Stack = createStackNavigator()

export default function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

    const checkAuthStatus = async () => {
      const token = await SecureStore.getItemAsync('accessToken')
      if (token) {
        setIsAuthenticated(true)
      }
    }

    checkAuthStatus()
  }, [])

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated
            ? (
              <Stack.Screen name='Main'>
                {() => <MainApp setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              )
            : (
              <>
                <Stack.Screen name='Splash' component={SplashScreen} />
                <Stack.Screen name='Login'>
                  {() => <LoginScreen onLogin={() => setIsAuthenticated(true)} />}
                </Stack.Screen>
              </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
