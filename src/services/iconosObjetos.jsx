// src/services/iconosObjetos.js
import { OBJETOS_DISPONIBLES } from './objetosDisponibles'

const ICONOS_OBJETOS = {}
const NOMBRES_OBJETOS = {}

OBJETOS_DISPONIBLES.forEach(obj => {
  ICONOS_OBJETOS[obj.id] = obj.icono
  NOMBRES_OBJETOS[obj.id] = obj.nombre
})

export { ICONOS_OBJETOS, NOMBRES_OBJETOS }

