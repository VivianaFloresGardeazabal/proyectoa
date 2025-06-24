import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../util/auth";
import Navbar from "./NavBar";

function CreatePersona() {
  const token = getToken();    
  const [nombre, setNombre] = useState('');
  const [gmail, setGmail] = useState('');
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const options = { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
      body: JSON.stringify({ nombre, gmail })
    };

    const response = await fetch("http://localhost:8080/personas", options);

    if (response.ok) {
      navigation('/PersonaList');
    } else {
      console.log(response);
      alert("Error al crear persona");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="text-center py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h1 className="text-3xl font-bold">Crear Persona</h1>
        </div>                
        <div className="p-8">                
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Gmail"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity duration-300 transform hover:scale-105"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>       
    </div>    
  );    
}

export default CreatePersona;