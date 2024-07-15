import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, ScrollView, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { FormatRut } from '../helpers/FormatRut'
import { Login } from '../functions/Login'
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode'
import { checkToken } from '../helpers/CheckToken'

export default function LoginScreen ({ onLogin }) {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (payload) => {
    setLoading(true)
    const { error, data } = await Login(payload)
    if (!error) {
      await SecureStore.setItemAsync('accessToken', data.token)
      try {
        const decoded = jwtDecode(data.token)
        await SecureStore.setItemAsync('decode', JSON.stringify(decoded))
      } catch (e) {
        console.error(e)
      }
      onLogin()
      setLoading(false)
    } else {
      alert('Credenciales incorrectas')
      setLoading(false)
    }
  }

  const rut = watch('rut', '')

  useEffect(() => {
    if (rut) {
      const formattedRut = FormatRut(rut)
      if (formattedRut !== rut) {
        setValue('rut', formattedRut)
      }
    }
  }, [rut, setValue])

  useEffect(() => {
    checkToken(onLogin)
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require('../assets/logot.png')} style={styles.logo} />
      <Controller
        control={control}
        rules={{ required: 'RUT es requerido', maxLength: { value: 12, message: 'RUT no puede exceder 12 caracteres' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode='outlined'
            label='RUT'
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            error={!!errors.rut}
          />
        )}
        name='rut'
      />
      {errors.rut && <Text style={styles.errorText}>{errors.rut.message}</Text>}

      <Controller
        control={control}
        rules={{ required: 'Clave es requerida' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode='outlined'
            label='Clave'
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
          />
        )}
        name='contrasena'
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Button
        mode='contained'
        buttonColor='#db0101'
        onPress={handleSubmit(handleLogin)}
        loading={loading}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    width: '80%',
    marginVertical: 10
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: -10,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff'
  }
})
