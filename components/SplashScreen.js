import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { checkToken } from '../helpers/CheckToken'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const verifyToken = async () => {
      const token = await SecureStore.getItemAsync('accessToken')
      if (token) {
        const isValid = await checkToken()
        if (isValid) {
          navigation.replace('Main')
        } else {
          navigation.replace('Login')
        }
      } else {
        navigation.replace('Login')
      }
    }

    verifyToken()
  }, [navigation])

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#db0101' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})

export default SplashScreen
