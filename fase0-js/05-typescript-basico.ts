// === TYPESCRIPT BÁSICO ===
// TypeScript = JavaScript + TIPOS

// En JavaScript puro:
// let edad = 25;
// edad = "veinticinco";  // ❌ Error lógico, pero JS no te avisa

// En TypeScript:
let edad: number = 25;
// edad = "veinticinco";  // ❌ ERROR - TypeScript te avisa ANTES de ejecutar

// === TIPOS PRIMITIVOS ===

let nombre: string = "Juan";
let numero: number = 42;
let activo: boolean = true;
let nada: null = null;
let indefinido: undefined = undefined;

// === ARRAYS ===

let numeros: number[] = [1, 2, 3];
let textos: string[] = ["hola", "mundo"];
let mixto: (number | string)[] = [1, "dos", 3];

// === INTERFACES (formas de objetos) ===

interface UsuarioInterface {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
  edad?: number;  // ? = opcional
}

// Ahora puedes usar UsuarioInterface como tipo:
const usuario: UsuarioInterface = {
  id: 1,
  nombre: "Juan",
  email: "juan@ejemplo.com",
  activo: true
  // edad no es obligatorio
};

// === TIPOS PARA FUNCIONES ===

// Función que recibe parámetros tipados
function sumar(a: number, b: number): number {
  return a + b;
}

sumar(5, 3);      // ✅ OK
// sumar(5, "3");    // ❌ ERROR - "3" es string, no number

// Con arrow functions
const restar = (a: number, b: number): number => a - b;

// === UNION TYPES (múltiples tipos posibles) ===

let resultado: number | string;
resultado = 42;        // ✅ OK
resultado = "error";   // ✅ OK
// resultado = true;      // ❌ ERROR

// === TIPOS AVANZADOS ===

// Tipo basado en valores (literal types)
type EstadoTarea = "pendiente" | "completada" | "cancelada";

const estado: EstadoTarea = "pendiente";  // ✅ OK
// const estado2: EstadoTarea = "hecha";     // ❌ ERROR - no existe

// Partial: hacer todas las propiedades opcionales
interface TareaBasica {
  id: number;
  titulo: string;
  completado: boolean;
}

type TareaPartial = Partial<TareaBasica>;
// Ahora todas las propiedades de TareaBasica son opcionales

// Record: crear objeto con claves específicas
type RolePermisos = Record<"admin" | "user" | "guest", string[]>;

const permisos: RolePermisos = {
  admin: ["crear", "editar", "eliminar"],
  user: ["crear", "editar"],
  guest: ["leer"]
};

// === GENÉRICOS (tipos reutilizables) ===

// Función genérica: funciona con cualquier tipo
function obtenerPrimero<T>(array: T[]): T {
  return array[0];
}

obtenerPrimero([1, 2, 3]);          // Devuelve: number
obtenerPrimero(["a", "b", "c"]);    // Devuelve: string

// === ENUMS (listas de valores nombrados) ===

enum Prioridad {
  Baja = 1,
  Media = 2,
  Alta = 3
}

const miTarea: TareaBasica & { prioridad: Prioridad } = {
  id: 1,
  titulo: "Aprender TypeScript",
  completado: false,
  prioridad: Prioridad.Alta
};

// === CLASSES ===

class Usuario {
  id: number;
  nombre: string;
  email: string;

  constructor(id: number, nombre: string, email: string) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
  }

  presentarse(): string {
    return `Hola, soy ${this.nombre} (${this.email})`;
  }
}

const user = new Usuario(1, "Juan", "juan@ejemplo.com");
console.log(user.presentarse());

// === TIPOS ÚTILES PARA TU PROYECTO ===

interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  completado: boolean;
  fechaVencimiento: Date;
  prioridad: "baja" | "media" | "alta";
}

interface Objetivo {
  id: number;
  titulo: string;
  descripcion: string;
  progresoActual: number;
  metaFinal: number;
  completado: boolean;
}

interface UsuarioApp {
  id: number;
  nombre: string;
  email: string;
  plan: "free" | "premium";
  tasasActivas: Tarea[];
  objetivos: Objetivo[];
  criadoEn: Date;
}

// Ejemplo de uso:
const usuarioEjemplo: UsuarioApp = {
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
