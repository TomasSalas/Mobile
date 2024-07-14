import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
export default function SettingsScreen () {
  const navigation = useNavigation()
  const [userName, setUserName] = useState('')

  const getUserInfo = async () => {
    const userInfoString = await SecureStore.getItemAsync('decode')
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString)

      const currentTime = Math.floor(Date.now() / 1000)
      if (userInfo.exp < currentTime) {
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('decode')
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
        navigation.replace('Login')
      } else {
        setUserName(`${userInfo.Nombre} ${userInfo.Apellido}`)
      }
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerRightText}>Hola {userName}</Text>
      </View>
      <Text>Settings!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRightContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  headerRightText: {
    fontSize: 16,
    color: '#000'
  }
})
