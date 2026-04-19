// === FUNCIONES BÁSICAS ===

// Función normal
function saludar(nombre) {
  return `Hola ${nombre}`;
}

console.log(saludar("Juan"));  // "Hola Juan"

// === ARROW FUNCTIONS (la que usarás 90% del tiempo) ===

// Forma larga
const suma = (a, b) => {
  return a + b;
};

console.log(suma(5, 3));  // 8

// Forma corta (si es una línea, sin llaves)
const resta = (a, b) => a - b;

console.log(resta(10, 3));  // 7

// Una sola variable, sin paréntesis
const cuadrado = x => x * x;

console.log(cuadrado(5));  // 25

// === SCOPE (dónde existen las variables) ===

const global = "Yo existo en todo el archivo";

function miFunc() {
  const local = "Yo solo existo aquí dentro";
  console.log(global);  // ✅ OK - puedo ver la global
  console.log(local);   // ✅ OK - puedo ver la local
}

miFunc();
console.log(global);  // ✅ OK - global existe aquí
// console.log(local);  // ❌ ERROR - local NO existe aquí (está dentro de miFunc)

// === CLOSURE (función dentro de función, recuerda variables) ===

function hacerSumador(x) {
  return function(y) {
    return x + y;  // Recuerda que x = el parámetro externo
  };
}

const suma5 = hacerSumador(5);
console.log(suma5(3));   // 8 (5 + 3)
console.log(suma5(10));  // 15 (5 + 10)

// === CALLBACKS (función como parámetro) ===

function procesarNumeros(numeros, operacion) {
  return numeros.map(operacion);
}

const numeros = [1, 2, 3, 4, 5];
const multiplicadosPor2 = procesarNumeros(numeros, x => x * 2);
console.log(multiplicadosPor2);  // [2, 4, 6, 8, 10]

// === HIGHER-ORDER FUNCTIONS (función que retorna función) ===

const multiplicador = (factor) => (numero) => numero * factor;

const por3 = multiplicador(3);
console.log(por3(5));  // 15
console.log(por3(10)); // 30
