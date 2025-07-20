import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminPanel from './pages/AdminPanel'
import SeleccionServicio from './pages/SeleccionServicio'
import FormularioReserva from './pages/FormularioReserva'
import MisReservas from './pages/MisReservas'
import Registro from './pages/Registro'
import ReservaExitosa from './pages/ReservaExitosa'
import Contacto from './pages/Contacto'
import Layout from './components/Layout'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/reservar/:tipo" element={<FormularioReserva />} />
          <Route path="/reservas" element={<MisReservas />} />
          <Route path="/reserva-exitosa" element={<ReservaExitosa />} />
          <Route path="/seleccion-servicio" element={<SeleccionServicio />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/seleccion-servicio" element={<SeleccionServicio />} />
        <Route path="/reservar/:tipo" element={<FormularioReserva />} />
        <Route path="/reservas" element={<MisReservas />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/reserva-exitosa" element={<ReservaExitosa />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Agregaremos más rutas luego */}
      </Routes>
    </Router>
  )
}
