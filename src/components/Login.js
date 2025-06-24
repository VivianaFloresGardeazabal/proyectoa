import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../util/auth"; // Este debe guardar el token en localStorage o sessionStorage

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login", options);

            if (response.ok) {
                // Puedes usar .text() o .json() dependiendo de cómo responde tu backend
                // Opción 1: si devuelve solo el token como texto plano
                const token = await response.text();

                // Opción 2: si devuelve JSON: { token: "..." }
                // const data = await response.json();
                // const token = data.token;

                setToken(token); // almacena el token donde lo necesites
                navigate('/personas'); // redirige a la lista de personas
            } else {
                alert("Credenciales inválidas. Intenta de nuevo.");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="text-center py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <h1 className="text-3xl font-bold">login</h1>
            </div>
            <div className="p-8">
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition duration-300 transform hover:scale-105"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
