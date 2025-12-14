<script>
export default {
    data() {
        return {
            titulo: ""
        }
    },
    emits: ['crear'],
    methods: {
        emitCrear() {
            this.$emit('crear', this.titulo);
            this.titulo = "";
        }
    }
}
</script>
<template>
    <div class="creator">
        <h2 class="titulo2">Crear tarea</h2>

        <div class="creator-fila">
            <div class="creator-input">
                <label class="label">
                    Titulo
                    <input
                        class="input"
                        type="text"
                        v-model="this.titulo"
                        placeholder="Escribe una nueva tarea..."
                        @keyup.enter="emitCrear"
                    />
                </label>
            </div>
            <div class="creator-acciones">
                <button class="btn crear" @click="emitCrear">
                    Crear
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.creator {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.titulo2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

.creator-fila {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
}

.creator-input {
    flex: 1;
}

.label {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
}

.input {
    font-size: 1rem;
    padding: 0.4rem 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
}

.creator-acciones {
    display: flex;
    align-items: flex-end;
}

.btn {
    padding: 0.45rem 0.75rem;
    font-size: 0.80rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}

.btn.crear {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #166534
}

.btn:hover {
  opacity: 0.85;
}
</style>