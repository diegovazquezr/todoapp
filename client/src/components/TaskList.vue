<script>

import TaskItem from './TaskItem.vue';
export default {
    emits: ['eliminar', 'actualizar'],
    props: {
        tareas: Array
    },
    components: { TaskItem },
    methods: {
        emitEliminar(payload) {
            this.$emit('eliminar', payload)
        },
        emitActualizar(payload) {
            this.$emit('actualizar', payload)
        }
    },
    computed: {
        generarTitulo() {
            const cont = this.tareas.length;
            if (cont > 0) {
                return `${cont} ${cont > 1 ? 'tareas' : 'tarea'}`;
            }
            return 'Sin tareas'
        }
    }
}
</script>

<template>
    <div class="lista">
        <section>
            <h2 class="titulo2">{{ generarTitulo }}</h2>
            <div class="container">
                <TaskItem
                    v-for="tarea in tareas"
                    :key="tarea.id"    
                    :tarea="tarea"
                    @eliminar="emitEliminar"
                    @actualizar="emitActualizar"
                />
            </div>
        </section>
    </div>
</template>

<style>
.lista {
    padding: 1rem;
}

.titulo2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>