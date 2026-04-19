// === OBJETOS BÁSICOS ===

const usuario = {
  id: 1,
  nombre: "Juan",
  email: "juan@ejemplo.com",
  activo: true,
  tareas: [
    { id: 1, titulo: "JS" },
    { id: 2, titulo: "React" }
  ]
};

console.log("=== Objeto completo ===");
console.log(usuario);

// Acceder a propiedades
console.log("\n=== Acceso a propiedades ===");
console.log(usuario.nombre);        // "Juan"
console.log(usuario["email"]);      // "juan@ejemplo.com"
console.log(usuario.tareas[0].titulo);  // "JS"

// === DESTRUCTURING (extraer valores) ===

console.log("\n=== Destructuring básico ===");
const { nombre, email } = usuario;
console.log(nombre);  // "Juan"
console.log(email);   // "juan@ejemplo.com"

// Con alias
const { nombre: nombreUsuario, activo: estaActivo } = usuario;
console.log(nombreUsuario);  // "Juan"
console.log(estaActivo);     // true

// Con valores por defecto
const { rol = "user" } = usuario;
console.log(rol);  // "user" (no existe, usa el default)

// === DESTRUCTURING ANIDADO ===

console.log("\n=== Destructuring anidado ===");
const { tareas: [primeraT, segundaT] } = usuario;
console.log(primeraT.titulo);  // "JS"
console.log(segundaT.titulo);  // "React"

// === DESTRUCTURING DE ARRAYS ===

console.log("\n=== Destructuring de arrays ===");
const numeros = [1, 2, 3, 4, 5];
const [primero, segundo, ...resto] = numeros;
console.log(primero);  // 1
console.log(segundo);  // 2
console.log(resto);    // [3, 4, 5]

// === SPREAD OPERATOR (...) ===

console.log("\n=== Spread operator ===");

// Copiar objeto
const usuarioCopia = { ...usuario };
console.log(usuarioCopia);

// Mergear objetos
const direccion = { ciudad: "Barcelona", pais: "España" };
const usuarioCompleto = { ...usuario, ...direccion };
console.log(usuarioCompleto);

// Copiar array
const tareasOriginales = [{ id: 1, titulo: "JS" }];
const tareasCopiadas = [...tareasOriginales];
console.log(tareasCopiadas);

// === MÉTODOS DE OBJETO ===

console.log("\n=== Métodos de objeto ===");
console.log(Object.keys(usuario));      // ["id", "nombre", "email", ...]
console.log(Object.values(usuario));    // [1, "Juan", "juan@ejemplo.com", ...]
console.log(Object.entries(usuario));   // [["id", 1], ["nombre", "Juan"], ...]

// === MAPEO DE PROPIEDADES ===

console.log("\n=== Mapeo de propiedades ===");
const usuarioTexto = Object.entries(usuario).map(([clave, valor]) => {
  return `${clave}: ${JSON.stringify(valor)}`;
});
console.log(usuarioTexto.join("\n"));

// === OBJETOS COMO PARÁMETROS ===

console.log("\n=== Objetos como parámetros ===");

function mostrarUsuario({ nombre, email, activo = false }) {
  console.log(`Nombre: ${nombre}, Email: ${email}, Activo: ${activo}`);
}

mostrarUsuario(usuario);  // Destructuring en parámetros

// === MÉTODOS EN OBJETOS ===

console.log("\n=== Métodos en objetos ===");

const producto = {
  nombre: "Laptop",
  precio: 1000,
  descuento: 0.2,
  getPrecioFinal() {
    return this.precio * (1 - this.descuento);
  }
};

console.log(producto.getPrecioFinal());  // 800
