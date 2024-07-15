import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown'
import { ObtenerFinazas } from '../functions/ObtenerFinanzas'
import { MontoTotal } from './MontosTotales'

export default function Finanzas () {
  const [userName, setUserName] = useState('')
  const navigation = useNavigation()
  const currentYear = String(new Date().getFullYear())
  const currentMonth = '00'
  const [yearValue, setYearValue] = useState(currentYear)
  const [monthValue, setMonthValue] = useState(currentMonth)
  const [yearData, setYearData] = useState([])
  const [resultadosOcio, setResultadosOcio] = useState([])
  const [resultadosProcesos, setResultadosProcesos] = useState([])
  const [resultadoAjusteValor, setResultadoAjusteValor] = useState([])
  const [servicioAdicional, setServicioAdicional] = useState([])

  const monthData = [
    { id: '00', mes: 'Todos los meses' },
    { id: '01', mes: 'Enero' },
    { id: '02', mes: 'Febrero' },
    { id: '03', mes: 'Marzo' },
    { id: '04', mes: 'Abril' },
    { id: '05', mes: 'Mayo' },
    { id: '06', mes: 'Junio' },
    { id: '07', mes: 'Julio' },
    { id: '08', mes: 'Agosto' },
    { id: '09', mes: 'Septiembre' },
    { id: '10', mes: 'Octubre' },
    { id: '11', mes: 'Noviembre' },
    { id: '12', mes: 'Diciembre' }
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

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = 2019; year <= currentYear; year++) {
      years.push({ label: String(year), value: String(year) })
    }
    setYearData(years)
  }

  const getFinanzas = async (year) => {
    const { error, result } = await ObtenerFinazas()

    if (!error) {
      const filteredOcio = result[0].resultadosOcio.filter((item) => {
        return item.FECHA_EDP.split('-')[2] === year
      })

      const filteredProcesos = result[0].resultadosProcesos.filter((item) => {
        return item.FECHA_EDP.split('-')[2] === year
      })

      const filteredAjusteValor = result[0].resultadosAjusteDeValor.filter((item) => {
        return item.FECHA_EDP.split('-')[2] === year
      })

      const filteredServicioAdicional = result[0].resultadosServiciosAdicionales.filter((item) => {
        return item.FECHA_EDP.split('-')[2] === year
      })

      setResultadosOcio(filteredOcio)
      setResultadosProcesos(filteredProcesos)
      setResultadoAjusteValor(filteredAjusteValor)
      setServicioAdicional(filteredServicioAdicional)
    } else {
      setResultadosOcio([])
      setResultadosProcesos([])
      setResultadoAjusteValor([])
      setServicioAdicional([])
    }
  }

  useEffect(() => {
    getUserInfo()
    generateYearOptions()
    getFinanzas(currentYear)
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
        data={yearData}
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder='Select year'
        value={yearValue}
        onChange={(item) => {
          setYearValue(item.value)
          getFinanzas(item.value)
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={monthData}
        maxHeight={300}
        labelField='mes'
        valueField='id'
        placeholder='Select month'
        value={monthValue}
        onChange={(item) => {
          setMonthValue(item.id)
        }}
      />

      <MontoTotal
        resultadosOcio={resultadosOcio}
        resultadosProcesos={resultadosProcesos}
        resultadoAjusteValor={resultadoAjusteValor}
        servicioAdicional={servicioAdicional}
      />

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
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 10
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
  },
  errorText: {
    color: 'red',
    marginTop: 20
  }
})
