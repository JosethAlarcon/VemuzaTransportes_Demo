import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrar } from '../services/authService'

export default function Registro() {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registrar({ nombre, correo, contraseña })
            setExito('Usuario registrado correctamente.')
            setTimeout(() => navigate('/login'), 1500)
        } catch (err) {
            setError(err.response?.data || 'Error al registrar')
        }
    }

    return (
        <div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-bold text-center mb-6">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {exito && <p className="text-green-600 text-sm">{exito}</p>}
                    <button
                        type="submit"
                        className="w-full bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-base font-bold shadow-sm"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    )
}
