const http = require("http");

function hacerRequest(metodo, ruta, datos = null) {
  return new Promise((resolve, reject) => {
    const opciones = {
      hostname: "localhost",
      port: 3000,
      path: ruta,
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      }
    };

    const req = http.request(opciones, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        console.log(`\n${metodo} ${ruta}`);
        console.log(`Status: ${res.statusCode}`);
        console.log("Response:", JSON.parse(data));
        resolve();
      });
    });

    req.on("error", reject);
    if (datos) req.write(JSON.stringify(datos));
    req.end();
  });
}

async function pruebas() {
  console.log("=== PRUEBAS DE API ===");
  
  // GET todas las tareas
  await hacerRequest("GET", "/api/tareas");
  
  // GET una tarea específica
  await hacerRequest("GET", "/api/tareas/1");
  
  // POST nueva tarea
  await hacerRequest("POST", "/api/tareas", { titulo: "Nueva tarea desde Node" });
  
  // GET todas nuevamente
  await hacerRequest("GET", "/api/tareas");
  
  // PUT actualizar tarea
  await hacerRequest("PUT", "/api/tareas/1", { completado: true });
  
  // DELETE eliminar tarea
  await hacerRequest("DELETE", "/api/tareas/2");
  
  // GET final
  await hacerRequest("GET", "/api/tareas");
  
  process.exit(0);
}

pruebas().catch(console.error);
