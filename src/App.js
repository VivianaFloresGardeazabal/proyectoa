import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Habitaciones from "./pages/Habitaciones";
import Personas from "./pages/Personas";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/habitaciones" element={<Habitaciones />} />
      <Route path="/personas" element={<Personas />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}