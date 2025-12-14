<script>
export default {
    emits: ['eliminar', 'actualizar'],
    props: {
        tarea: Object,
    },
    data() {
        return {
            editando: false,
            titulo: this.tarea.titulo
        }
    },
    computed: {
        fechaActualizacion() {
            const date = new Date(this.tarea.updatedAt);
            return date.toLocaleDateString();
        }
    },
    methods: {
        editar() {
            this.editando = true;
            this.titulo = this.tarea.titulo
        },
        emitEliminar() {
            this.$emit('eliminar', { 
                id: this.tarea.id
            });
        },
        emitActualizar() {
            this.$emit('actualizar', {
                id: this.tarea.id,
                titulo: this.titulo,
                completado: this.tarea.completado
            });
            this.editando = false;
            this.titulo = "";
        },
        cancelar() {
            this.editando = false;
            this.titulo = "";
        },
        emitCompletar() {
            this.$emit('actualizar', {
                id: this.tarea.id,
                titulo: this.tarea.titulo,
                completado: !this.tarea.completado
            });
            this.editando = false;
            this.titulo = "";
        },
    }
}
</script>

<template>
<div class="item" :class="{ completado: tarea.completado }">
    <div class="izq">
        <input
            type="checkbox"
            :checked="tarea.completado"
            @click="emitCompletar"
        />
        <span class="fecha">{{ fechaActualizacion }}</span>
        <template v-if="!editando">
            <span class="titulo" :title="tarea.titulo">{{ tarea.titulo }}</span>
        </template>
        <template v-else>
            <input
                class="titulo-input"
                type="text"
                v-model="titulo"
                @keyup.enter="emitActualizar"
            />
        </template>
    </div>
    <div class="acciones">
        <template v-if="!editando">
            <button class="btn editar" @click="editar">Editar</button>
            <button class="btn eliminar" @click="emitEliminar">Eliminar</button>
        </template>
        <template v-else>
            <button class="btn actualizar" @click="emitActualizar">Actualizar</button>
            <button class="btn cancelar" @click="cancelar">Cancelar</button>
        </template>
    </div>
</div>
</template>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border: 1px solid rgb(214, 221, 228);
    background-color: aliceblue;
    gap: 1rem;
}

.item:hover {
    border: 1px solid rgb(0, 0, 0);

}

.item.completado .titulo {
  text-decoration: line-through;
  color: #3c3f44;
}

.izq {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    min-width: 0;
}

.titulo {
    font-size: 1rem;
    white-space: wrap;
}

.titulo-input {
    font-size: 0.8rem;
    flex: 1; /* Ocupar el espacio disponible */
}

.fecha {
    color: #386bca;
    background: #e0e7ff;
    font-size: 0.8rem;
    padding: 0.10rem 0.5rem;
    border: 1px solid #386bca;
    border-radius: 999px;
    white-space: nowrap;
}

.acciones {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 0.45rem 0.75rem;
    font-size: 0.80rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}

.btn.editar {
    background: #e0e7ff;
    color: #306ba3;
    border: 1px solid #306ba3
}

.btn.eliminar {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #991b1b
}
.btn.actualizar {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #166534
}

.btn.cancelar {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #374151
}

.btn:hover {
  opacity: 0.85;
}

.item input[type="checkbox"] {
  transform: scale(2);
  cursor: pointer;
  accent-color: #305ba3;
}

</style>
