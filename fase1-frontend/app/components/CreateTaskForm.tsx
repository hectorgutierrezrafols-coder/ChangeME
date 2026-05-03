"use client";
import { useState } from "react";

interface Props {
  onCrear: (titulo: string) => void;
}

export default function CreateTaskForm({ onCrear }: Props) {
  const [nuevaTarea, setNuevaTarea] = useState("");

  function handleSubmit() {
    if (!nuevaTarea.trim()) return;
    onCrear(nuevaTarea);
    setNuevaTarea("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="flex gap-2">
      <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nueva tarea..."
        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
      >
        Añadir
      </button>
    </div>
  );
}