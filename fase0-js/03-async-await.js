// === PROMESAS BÁSICAS ===

// Una Promesa es: "Te doy un resultado cuando esté listo"
const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("¡Listo!");
  }, 2000);
});

console.log("Esperando 2 segundos...");
miPromesa.then(resultado => {
  console.log(resultado);  // "¡Listo!" (después de 2 seg)
});

// === ASYNC/AWAIT (forma moderna) ===

// async = la función retorna una Promesa
async function obtenerDatos() {
  // await = espera a que se resuelva
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "Datos obtenidos";
}

// Llamar una función async
obtenerDatos().then(resultado => {
  console.log(resultado);  // "Datos obtenidos" (después de 1 seg)
});

// === FETCH (obtener datos de una API) ===

// Simulamos una API que retorna JSON
async function obtenerTareas() {
  try {
    // fetch = obtener datos de una URL
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    
    // Convertir JSON a objeto JavaScript
    const datos = await respuesta.json();
    
    return datos;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usar la función
obtenerTareas().then(tarea => {
  console.log("Tarea obtenida:", tarea);
});

// === MÚLTIPLES REQUESTS ===

async function obtenerMultiplesTareas() {
  try {
    // Obtener 3 tareas en paralelo
    const [tarea1, tarea2, tarea3] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos/1").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/todos/2").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/todos/3").then(r => r.json())
    ]);
    
    console.log("Tarea 1:", tarea1.title);
    console.log("Tarea 2:", tarea2.title);
    console.log("Tarea 3:", tarea3.title);
  } catch (error) {
    console.error("Error:", error);
  }
}

obtenerMultiplesTareas();

// === ERROR HANDLING ===

async function operacionConError() {
  try {
    // Simulamos un error
    throw new Error("Algo salió mal");
  } catch (error) {
    console.error("Capturamos el error:", error.message);
  } finally {
    console.log("Esto siempre se ejecuta");
  }
}

operacionConError();
