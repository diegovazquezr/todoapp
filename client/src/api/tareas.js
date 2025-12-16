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
        console.error("Error recupérando las tareas");
        throw error;
    }
}

export async function crearTarea(tarea) {
    try {
        const res = await api.post('/tareas', tarea);
        return res.data
    } catch (error) {
        console.error("Error creando la tarea");
        throw error;
    }
}

export async function actualizarTarea(id, titulo, completado) {
    try {
        const res = await api.put(`/tareas/${id}`, {
            titulo: titulo,
            completado: completado
        });
        return res.data
    } catch (error) {
        console.error("Error actualizando la tarea");
        throw error;
    }
}

export async function eliminarTarea(id) {
    try {
        const res = await api.delete(`/tareas/${id}`);
        return res.data
    } catch (error) {
        console.error("Error actualizando la tarea");
        throw error;
    }
}