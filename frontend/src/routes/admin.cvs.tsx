import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { getCvs, removeCv, useLocalSubscribe } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/cvs")({
  component: AdminCvs,
});

function AdminCvs() {
  const cvs = useLocalSubscribe("sumarh.cvs:changed", getCvs);

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-bold text-[#0c2d2d]">CVs recibidos</h2>
      <p className="mt-1 text-sm text-foreground/60">{cvs.length} CV{cvs.length === 1 ? "" : "s"} en total</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-foreground/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#1a5f5f]/5 text-left text-xs uppercase tracking-wider text-[#1a5f5f]">
            <tr>
              <th className="px-4 py-3">Archivo</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {cvs.map((c) => (
              <tr key={c.id} className="hover:bg-foreground/[0.02]">
                <td className="px-4 py-3 font-semibold text-foreground">{c.filename}</td>
                <td className="px-4 py-3 text-foreground/80">{c.email || "—"}</td>
                <td className="px-4 py-3 text-foreground/70">{new Date(c.sentAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => { if (confirm("¿Eliminar este CV?")) removeCv(c.id); }}
                    className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {cvs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-foreground/50">No hay CVs recibidos todavía.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}