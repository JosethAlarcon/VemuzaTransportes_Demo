import { useEffect, useState } from 'react'
import { obtenerReservasPorUsuario } from '../services/reservaService'
import { NOMBRES_OBJETOS } from '../services/iconosObjetos.jsx'

export default function MisReservas() {
    const [reservas, setReservas] = useState([])
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    useEffect(() => {
        if (usuario) {
            obtenerReservasPorUsuario(usuario.id)
                .then(setReservas)
                .catch((err) => console.error('Error al obtener reservas:', err))
        }
    }, [])

    return (
        <div>
            <div className="max-w-3xl mx-auto mt-10 p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Mis Reservas</h2>
                {reservas.length === 0 ? (
                    <p className="text-center text-gray-600">No tienes reservas registradas.</p>
                ) : (
                    <ul className="space-y-4">
                        {reservas.map((reserva) => (
                            <li
                                key={reserva.id}
                                className="border p-4 rounded shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-lg text-orange-700">Tipo: {reserva.tipo}</p>
                                        <p>Desde: {reserva.direccionInicio}</p>
                                        <p>Hasta: {reserva.direccionDestino}</p>
                                        <p>Fecha: {reserva.fecha.slice(0, 10)}</p>
                                        <p>Hora: {reserva.hora}</p>
                                        <p className="text-blue-600 font-semibold">📏 Distancia: {reserva.distanciaKm.toFixed(1)} km</p>
                                        <p className="text-green-700 font-semibold">💰 Precio: ${reserva.precio?.toLocaleString()}</p>

                                        {/* Mostrar Palets y Peso para Flete */}
                                        {reserva.tipo === 'flete' && (
                                            <>
                                                <p>Palets: {reserva.cantidadPalets || 0}</p>
                                                <p>Peso carga: {reserva.pesoCargaKg || 0} kg</p>
                                            </>
                                        )}

                                        {/* Mostrar Objetos para Mudanza */}
                                        {reserva.tipo === 'mudanza' && reserva.objetos?.length > 0 && (
                                            <div className="mt-2">
                                                <p className="font-semibold">🪑 Objetos:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    {reserva.objetos.map((obj, index) => (
                                                        <li key={index}>
                                                            {NOMBRES_OBJETOS[obj.objetoId] || obj.objetoId} × {obj.cantidad}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <span
                                        className={`px-2 py-1 rounded text-sm font-medium self-start ${reserva.confirmada
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {reserva.confirmada ? 'Confirmada' : 'Pendiente'}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
