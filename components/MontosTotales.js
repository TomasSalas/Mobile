import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Surface, Text } from 'react-native-paper'

export const MontoTotal = ({ resultadosOcio, resultadosProcesos, resultadoAjusteValor, servicioAdicional }) => {
  const [montoOcio, setMontoOcio] = useState(0)
  const [montoProcesos, setMontoProcesos] = useState(0)
  const [montoAjusteValor, setMontoAjusteValor] = useState(0)
  const [montoServicioAdicional, setMontoServicioAdicional] = useState(0)
  const [totalMonto, setTotalMonto] = useState(0)

  const calcularMontosIndividuales = useCallback(() => {
    let totalOcio = 0
    resultadosOcio.forEach((item) => {
      totalOcio += item.VALOR
    })
    setMontoOcio(totalOcio)

    let totalProcesos = 0
    resultadosProcesos.forEach((item) => {
      totalProcesos += item.VALOR
    })

    setMontoProcesos(totalProcesos)

    let totalAjusteValor = 0
    resultadoAjusteValor.forEach((item) => {
      if (item.TIPO_AJUSTEVALOR === 'Descuento') {
        totalAjusteValor -= item.VALOR
      } else {
        totalAjusteValor += item.VALOR
      }
    })

    setMontoAjusteValor(totalAjusteValor)

    let totalServicioAdicional = 0
    servicioAdicional.forEach((item) => {
      totalServicioAdicional += item.VALOR
    })

    setMontoServicioAdicional(totalServicioAdicional)

    const total = totalOcio + totalProcesos + totalAjusteValor + totalServicioAdicional
    setTotalMonto(total)
  }, [resultadosOcio, resultadosProcesos, resultadoAjusteValor, servicioAdicional])

  useEffect(() => {
    calcularMontosIndividuales()
  }, [calcularMontosIndividuales])

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Total Monto:</Text>
        <Text style={styles.amount}>{totalMonto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Text>
      </Surface>

      <View style={styles.surfaceContainer}>
        <Surface style={styles.surface2} elevation={4}>
          <Text style={styles.surfaceTitle}>Total Procesos</Text>
          {montoProcesos ? <Text style={styles.surfaceNumber}>{montoProcesos.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Text> : <ActivityIndicator />}
        </Surface>
        <Surface style={styles.surface2} elevation={4}>
          <Text style={styles.surfaceTitle}>Días de contingencia</Text>
          {montoOcio ? <Text style={styles.surfaceNumber}>{montoOcio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Text> : <ActivityIndicator />}
        </Surface>
      </View>

      <View style={styles.surfaceContainer}>
        <Surface style={styles.surface2} elevation={4}>
          <Text style={styles.surfaceTitle}>Servicios Adicionales</Text>
          {montoServicioAdicional ? <Text style={styles.surfaceNumber}>{montoServicioAdicional.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Text> : <ActivityIndicator />}
        </Surface>
        <Surface style={styles.surface2} elevation={4}>
          <Text style={styles.surfaceTitle}>Ajustes de Valor</Text>
          {montoAjusteValor ? <Text style={styles.surfaceNumber}>{montoAjusteValor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Text> : <ActivityIndicator />}
        </Surface>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  surface: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    height: 90
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10
  },
  surfaceItem: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: '45%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  amount: {
    fontSize: 16,
    marginTop: 5
  },
  surfaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
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
  surfaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
