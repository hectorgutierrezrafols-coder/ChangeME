"use strict";
// === TYPESCRIPT BÁSICO ===
// TypeScript = JavaScript + TIPOS
// En JavaScript puro:
// let edad = 25;
// edad = "veinticinco";  // ❌ Error lógico, pero JS no te avisa
// En TypeScript:
let edad = 25;
// edad = "veinticinco";  // ❌ ERROR - TypeScript te avisa ANTES de ejecutar
// === TIPOS PRIMITIVOS ===
let nombre = "Juan";
let numero = 42;
let activo = true;
let nada = null;
let indefinido = undefined;
// === ARRAYS ===
let numeros = [1, 2, 3];
let textos = ["hola", "mundo"];
let mixto = [1, "dos", 3];
// Ahora puedes usar UsuarioInterface como tipo:
const usuario = {
    id: 1,
    nombre: "Juan",
    email: "juan@ejemplo.com",
    activo: true
    // edad no es obligatorio
};
// === TIPOS PARA FUNCIONES ===
// Función que recibe parámetros tipados
function sumar(a, b) {
    return a + b;
}
sumar(5, 3); // ✅ OK
// sumar(5, "3");    // ❌ ERROR - "3" es string, no number
// Con arrow functions
const restar = (a, b) => a - b;
// === UNION TYPES (múltiples tipos posibles) ===
let resultado;
resultado = 42; // ✅ OK
resultado = "error"; // ✅ OK
const estado = "pendiente"; // ✅ OK
const permisos = {
    admin: ["crear", "editar", "eliminar"],
    user: ["crear", "editar"],
    guest: ["leer"]
};
// === GENÉRICOS (tipos reutilizables) ===
// Función genérica: funciona con cualquier tipo
function obtenerPrimero(array) {
    return array[0];
}
obtenerPrimero([1, 2, 3]); // Devuelve: number
obtenerPrimero(["a", "b", "c"]); // Devuelve: string
// === ENUMS (listas de valores nombrados) ===
var Prioridad;
(function (Prioridad) {
    Prioridad[Prioridad["Baja"] = 1] = "Baja";
    Prioridad[Prioridad["Media"] = 2] = "Media";
    Prioridad[Prioridad["Alta"] = 3] = "Alta";
})(Prioridad || (Prioridad = {}));
const miTarea = {
    id: 1,
    titulo: "Aprender TypeScript",
    completado: false,
    prioridad: Prioridad.Alta
};
// === CLASSES ===
class Usuario {
    id;
    nombre;
    email;
    constructor(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }
    presentarse() {
        return `Hola, soy ${this.nombre} (${this.email})`;
    }
}
const user = new Usuario(1, "Juan", "juan@ejemplo.com");
console.log(user.presentarse());
// Ejemplo de uso:
const usuarioEjemplo = {
    id: 1,
    nombre: "Hector",
    email: "hector@ejemplo.com",
    plan: "free",
    tasasActivas: [
        {
            id: 1,
            titulo: "Aprender TypeScript",
            completado: false,
            fechaVencimiento: new Date("2024-05-01"),
            prioridad: "alta"
        }
    ],
    objetivos: [
        {
            id: 1,
            titulo: "Dominar TS",
            descripcion: "Entender tipos, interfaces, genéricos",
            progresoActual: 30,
            metaFinal: 100,
            completado: false
        }
    ],
    criadoEn: new Date()
};
console.log("=== USUARIO ===");
console.log(usuarioEjemplo);
