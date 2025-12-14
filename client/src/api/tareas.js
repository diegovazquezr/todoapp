import axios from "axios";

const API_URL = 'http://localhost:3000/api'

const api = axios.create({
    baseURL: API_URL
});

export async function obtenerTareas() {
    try {
        const res = await api.get('/tareas');
        return res.data;
    } catch (error) {
        console.log("Error recupérando las tareas");
        return [];
    }
}

export function crearTarea(tarea) {
    try {
        const res = api.post('/tareas', tarea);
    } catch (error) {
        console.log("Error creando la tarea");
    }
}

export function actualizarTarea(id, titulo, completado) {
    try {
        const res = api.put(`/tareas/${id}`, {
            titulo: titulo,
            completado: completado
        });
    } catch (error) {
        console.log("Error actualizando la tarea");
    }
}

export function eliminarTarea(id) {
    try {
        const res = api.delete(`/tareas/${id}`);
    } catch (error) {
        console.log("Error actualizando la tarea");
    }
}