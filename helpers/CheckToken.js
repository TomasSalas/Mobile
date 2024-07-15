import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'

export const checkToken = async () => {
  const token = await SecureStore.getItemAsync('accessToken')

  if (token) {
    const decoded = jwtDecode(token) // Aquí es donde utilizamos jwtDecode.
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp >= currentTime) {
      return true
    } else {
      await SecureStore.deleteItemAsync('accessToken')
      await SecureStore.deleteItemAsync('decode')
      return false
    }
  }
  return false
}
