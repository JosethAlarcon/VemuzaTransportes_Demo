import { useNavigate } from 'react-router-dom'

export default function SeleccionServicio() {
    const navigate = useNavigate()

    const seleccionar = (tipo) => {
        navigate(`/reservar/${tipo}`)
    }

    return (
        <div>
            <div className="max-w-xl mx-auto mt-20 text-center">
                <h2 className="text-3xl font-bold mb-6">¿Qué tipo de servicio necesitas?</h2>

                <div className="flex justify-center gap-10 mb-8">
                    <button
                        onClick={() => seleccionar('flete')}
                        className=" bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-base font-bold shadow-sm"
                    >
                        Flete
                    </button>
                    <button
                        onClick={() => seleccionar('mudanza')}
                        className=" bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-base font-bold shadow-sm"
                    >
                        Mudanza
                    </button>
                </div>

                <button
                    onClick={() => navigate('/reservas')}
                    className=" bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-base font-bold shadow-sm"
                >
                    Ver mis reservas
                </button>
            </div>
        </div>
    )
}

