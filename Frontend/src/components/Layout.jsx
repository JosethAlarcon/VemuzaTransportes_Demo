import Footer from './Footer'
import Navbar from './Navbar' // Opcional, si quieres navbar en todas
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 text-gray-800">
            <Navbar />

            {/* Contenido de cada página */}
            <div className="flex-grow">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}
