/* eslint-disable no-useless-escape */
export const FormatRut = (rut) => {
  if (typeof rut !== 'string') {
    console.error('FormatRut: rut debe ser una cadena')
    return rut
  }

  const cleanRut = rut.replace(/[.\-]/g, '')
  if (cleanRut.length <= 1) return rut

  const cuerpo = cleanRut.slice(0, -1)
  const dv = cleanRut.slice(-1).toUpperCase()

  if (isNaN(cuerpo)) {
    console.error('FormatRut: cuerpo no es un número')
    return rut
  }

  return `${parseInt(cuerpo, 10).toLocaleString('es-CL')}-${dv}`
}
