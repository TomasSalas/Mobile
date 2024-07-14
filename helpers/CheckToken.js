import * as SecureStore from 'expo-secure-store'

export const checkToken = async (onLogin) => {
  const decodedString = await SecureStore.getItemAsync('decode')
  const decoded = JSON.parse(decodedString)
  if (decoded != null) {
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp < currentTime) {
      await SecureStore.deleteItemAsync('accessToken')
      await SecureStore.deleteItemAsync('InfoUsuario')
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
    } else {
      onLogin()
    }
  }
}
