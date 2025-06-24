import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PersonaList from "./components/PersonaList";
import CreatePersona from "./components/CreatePersona";
import Login from "./components/Login";
import { getToken } from "./util/auth";

function App() {
  const token = getToken();

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio */}
        <Route path="/" element={token ? <Navigate to="/personas" /> : <Login />} />

        {/* Ruta protegida: listado de personas */}
        <Route
          path="/personas"
          element={token ? <PersonaList /> : <Navigate to="/" />}
        />

        {/* Ruta protegida: creación de persona */}
        <Route
          path="/personas/create"
          element={token ? <CreatePersona /> : <Navigate to="/" />}
        />

        {/* Ruta fallback: redirige a inicio si no se encuentra la ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;