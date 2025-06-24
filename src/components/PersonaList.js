import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../util/auth";
import Navbar from "./NavBar";


function PersonaList() {
    const token = getToken();
    const navigation = useNavigate();

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        const options = { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        };        

        fetch("http://localhost:8080/personas", options)
            .then((res) => res.json())
            .then((data) => setPersonas(data))
            .catch((err) => console.log("Error: ", err));
            console.log(personas);
            
    }, [personas, token]);    

    const handleClick = () => {
        navigation('create'); 
    };

    const handleDelete = (id) => {
        const deleteOptions = { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        };        

        fetch('http://localhost:8080/personas/${id}', deleteOptions)
            .then((res) => {
                if (res.status === 204) {
                    console.log("Eliminado correctamente");
                    setPersonas(prevItems => prevItems.filter(item => item.id !== id));                    
                } else {
                    console.log("Error al eliminar");                    
                }
            })
            .catch((err) => console.log("Error Request: ", err));            
    }

    return (
        <div>
            <Navbar />
            <h2>Personas</h2>
            <button
                className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out"
                onClick={handleClick}
            >
                Add
            </button>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gmail</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {personas.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.gmail}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                                    Edit
                                </button>
                                <button
                                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>                        
                        </tr>
                    ))} 
                </tbody>
            </table>            
        </div>
    );
}

export default PersonaList;