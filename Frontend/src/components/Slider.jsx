import { useState, useEffect } from 'react'
import imagen1 from '../assets/slider1.png'
import imagen2 from '../assets/slider2.png'
import imagen3 from '../assets/slider3.png'
import imagen4 from '../assets/slider4.png'
import imagen5 from '../assets/slider5.png'
import imagen6 from '../assets/slider6.png'
import imagen7 from '../assets/slider7.png'
import imagen8 from '../assets/slider8.png'
import imagen9 from '../assets/slider9.png'

const imagenes = [imagen7, imagen8, imagen9]

export default function Slider() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndex((prev) => (prev + 1) % imagenes.length)
        }, 5000)

        return () => clearInterval(intervalo)
    }, [])

    return (
        <div className="w-full h-32 sm:h-40 md:h-80 overflow-hidden relative">
            {imagenes.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`slide-${i}`}
                    className={`w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                />
            ))}
        </div>
    )
}
