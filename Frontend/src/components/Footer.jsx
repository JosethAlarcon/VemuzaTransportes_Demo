export default function Footer() {
    const fecha = new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <footer className="text-center text-base font-semibold py-2 bg-gradient-to-r from-orange-500 to-yellow-400 backdrop-blur-md border-t border-gray-300">
            Última actualización: {fecha} | Desarrollado por <span className="font-semibold text-blue-700">JosethDev</span>
        </footer>
    )
}
