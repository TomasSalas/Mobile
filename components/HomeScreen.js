import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Surface, Text } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown'
import { ObtenerResultados } from '../functions/ObtenerResultados'
import Charts from './Charts'

export default function HomeScreen () {
  const [userName, setUserName] = useState('')
  const navigation = useNavigation()

  const [value, setValue] = useState('AC-PORT')
  const [resultados, setresultados] = useState(null)

  const data = [
    { label: 'AC-PORT', value: 'AC-PORT' },
    { label: 'RE-AC-PORT', value: 'RE-AC-PORT' },
    { label: 'CERT-PORT', value: 'CERT-PORT' }
  ]

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

  const getResultados = async (payload) => {
    setresultados(null)
    const { error, data } = await ObtenerResultados(payload)
    if (!error) {
      setresultados(data)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    getResultados(value)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerRightText}>Hola {userName}</Text>
      </View>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder='Select item'
        value={value}
        onChange={item => {
          setValue(item.value)
          getResultados(item.value)
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.surfaceContainer}>
          <Surface style={styles.surface2} elevation={4}>
            <Text style={styles.surfaceTitle}>Procesos Planificados</Text>
            {resultados ? <Text style={styles.surfaceNumber}>{resultados.totalProcesosPlanificados.count}</Text> : <ActivityIndicator />}
          </Surface>
          <Surface style={styles.surface2} elevation={4}>
            <Text style={styles.surfaceTitle}>Procesos Digitados</Text>
            {resultados ? <Text style={styles.surfaceNumber}>{resultados.totalProcesosDigitados.count}</Text> : <ActivityIndicator />}
          </Surface>
        </View>
        <View style={styles.surfaceContainer}>
          <Surface style={styles.surface3} elevation={4}>
            <Text style={styles.surfaceTitle}>Procesos Competentes</Text>
            {resultados ? <Text style={styles.surfaceNumber}>{resultados.competentes.count}</Text> : <ActivityIndicator />}
          </Surface>
          <Surface style={styles.surface3} elevation={4}>
            <Text style={styles.surfaceTitle}>Aún no competente por brecha Crítica</Text>
            {resultados ? <Text style={styles.surfaceNumber}>{resultados.noCompetentesPorBrechaCritica.count}</Text> : <ActivityIndicator />}
          </Surface>
        </View>
        <View style={styles.surfaceContainer}>
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.surfaceTitle}>Aún no competente por puntaje</Text>
            {resultados ? <Text style={styles.surfaceNumber}>{resultados.noCompetentesPorPuntaje.count}</Text> : <ActivityIndicator />}
          </Surface>
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.surfaceTitle}>Aún no competente por puntaje y brecha crítica</Text>
            {resultados ? <Text style={styles.surfaceNumber}>{resultados.noCompetentesPorBrechaCritica.count}</Text> : <ActivityIndicator />}
          </Surface>
        </View>
        <View style={{ marginTop: 10 }}>
          {resultados !== null && <Charts data={resultados} />}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  headerRightContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerRightText: {
    fontSize: 16,
    color: '#000'
  },
  surfaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  surface: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    height: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  surface2: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    height: 90,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  surface3: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    height: 90,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  surfaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  surfaceNumber: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
})
