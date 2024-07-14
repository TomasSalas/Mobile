import * as SecureStore from 'expo-secure-store'

export const ObtenerResultados = async (tipoProceso) => {
  const url = 'https://app-dev-micro-informacion-api.azurewebsites.net/api/informacion/ListarContadores?tipoProceso=' + tipoProceso

  const token = await SecureStore.getItemAsync('accessToken')
  const auth = `Bearer ${token}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth
    }
  })

  const { isExitoso, resultado } = await response.json()

  if (isExitoso) {
    return {
      error: false,
      data: resultado
    }
  } else {
    return {
      error: true,
      data: []
    }
  }
}
