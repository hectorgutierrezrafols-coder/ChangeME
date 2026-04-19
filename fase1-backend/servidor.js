const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

// === ENDPOINTS ===

// GET /api/tareas - Obtener todas las tareas
app.get("/api/tareas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tareas ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// GET /api/tareas/:id - Obtener una tarea específica
app.get("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tareas WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener tarea" });
  }
});

// POST /api/tareas - Crear una nueva tarea
app.post("/api/tareas", async (req, res) => {
  try {
    const { titulo, descripcion, prioridad } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ error: "El título es requerido" });
    }
    
    const result = await pool.query(
      "INSERT INTO tareas (titulo, descripcion, prioridad) VALUES ($1, $2, $3) RETURNING *",
      [titulo, descripcion || null, prioridad || "media"]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

// PUT /api/tareas/:id - Actualizar una tarea
app.put("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, completado, prioridad } = req.body;
    
    // Construir query dinámicamente
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (titulo !== undefined) {
      updates.push(`titulo = $${paramCount}`);
      values.push(titulo);
      paramCount++;
    }
    if (descripcion !== undefined) {
      updates.push(`descripcion = $${paramCount}`);
      values.push(descripcion);
      paramCount++;
    }
    if (completado !== undefined) {
      updates.push(`completado = $${paramCount}`);
      values.push(completado);
      paramCount++;
    }
    if (prioridad !== undefined) {
      updates.push(`prioridad = $${paramCount}`);
      values.push(prioridad);
      paramCount++;
    }
    
    updates.push(`actualizado_en = CURRENT_TIMESTAMP`);
    values.push(id);
    
    const query = `UPDATE tareas SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

// DELETE /api/tareas/:id - Eliminar una tarea
app.delete("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM tareas WHERE id = $1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

// === INICIAR SERVIDOR ===

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`📝 Conectado a PostgreSQL`);
  console.log(`📊 Base de datos: app_productividad`);
});
