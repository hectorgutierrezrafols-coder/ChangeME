"use client";

import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import CreateTaskForm from "./components/CreateTaskForm";

export default function Home() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    const res = await fetch("http://localhost:3000/api/tareas");
    const data = await res.json();
    setTareas(data);
  }

  async function crearTarea(titulo: string) {
    await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    cargarTareas();
  }

  async function eliminarTarea(id: number) {
    await fetch(`http://localhost:3000/api/tareas/${id}`, {
      method: "DELETE",
    });
    cargarTareas();
  }

  async function completarTarea(id: number, completado: boolean) {
    await fetch(`http://localhost:3000/api/tareas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completado: !completado }),
    });
    cargarTareas();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis tareas</h1>
        <CreateTaskForm onCrear={crearTarea} />
        <ul className="mt-6 space-y-3">
          {tareas.map((tarea: any) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              onCompletar={completarTarea}
              onEliminar={eliminarTarea}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}