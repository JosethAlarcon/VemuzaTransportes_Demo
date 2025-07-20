import logoNegro from '../assets/logo_negro.png'
import { useNavigate } from 'react-router-dom'
import logoNegroNuevo from '../assets/logoNegroNuevo.png'


export default function Navbar() {
    const navigate = useNavigate()

    return (
        <div className="w-full h-20 flex items-center justify-between px-8 bg-gradient-to-r from-orange-500 to-yellow-400 shadow-md z-30">
            {/* Logo + texto */}
            <div className="flex items-center gap-3">
                <img src={logoNegroNuevo} alt="Vemuza Logo" className="h-14 w-14 rounded-full" />
                <span className="font-bold text-white text-xl hidden sm:block">Vemuza Transportes</span>

            </div>

            {/* Servicios y contacto */}
            <div className="flex items-center gap-6">
                {/* Botón Inicio */}
                <button
                    onClick={() => navigate('/')}
                    className="ml-4 bg-white text-orange-700 px-4 py-2 rounded-md text-base font-bold hover:bg-orange-100 transition"
                >
                    Inicio
                </button>
                <select
                    className="p-2 rounded-md text-base shadow bg-white text-gray-800 border hover:border-orange-500 transition font-bold"
                    defaultValue="servicios"
                    onChange={(e) => {
                        if (e.target.value !== 'servicios') {
                            navigate('/login')
                        }
                    }}
                >
                    <option value="servicios" disabled>Servicios</option>
                    <option value="flete">Flete</option>
                    <option value="mudanza">Mudanza</option>
                </select>

                <button
                    onClick={() => navigate('/contacto')}
                    className="bg-white text-orange-700 px-4 py-2 rounded-md text-base font-bold hover:bg-orange-100 transition"
                >
                    Contacto
                </button>
            </div>
        </div>
    )
}

