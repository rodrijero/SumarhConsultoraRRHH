import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getRegisteredUsers, removeRegisteredUser, type RegisteredUser } from "@/lib/auth";

export const Route = createFileRoute("/admin/usuarios")({
  component: AdminUsuarios,
});

function AdminUsuarios() {
  const [users, setUsers] = useState<RegisteredUser[]>([]);

  useEffect(() => {
    const refresh = () => setUsers(getRegisteredUsers());
    refresh();
    window.addEventListener("sumarh.users:changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sumarh.users:changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-[#0c2d2d]">Usuarios registrados</h2>
      <p className="mt-1 text-sm text-foreground/60">{users.length} usuario{users.length === 1 ? "" : "s"}</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-foreground/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#1a5f5f]/5 text-left text-xs uppercase tracking-wider text-[#1a5f5f]">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Fecha de registro</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-foreground/[0.02]">
                <td className="px-4 py-3 font-semibold text-foreground">{u.email}</td>
                <td className="px-4 py-3 text-foreground/70">{new Date(u.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => { if (confirm(`¿Eliminar al usuario ${u.email}?`)) removeRegisteredUser(u.email); }}
                    className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-foreground/50">No hay usuarios registrados todavía.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}