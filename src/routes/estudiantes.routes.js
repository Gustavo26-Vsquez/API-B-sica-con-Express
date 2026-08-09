

const express = require('express');
const router = express.Router();

// "Base de datos" en memoria
let estudiantes = [
  { id: 1, nombre: 'Ana López', carrera: 'Desarrollo de Software' },
  { id: 2, nombre: 'Carlos Pérez', carrera: 'Redes y Telecomunicaciones' },
  { id: 3, nombre: 'María Hernández', carrera: 'Desarrollo de Software' },
];

let siguienteId = 4;

// GET /api/estudiantes -> Listar todos
router.get('/', (req, res) => {
  res.status(200).json(estudiantes);
});

// GET /api/estudiantes/:id -> Obtener uno por id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: `No existe un estudiante con id ${id}` });
  }
  res.status(200).json(estudiante);
});

// POST /api/estudiantes -> Crear nuevo
router.post('/', (req, res) => {
  const { nombre, carrera } = req.body;

  if (!nombre || !carrera) {
    return res.status(400).json({ error: 'Los campos "nombre" y "carrera" son obligatorios' });
  }

  const nuevoEstudiante = { id: siguienteId++, nombre, carrera };
  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

// PUT /api/estudiantes/:id -> Actualizar existente
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: `No existe un estudiante con id ${id}` });
  }

  const { nombre, carrera } = req.body;
  if (nombre) estudiante.nombre = nombre;
  if (carrera) estudiante.carrera = carrera;

  res.status(200).json(estudiante);
});

// DELETE /api/estudiantes/:id -> Eliminar
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = estudiantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: `No existe un estudiante con id ${id}` });
  }

  const eliminado = estudiantes.splice(indice, 1)[0];
  res.status(200).json({ mensaje: 'Estudiante eliminado', estudiante: eliminado });
});

module.exports = router;
