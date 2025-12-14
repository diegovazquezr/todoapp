const cors = require("cors");
const express = require('express');
const parser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const PORT = 3000;
const app = express();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class Tarea extends Model {}
Tarea.init(
    {
        titulo: DataTypes.STRING,
        completado: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
    { sequelize, modelNAme: "tarea" }
);

sequelize.sync();

// Midlewares
app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.static(__dirname + '/public'));


app.post('/api/tareas', async (req, res) => {
    // Crear tarea
    const data = req.body;

    if (data.titulo === '') {
        return res.status(400).json({ mensaje: 'Debes ingresar un titulo' });
    }

    try {
        const tarea = await Tarea.create(data);
        res.status(200).json({ id: tarea.id, mensaje: 'Tarea creada con éxito' })
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

app.get('/api/tareas', async (req, res) => {
    // Obtener todas las tareas
    try {
        const tareas = await Tarea.findAll();
        return res.status(200).json(tareas)
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

app.get('/api/tareas/:id', async (req, res) => {
    // Obtener tarea con el id especificado
    try {
        const id = req.params.id
        const tarea = await Tarea.findByPk(id);
        if (tarea) {
            return res.status(200).json(tarea);
        }
        res.status(400).json({ mensaje: `No existe la tarea con ID: ${id} ` });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

app.put('/api/tareas/:id', async (req, res) => {
    // ACtualizar tarea con el id especificado
    const id = req.params.id;
    const data = req.body;

    if (data.titulo === '') {
        return res.status(400).json({ mensaje: 'Debes ingresar un titulo' });
    }

    try {
        const filas_afectadas = await Tarea.update(data, {
            where: { id: id }
        });

        if (filas_afectadas[0] === 0) {
            return res.status(400).json({ mensaje: `No ha sido encontrada la tarea con ID: ${id}` });
        }
        
        res.status(200).json({ mensaje: "Tarea actualizada"});
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

app.delete('/api/tareas/:id', async (req, res) => {
    // Eliminar tarea con el id especificado
    const id = req.params.id

    try {
        const filas_afectadas = await Tarea.destroy({
            where: { id: id }
        });

        if (filas_afectadas[0] === 0) {
            return res.status(400).json({ mensaje: `No ha sido encontrada la tarea con ID: ${id}` });
        }
        res.status(200).json({ mensaje: "Tarea eliminada"});
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    
});