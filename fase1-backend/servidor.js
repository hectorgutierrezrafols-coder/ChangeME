const express = require("express");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// === DATOS DE EJEMPLO (sin BD aún) ===
let tareas = [
  { id: 1, titulo: "Aprender JavaScript", completado: true },
  { id: 2, titulo: "Aprender TypeScript", completado: false },
  { id: 3, titulo: "Crear API con Express", completado: false }
];

let contador = 3;

// === ENDPOINTS ===

// GET /api/tareas - Obtener todas las tareas
app.get("/api/tareas", (req, res) => {
  res.json(tareas);
});

// GET /api/tareas/:id - Obtener una tarea específica
app.get("/api/tareas/:id", (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  
  res.json(tarea);
});

// POST /api/tareas - Crear una nueva tarea
app.post("/api/tareas", (req, res) => {
  const { titulo } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: "El título es requerido" });
  }
  
  const nuevaTarea = {
    id: ++contador,
    titulo,
    completado: false
  };
  
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// PUT /api/tareas/:id - Actualizar una tarea
app.put("/api/tareas/:id", (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  
  if (req.body.titulo) tarea.titulo = req.body.titulo;
  if (req.body.completado !== undefined) tarea.completado = req.body.completado;
  
  res.json(tarea);
});

// DELETE /api/tareas/:id - Eliminar una tarea
app.delete("/api/tareas/:id", (req, res) => {
  const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  
  const tareaEliminada = tareas.splice(index, 1);
  res.json(tareaEliminada[0]);
});

// === INICIAR SERVIDOR ===

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`📝 Prueba: GET http://localhost:${PORT}/api/tareas`);
});
