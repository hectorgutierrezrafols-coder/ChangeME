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

  return (
    <div>
      <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={handleSubmit}>Añadir</button>
    </div>
  );
}