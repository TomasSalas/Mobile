import React, { useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Finanzas from './Finanzas'

const Tab = createBottomTabNavigator()

const logout = async (setIsAuthenticated) => {
  await SecureStore.deleteItemAsync('accessToken')
  await SecureStore.deleteItemAsync('decode')
  setIsAuthenticated(false)
}

const LogoutScreen = ({ setIsAuthenticated }) => {
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      const showAlert = () => {
        Alert.alert(
          'Cerrar sesión',
          '¿Estás seguro de que deseas cerrar sesión?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => navigation.navigate('Portuario') // Navigate to HomeScreen
            },
            {
              text: 'Cerrar sesión',
              onPress: () => logout(setIsAuthenticated)
            }
          ],
          { cancelable: false }
        )
      }

      showAlert()

      return () => {
      }
    }, [navigation])
  )

  return null
}

export default function MainApp ({ setIsAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Portuario') {
            return <FontAwesome5 name='ship' size={size} color={color} />
          } else if (route.name === 'Minero') {
            return <Ionicons name='hammer-sharp' size={size} color={color} />
          } else if (route.name === 'Finanzas') {
            return <MaterialCommunityIcons name='cash-multiple' size={size} color={color} />
          } else if (route.name === 'Cerrar sesión') {
            return <AntDesign name='logout' size={size} color={color} />
          }
        },
        tabBarActiveTintColor: '#db0101',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name='Portuario' component={HomeScreen} />
      <Tab.Screen name='Minero' component={SettingsScreen} />
      <Tab.Screen name='Finanzas' component={Finanzas} />
      <Tab.Screen name='Cerrar sesión'>
        {() => <LogoutScreen setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
