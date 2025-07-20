import { useEffect, useState } from 'react'
import { obtenerTodasLasReservas, confirmarReserva } from '../services/reservaService'
import { ICONOS_OBJETOS, NOMBRES_OBJETOS } from '../services/iconosObjetos'

export default function AdminPanel() {
    const [fletes, setFletes] = useState([])
    const [mudanzas, setMudanzas] = useState([])

    useEffect(() => {
        obtenerTodasLasReservas().then(reservas => {
            setFletes(reservas.filter(r => r.tipo === 'flete'))
            setMudanzas(reservas.filter(r => r.tipo === 'mudanza'))
        })
    }, [])

    const confirmar = async (id) => {
        await confirmarReserva(id)
        const data = await obtenerTodasLasReservas()
        setFletes(data.filter(r => r.tipo === 'flete'))
        setMudanzas(data.filter(r => r.tipo === 'mudanza'))
    }

    const renderObjetos = (objetos) => {
        if (!Array.isArray(objetos) || objetos.length === 0) {
            return <p className="text-sm text-gray-500">Sin objetos registrados.</p>
        }

        return (
            <ul className="list-disc ml-6 mt-2">
                {objetos.map((obj, i) => (
                    <li key={i}>
                        {ICONOS_OBJETOS[obj.id]} {NOMBRES_OBJETOS[obj.id]} × {obj.cantidad}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Panel de Reservas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Fletes */}
                <div>
                    <h3 className="text-2xl font-semibold text-orange-600 mb-4">Fletes</h3>
                    {fletes.map(reserva => (
                        <div key={reserva.id} className="border p-4 rounded shadow bg-white mb-4">
                            <p className="font-bold">{reserva.usuarioNombre}</p>
                            <p>{reserva.direccionInicio} → {reserva.direccionDestino}</p>
                            <p>Fecha: {reserva.fecha.slice(0, 10)} | Hora: {reserva.hora}</p>
                            <p>{reserva.descripcion}</p>
                            <p>Palets: {reserva.cantidadPalets}</p>
                            <p>Peso carga: {reserva.pesoCargaKg} kg</p>
                            <p className="text-blue-600 font-semibold">📏 Distancia: {reserva.distanciaKm.toFixed(1)} km</p>
                            <p className="text-green-700 font-semibold">💰 Precio estimado: ${reserva.precio.toLocaleString()}</p>
                            <p className="font-semibold">Estado: {reserva.confirmada ? '✔ Confirmada' : '❌ Pendiente'}</p>
                            {!reserva.confirmada && (
                                <button
                                    onClick={() => confirmar(reserva.id)}
                                    className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Confirmar
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mudanzas */}
                <div>
                    <h3 className="text-2xl font-semibold text-green-700 mb-4">Mudanzas</h3>
                    {mudanzas.map(reserva => (
                        <div key={reserva.id} className="border p-4 rounded shadow bg-white mb-4">
                            <p className="font-bold">{reserva.usuarioNombre}</p>
                            <p>{reserva.direccionInicio} → {reserva.direccionDestino}</p>
                            <p>Fecha: {reserva.fecha.slice(0, 10)} | Hora: {reserva.hora}</p>
                            <p>{reserva.descripcion}</p>
                            <p className="font-semibold mt-2">🪑 Objetos:</p>
                            {renderObjetos(reserva.objetos)}
                            <p className="text-blue-600 font-semibold">📏 Distancia: {reserva.distanciaKm.toFixed(1)} km</p>
                            <p className="text-green-700 font-semibold mt-2">💰 Precio estimado: ${reserva.precio.toLocaleString()}</p>
                            <p className="font-semibold">Estado: {reserva.confirmada ? '✔ Confirmada' : '❌ Pendiente'}</p>
                            {!reserva.confirmada && (
                                <button
                                    onClick={() => confirmar(reserva.id)}
                                    className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Confirmar
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
