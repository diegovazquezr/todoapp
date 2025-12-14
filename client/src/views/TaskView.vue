<script>

import TaskList from '@/components/TaskList.vue';
import TaskCreator from '@/components/TaskCreator.vue';
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from '@/api/tareas';

export default {
    data() {
        return {
            tareas: [],
        }
    },
    components: { TaskList, TaskCreator},
    methods: {
        async fetchTareas() {
            const tareas = await obtenerTareas();
            this.tareas = tareas;
        },
        async manejadorCreacion(titulo) {
            await crearTarea({ titulo: titulo });
            this.fetchTareas();
        },
        async manejadorEliminacion({ id }) {
            await eliminarTarea(id);
            this.fetchTareas();
        },
        async manejadorActualizacion({ id, titulo, completado }) {
            await actualizarTarea(id, titulo, completado);
            this.fetchTareas();
        },
    },
    mounted() {
        this.fetchTareas();
    }
}
</script>

<template>
    <div class="task-view">
        <TaskCreator
            @crear="manejadorCreacion"
        />
        <TaskList
            :tareas="tareas"
            @eliminar="manejadorEliminacion"
            @actualizar="manejadorActualizacion"
        />
    </div>
</template>

<style>
body, button, input {
    font-family: Arial, Helvetica, sans-serif;
}

.task-view {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
}
</style>