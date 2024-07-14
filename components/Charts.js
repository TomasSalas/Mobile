import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PieChart from 'react-native-pie-chart'

export default function Charts ({ data }) {
  const widthAndHeight = 150

  const series = [
    data.competentes.count,
    data.noCompetentesPorBrechaCritica.count,
    data.noCompetentesPorPuntaje.count,
    data.noCompetentesPorPuntajeYBrechaCritica.count
  ]

  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50']

  const labels = [
    'Competentes',
    'No Competentes por Brecha Crítica',
    'No Competentes por Puntaje',
    'No Competentes por Puntaje y Brecha Crítica'
  ]

  const total = series.reduce((sum, value) => sum + value, 0)

  const getPercentages = () => {
    return series.map((value) => {
      if (value > 0) {
        return ((value / total) * 100).toFixed(2) + '%'
      }
      return null
    })
  }

  const percentages = getPercentages()

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative', alignItems: 'center' }}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
      </View>
      <View style={styles.legendContainer}>
        {labels.map((label, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: sliceColor[index] }]} />
            <Text style={styles.legendLabel}>{label}</Text>
            {percentages[index] && (
              <Text style={styles.legendPercentage}>{percentages[index]}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'column'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  legendLabel: {
    fontSize: 13,
    flex: 1
  },
  legendPercentage: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold'
  }
})
