import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Surface, Text, ActivityIndicator } from 'react-native-paper'

export const MontoTotal = ({ resultadosOcio, resultadosProcesos, resultadoAjusteValor, servicioAdicional }) => {
  const [montoOcio, setMontoOcio] = useState(0)
  const [montoProcesos, setMontoProcesos] = useState(0)
  const [montoAjusteValor, setMontoAjusteValor] = useState(0)
  const [montoServicioAdicional, setMontoServicioAdicional] = useState(0)
  const [totalMonto, setTotalMonto] = useState(0)
  const [loading, setLoading] = useState(true)

  const calcularMontosIndividuales = useCallback(() => {
    setLoading(true)
    let totalOcio = 0
    let totalProcesos = 0
    let totalAjusteValor = 0
    let totalServicioAdicional = 0

    if (resultadosProcesos.length > 0) {
      resultadosOcio.forEach((item) => {
        totalOcio += item.VALOR
      })
      setMontoOcio(totalOcio)

      resultadosProcesos.forEach((item) => {
        totalProcesos += item.VALOR
      })
      setMontoProcesos(totalProcesos)

      resultadoAjusteValor.forEach((item) => {
        if (item.TIPO_AJUSTEVALOR === 'Descuento') {
          totalAjusteValor -= item.VALOR
        } else {
          totalAjusteValor += item.VALOR
        }
      })
      setMontoAjusteValor(totalAjusteValor)

      servicioAdicional.forEach((item) => {
        totalServicioAdicional += item.VALOR
      })
      setMontoServicioAdicional(totalServicioAdicional)

      const total = totalOcio + totalProcesos + totalAjusteValor + totalServicioAdicional
      setTotalMonto(total)
      setLoading(false)
    }
  }, [resultadosOcio, resultadosProcesos, resultadoAjusteValor, servicioAdicional])

  useEffect(() => {
    calcularMontosIndividuales()
  }, [calcularMontosIndividuales])

  const renderMonto = (monto) => {
    if (loading) {
      return <ActivityIndicator color='#db0101' />
    } else {
      return <Text style={styles.surfaceNumber}>{monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Text>
    }
  }

  return (
    <>
      <View style={styles.surfaceContainer}>
        <Surface style={styles.surface2} elevation={4}>
          <View>
            <Text style={styles.surfaceTitle}>Total Procesos</Text>
          </View>
          <View>
            {renderMonto(totalMonto)}
          </View>
        </Surface>
      </View>
      <View style={styles.surfaceContainer}>
        <Surface style={styles.surface2} elevation={4}>
          <View>
            <Text style={styles.surfaceTitle}>Total Procesos</Text>
          </View>
          <View>
            {renderMonto(montoProcesos)}
          </View>
        </Surface>
        <Surface style={styles.surface2} elevation={4}>
          <View>
            <Text style={styles.surfaceTitle}>Días de contingencia</Text>
          </View>
          <View>
            {renderMonto(montoOcio)}
          </View>
        </Surface>
      </View>
      <View style={styles.surfaceContainer}>
        <Surface style={styles.surface2} elevation={4}>
          <View>
            <Text style={styles.surfaceTitle}>Servicios Adicionales</Text>
          </View>
          <View>
            {renderMonto(montoServicioAdicional)}
          </View>
        </Surface>
        <Surface style={styles.surface2} elevation={4}>
          <View>
            <Text style={styles.surfaceTitle}>Ajustes de Valor</Text>
          </View>
          <View>
            {renderMonto(montoAjusteValor)}
          </View>
        </Surface>
      </View>
    </>
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
    padding: 15,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  surfaceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  surfaceNumber: {
    fontSize: 16,
    textAlign: 'center'
  }
})
