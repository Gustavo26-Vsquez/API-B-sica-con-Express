

const express = require('express');
const cors = require('cors');
const estudiantesRouter = require('./routes/estudiantes.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------- Middlewares globales -------------------
app.use(cors());            // Permite peticiones desde otros orígenes (ej. frontend)
app.use(express.json());    // Permite leer JSON en el body de las peticiones

// ------------------- Endpoint de prueba (health check) -------------------
// Este endpoint sirve para verificar que la API está viva y respondiendo.
// Es una práctica muy común en APIs reales (Kubernetes, balanceadores de
// carga, monitoreo, etc. lo usan para saber si el servicio está activo).
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'La API está funcionando correctamente 🚀',
    timestamp: new Date().toISOString(),
  });
});

// Ruta raíz informativa (opcional, útil para quien abre la API en el navegador)
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Bienvenido a la API REST de ejemplo',
    endpoints_disponibles: [
      'GET    /api/health',
      'GET    /api/estudiantes',
      'GET    /api/estudiantes/:id',
      'POST   /api/estudiantes',
      'PUT    /api/estudiantes/:id',
      'DELETE /api/estudiantes/:id',
    ],
  });
});

// ------------------- Rutas del recurso "estudiantes" -------------------
app.use('/api/estudiantes', estudiantesRouter);

// ------------------- Manejo de ruta no encontrada (404) -------------------
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta_solicitada: req.originalUrl,
  });
});

// ------------------- Manejo de errores centralizado -------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ------------------- Iniciar el servidor -------------------
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔎 Endpoint de prueba: http://localhost:${PORT}/api/health`);
});

module.exports = app;
