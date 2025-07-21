import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useRef } from 'react'
import trabajo1 from '../assets/trabajo1.png'
import trabajo2 from '../assets/trabajo2.png'
import trabajo3 from '../assets/trabajo3.png'
import trabajo4 from '../assets/trabajo4.png'
import trabajo5 from '../assets/trabajo5.png'
import trabajo6 from '../assets/trabajo6.png'
import facilImg from '../assets/facil.png'
import rapidoImg from '../assets/rapido.png'
import seguroImg from '../assets/seguro.png'
import puntualImg from '../assets/puntual.png'


export default function Home() {
    const scrollRef = useRef(null)

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }

    return (
        <div className="relative min-h-screen flex flex-col justify-between bg-white  from-blue-100 via-white to-green-100 text-gray-800">
            {/* SLIDER + LOGO */}
            <div className="relative z-10">
                {/* IMAGEN BANNER */}
                <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                    <img
                        src="/src/assets/BannerVemuza.png"
                        alt="Banner Vemuza"
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* LOGO FUERA DEL VIDEO, SOBRE TODO */}
                <div className="absolute left-1/2 top-[calc(100%_-_8rem)] transform -translate-x-1/2 z-50">
                    <img
                        src={logo}
                        alt="Logo Vemuza"
                        className="w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-2xl border-4 border-white bg-white/80 backdrop-blur-sm animate-zoom-in"
                    />

                </div>

            </div>

            <main className="bg-white flex flex-col items-center justify-center py-8 text-center animate-fade-in mt-12 mb-0 px-4">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-orange-700 mb-4">Mudanzas y Fletes <span className="text-gray-900">Confiables</span></h1>
                <p className="text-gray-700 mb-8 max-w-2xl text-lg font-semibold sm:text-xl">
                    En Vemuza Transportes cuidamos tus pertenencias como si fueran nuestras. Rápido, seguro y puntual.
                </p>

                <div className="flex gap-6">
                    <Link
                        to="/Contacto"
                        className="bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-lg font-bold shadow-sm"
                    >
                        Contáctanos
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-orange-700 border-4 border-orange-700 px-6 py-2 rounded-lg hover:bg-orange-100 transition text-lg font-bold shadow-sm"
                    >
                        Cotiza Ya
                    </Link>
                </div>

            </main>

            {/* SECCIÓN DE MISIÓN A PANTALLA COMPLETA */}
            <section className="bg-white py-2 w-full">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* TEXTO IZQUIERDA */}
                    <div className="text-left">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                            Excelencia en <br />
                            <span className="text-orange-700">atención al cliente</span>
                        </h2>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            Con más de <span className="font-bold">5 años trabajando en el rubro</span> nos destacamos como referentes del sector por nuestra dedicación a brindar un servicio de <span className="font-bold">alta calidad, puntual y seguro.</span> Entendemos que cada traslado tiene sus particularidades, por eso diseñamos soluciones a medida que se ajustan a tus requerimientos. Ya sea un cambio de hogar o un traslado corporativo, estamos listos para hacerlo <span className="font-bold">simple, rápido y sin complicaciones.</span>.
                        </p>
                    </div>

                    {/* ICONOS DERECHA */}
                    <div className="grid grid-cols-2 gap-8 text-center text-red-700 font-bold text-xl">
                        <div className="flex flex-col items-center">
                            <img src={facilImg} alt="Fácil" className="w-20 h-20 mb-2" />
                            Fácil
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={rapidoImg} alt="Rápido" className="w-20 h-20 mb-2" />
                            Rápido
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={seguroImg} alt="Seguro" className="w-20 h-20 mb-2" />
                            Seguro
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={puntualImg} alt="Puntual" className="w-20 h-20 mb-2" />
                            Puntual
                        </div>
                    </div>

                </div>
            </section>

            {/* GALERÍA DE TRABAJOS */}
            <section className="bg-white py-5 w-full">
                <div className="max-w-6xl mx-auto px-6 ">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Algunos de nuestros trabajos realizados y clientes satisfechos
                    </h2>

                    <div className="relative">
                        {/* Flecha izquierda */}
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 z-10"
                        >
                            &#8592;
                        </button>

                        {/* Contenedor de imágenes con scroll */}
                        <div
                            ref={scrollRef}
                            className="flex space-x-4 overflow-x-auto scroll-smooth pb-4 px-10 scrollbar-hide mb-5"
                        >
                            <img src={trabajo1} alt="Trabajo 1" className="h-60 rounded shadow-md flex-shrink-0" />
                            <img src={trabajo2} alt="Trabajo 2" className="h-60 rounded shadow-md flex-shrink-0" />
                            <img src={trabajo3} alt="Trabajo 3" className="h-60 rounded shadow-md flex-shrink-0" />
                            <img src={trabajo4} alt="Trabajo 4" className="h-60 rounded shadow-md flex-shrink-0" />
                            <img src={trabajo5} alt="Trabajo 5" className="h-60 rounded shadow-md flex-shrink-0" />
                            <img src={trabajo6} alt="Trabajo 6" className="h-60 rounded shadow-md flex-shrink-0" />
                            {/* Agrega más imágenes aquí */}
                        </div>

                        {/* Flecha derecha */}
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 z-10"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

