import { useState } from "react";

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
  const [confirmar, setConfirmar] = useState(false);
  const [visible, setVisible] = useState(false);

  function abrirModal() {
    setConfirmar(true);
    setTimeout(() => setVisible(true), 10);
  }

  function cerrarModal() {
    setVisible(false);
    setTimeout(() => setConfirmar(false), 200);
  }

  return (
    <>
      <li
        onClick={() => onCompletar(tarea.id, tarea.completado)}
        className={`flex items-center justify-between px-4 py-3 rounded-xl border shadow-sm transition-all cursor-pointer ${
          tarea.completado
            ? "bg-green-50 border-green-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={tarea.completado}
            onChange={() => onCompletar(tarea.id, tarea.completado)}
            onClick={(e) => e.stopPropagation()}
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
          onClick={(e) => {
            e.stopPropagation();
            abrirModal();
          }}
          className="text-sm text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </li>

      {confirmar && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 ${
            visible ? "bg-black/40" : "bg-black/0"
          }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 transition-all duration-200 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ¿Eliminar tarea?
            </h2>
            <p className="text-gray-500 mb-6">
              Vas a eliminar{" "}
              <span className="font-medium text-gray-700">"{tarea.titulo}"</span>.
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onEliminar(tarea.id);
                  cerrarModal();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}