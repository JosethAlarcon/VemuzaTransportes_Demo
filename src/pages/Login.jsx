import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

export default function Login() {
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Enviando a login:', correo, contraseña)
        try {
            const data = await login(correo, contraseña)
            localStorage.setItem('usuario', JSON.stringify(data))
            if (data.esAdmin) {
                navigate('/admin')
            } else {
                navigate('/seleccion-servicio')
            }

        } catch (err) {
            setError('Correo o contraseña incorrectos')
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-100 to-green-100 text-gray-800">
            <div className="max-w-md mx-auto mt-20 p-6 shadow-xl rounded-xl bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo"
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
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-base font-bold shadow-sm"
                    >
                        Entrar
                    </button>
                    <div className="mt-4 text-sm text-center">
                        ¿No tienes cuenta?
                        <button
                            onClick={() => navigate('/registro')}
                            className="ml-1 text-blue-600 hover:underline font-medium"
                            type="button"
                        >
                            Regístrate aquí
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
