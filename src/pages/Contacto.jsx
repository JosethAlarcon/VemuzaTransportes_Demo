export default function Contacto() {
    return (
        <div className="flex-grow flex items-center justify-center px-4">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md text-center mt-20">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">Contacto</h2>
                <p className="mb-2"><strong>Nombre:</strong> Joseth Alarcón</p>
                <p className="mb-2"><strong>Cargo:</strong> Coordinador General</p>
                <p className="mb-2">
                    <strong>Teléfono:</strong>{' '}
                    <a href="tel:+56934075897" className="text-blue-600 hover:underline">
                        +56 934075897
                    </a>
                </p>
                <p className="mb-2">
                    <strong>Correo:</strong>{' '}
                    <a href="mailto:joseth.alarcon@inversionesvemuza.com" className="text-blue-600 hover:underline">
                        joseth.alarcon@inversionesvemuza.com
                    </a>
                </p>
                <p className="mb-2 font-semibold">
                    No dudes en contactarme para cualquier consulta, estare feliz de ayudarte.
                </p>
            </div>
        </div>
    )
}

