import * as SecureStore from 'expo-secure-store'

export const ObtenerFinazas = async () => {
  const url = 'https://app-dev-micro-finanzas-api.azurewebsites.net/api/PowerBi/DetalleCompletoEDP_Empresa'

  const token = await SecureStore.getItemAsync('accessToken')
  const auth = `Bearer ${token}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth
    }
  })

  const result = await res.json()
  if (result.length > 0) {
    return {
      error: false,
      result
    }
  } else {
    return {
      error: true,
      result: []
    }
  }
}
