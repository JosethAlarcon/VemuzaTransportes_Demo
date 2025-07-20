import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { crearReserva } from '../services/reservaService'
import VALORES_OBJETOS from '../services/valoresObjetos.jsx'
import { OBJETOS_DISPONIBLES } from '../services/objetosDisponibles.jsx'
import { ICONOS_OBJETOS, NOMBRES_OBJETOS } from '../services/iconosObjetos.jsx'

const calcularAdicionalPorPeso = (peso) => {
    if (peso >= 0 && peso < 100) return 0
    if (peso >= 100 && peso < 300) return 5000
    if (peso >= 300 && peso < 500) return 10000
    if (peso >= 500 && peso < 700) return 15000
    if (peso >= 700 && peso < 900) return 20000
    if (peso >= 900 && peso < 1100) return 25000
    if (peso >= 1100 && peso < 1300) return 30000
    if (peso >= 1300 && peso <= 1500) return 35000
    return 0
}

export default function FormularioReserva() {
    const { tipo } = useParams()
    const navigate = useNavigate()

    const [inicio, setInicio] = useState('')
    const [destino, setDestino] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [precioBase, setPrecioBase] = useState(null)
    const [precioFinal, setPrecioFinal] = useState(null)
    const [distanciaKm, setDistanciaKm] = useState(null)
    const [objetoSeleccionado, setObjetoSeleccionado] = useState('')
    const [objetosAgregados, setObjetosAgregados] = useState([])

    const [cantidadPalets, setCantidadPalets] = useState(0)
    const [pesoCargaKg, setPesoCargaKg] = useState('')


    useEffect(() => {
        const obtenerCotizacion = async () => {
            if ((tipo === 'flete' || tipo === 'mudanza') && inicio && destino) {
                try {
                    const respuesta = await fetch('https://localhost:7125/api/cotizador', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ direccionInicio: inicio, direccionDestino: destino })
                    })

                    if (!respuesta.ok) {
                        const errorData = await respuesta.json()
                        setMensaje(errorData.error || '❌ No se pudo calcular el precio estimado.')
                        setPrecioBase(null)
                        return
                    }

                    const data = await respuesta.json()
                    setPrecioBase(data.precioEstimado)
                    setDistanciaKm(data.distanciaKm)
                    setMensaje("")
                } catch (error) {
                    setMensaje('❌ Error de conexión al cotizar.')
                    setPrecioBase(null)
                }
            } else {
                setPrecioBase(null)
            }
        }

        obtenerCotizacion()
    }, [inicio, destino, tipo])

    useEffect(() => {
        const totalObjetos = objetosAgregados.reduce((total, obj) => {
            const valorUnitario = VALORES_OBJETOS[obj.id] || VALORES_OBJETOS.default
            return total + (valorUnitario * obj.cantidad)
        }, 0)

        const adicionalPalets = tipo === 'flete' ? (cantidadPalets * 10000) : 0
        const adicionalPeso = tipo === 'flete' ? calcularAdicionalPorPeso(parseInt(pesoCargaKg) || 0) : 0

        const totalFinal = (precioBase || 0) + totalObjetos + adicionalPalets + adicionalPeso

        setPrecioFinal(totalFinal)
    }, [precioBase, objetosAgregados, cantidadPalets, pesoCargaKg])


    const agregarObjeto = () => {
        if (!objetoSeleccionado) return

        const yaExiste = objetosAgregados.find(obj => obj.id === objetoSeleccionado)

        if (yaExiste) {
            setObjetosAgregados(objetosAgregados.map(obj =>
                obj.id === objetoSeleccionado ? { ...obj, cantidad: obj.cantidad + 1 } : obj
            ))
        } else {
            setObjetosAgregados([
                ...objetosAgregados,
                { id: objetoSeleccionado, cantidad: 1 }
            ])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const usuario = JSON.parse(localStorage.getItem('usuario'))
        if (!usuario) {
            setMensaje('Debes iniciar sesión para reservar.')
            return
        }

        try {
            const nuevaReserva = {
                usuarioId: usuario.id,
                tipo,
                direccionInicio: inicio,
                direccionDestino: destino,
                fecha,
                hora,
                descripcion,
                objetos: objetosAgregados,
                precio: precioFinal || 0,
                distanciaKm,
                cantidadPalets: tipo === 'flete' ? cantidadPalets : 0,
                pesoCargaKg: tipo === 'flete' ? pesoCargaKg : 0
            }


            await crearReserva(nuevaReserva)
            navigate('/reserva-exitosa')
        } catch (error) {
            setMensaje('❌ Error al enviar la reserva.')
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-100 to-green-100 text-gray-800">
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Reserva de {tipo}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Dirección de inicio"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Dirección de destino"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Observaciones importantes (opcional)"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border rounded"
                    />

                    {/* Campos adicionales solo para FLETE */}
                    {tipo === 'flete' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Cantidad de palets:</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={cantidadPalets}
                                    onChange={(e) => setCantidadPalets(parseInt(e.target.value) || 0)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold">Peso total de la carga (kg):</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={pesoCargaKg}
                                    onChange={(e) => setPesoCargaKg(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    )}

                    {/* 🪑 Selector de objetos para mudanza */}
                    {tipo === 'mudanza' && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <select
                                    value={objetoSeleccionado}
                                    onChange={(e) => setObjetoSeleccionado(e.target.value)}
                                    className="flex-1 p-2 border rounded"
                                >
                                    <option value="">Seleccionar objeto</option>
                                    {OBJETOS_DISPONIBLES.map(obj => (
                                        <option key={obj.id} value={obj.id}>
                                            {obj.nombre}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={agregarObjeto}
                                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Agregar
                                </button>
                            </div>

                            <ul className="space-y-1">
                                {objetosAgregados.map(obj => (
                                    <li key={obj.id}>
                                        {ICONOS_OBJETOS[obj.id]} {NOMBRES_OBJETOS[obj.id]} × {obj.cantidad}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    )}

                    {(tipo === 'flete' || tipo === 'mudanza') && precioFinal !== null && (
                        <p className="text-center text-green-700 font-semibold">
                            💰 Precio estimado: ${precioFinal.toLocaleString()}
                        </p>
                    )}

                    {mensaje && <p className="text-center text-sm text-red-600">{mensaje}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Enviar reserva
                    </button>
                </form>
            </div>
        </div>
    )
}
