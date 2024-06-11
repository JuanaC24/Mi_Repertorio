require('dotenv').config(); 

const express = require('express');
const { Pool } = require('pg');
const Joi = require('joi');
const path = require('path');

const app = express();

// Configuración del pool de PostgreSQL usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta específica para la raíz que sirve index.html explícitamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Esquema de validación para canciones
const songSchema = Joi.object({
    titulo: Joi.string().min(3).required(),
    artista: Joi.string().min(3).required(),
    genero: Joi.string().min(3).required()
});

// Ruta POST para agregar una nueva canción
app.post('/cancion', async (req, res) => {
    const { error } = songSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { titulo, artista, genero } = req.body;
    try {
        const newSong = await pool.query(
            'INSERT INTO canciones (titulo, artista, genero) VALUES ($1, $2, $3) RETURNING *',
            [titulo, artista, genero]
        );
        res.status(201).json(newSong.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al insertar la canción en la base de datos');
    }
});

// Ruta GET para obtener todas las canciones
app.get('/canciones', async (req, res) => {
    try {
        const allSongs = await pool.query('SELECT * FROM canciones');
        res.json(allSongs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al obtener las canciones de la base de datos');
    }
});

// Ruta PUT para actualizar una canción
app.put('/cancion/:id', async (req, res) => {
    const { error } = songSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { titulo, artista, genero } = req.body;
    const { id } = req.params;
    try {
        const updateSong = await pool.query(
            'UPDATE canciones SET titulo = $1, artista = $2, genero = $3 WHERE id = $4 RETURNING *',
            [titulo, artista, genero, id]
        );
        if (updateSong.rowCount === 0) {
            return res.status(404).send('Canción no encontrada.');
        }
        res.json(updateSong.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al actualizar la canción: ' + err.message);
    }
});

// Ruta DELETE para eliminar una canción
app.delete('/cancion', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send('El id de la canción es requerido para eliminarla');
    }
    try {
        const deleteSong = await pool.query('DELETE FROM canciones WHERE id = $1', [id]);
        if (deleteSong.rowCount === 0) {
            return res.status(404).send('Canción no encontrada');
        }
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al eliminar la canción');
    }
});

// Configuración del puerto y arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
