import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { getPostulaciones, removePostulacion, useLocalSubscribe } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/postulaciones")({
  component: AdminPostulaciones,
});

function AdminPostulaciones() {
  const items = useLocalSubscribe("sumarh.posts:changed", getPostulaciones);

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-bold text-[#0c2d2d]">Postulaciones</h2>
      <p className="mt-1 text-sm text-foreground/60">{items.length} postulación{items.length === 1 ? "" : "es"}</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-foreground/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#1a5f5f]/5 text-left text-xs uppercase tracking-wider text-[#1a5f5f]">
            <tr>
              <th className="px-4 py-3">Empleo</th>
              <th className="px-4 py-3">Email del postulante</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-foreground/[0.02]">
                <td className="px-4 py-3 font-semibold text-foreground">{p.jobTitle}</td>
                <td className="px-4 py-3 text-foreground/80">{p.email || "—"}</td>
                <td className="px-4 py-3 text-foreground/70">{new Date(p.date).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => { if (confirm("¿Eliminar esta postulación?")) removePostulacion(p.id); }}
                    className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-foreground/50">No hay postulaciones todavía.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}