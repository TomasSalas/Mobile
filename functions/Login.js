export const Login = async (data) => {
  const { rut, contrasena } = data

  const params = {
    run: rut.replace('-', '').replace(/\./g, ''),
    contrasena
  }

  const response = await fetch('https://app-prod-eastus-login-api.azurewebsites.net/api/Login/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })

  const { isExitoso, resultado, errorMessages } = await response.json()

  if (isExitoso) {
    return {
      error: false,
      data: resultado
    }
  } else {
    return {
      error: true,
      data: errorMessages
    }
  }
}
