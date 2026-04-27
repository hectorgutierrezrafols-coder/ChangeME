"use client";

interface Props {
  tarea: {
    id: number;
    titulo: string;
    completado: boolean;
  };
  onCompletar: (id: number, completado: boolean) => void;
  onEliminar: (id: number) => void;
}

export default function TaskItem({ tarea, onCompletar, onEliminar }: Props) {
  return (
    <li className={`flex items-center justify-between px-4 py-3 rounded-xl border shadow-sm transition-all ${
      tarea.completado
        ? "bg-green-50 border-green-200"
        : "bg-white border-gray-200"
    }`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={tarea.completado}
          onChange={() => onCompletar(tarea.id, tarea.completado)}
          className="w-5 h-5 accent-green-500 cursor-pointer"
        />
        <span className={`text-base ${
          tarea.completado
            ? "line-through text-gray-400"
            : "text-gray-800 font-medium"
        }`}>
          {tarea.titulo}
        </span>
      </div>

      <button
        onClick={() => onEliminar(tarea.id)}
        className="text-sm text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
      >
        Eliminar
      </button>
    </li>
  );
}