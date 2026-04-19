// 1. Crea un objeto "tarea" con: id, titulo, completado, fechaVencimiento
const tarea = {
  id: 1,
  titulo: "Aprender JavaScript",
  completado: false,
  fechaVencimiento: "2024-04-30"
};

// 2. Imprime la tarea en consola
console.log("=== Tarea original ===");
console.log(tarea);

// 3. Destruye el objeto para obtener titulo y completado
const { titulo, completado } = tarea;
console.log(`\n=== Destructuring ===`);
console.log(`${titulo}: ${completado ? "✅" : "❌"}`);

// 4. Crea un array de 3 tareas
const tareas = [
  { id: 1, titulo: "JS", completado: true },
  { id: 2, titulo: "React", completado: false },
  { id: 3, titulo: "API", completado: true }
];

console.log(`\n=== Array de tareas ===`);
console.log(tareas);

// 5. Filtra solo las completadas
const completadas = tareas.filter(t => t.completado);
console.log(`\n=== Tareas completadas ===`);
console.log(completadas);

// 6. Convierte a un formato más legible
const listado = tareas.map(t => `${t.id}. ${t.titulo} - ${t.completado ? "✅" : "❌"}`);
console.log(`\n=== Listado formateado ===`);
console.log(listado.join("\n"));
