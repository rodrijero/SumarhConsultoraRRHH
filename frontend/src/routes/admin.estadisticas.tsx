import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, FileText, Send, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getJobs, getCvs, getPostulaciones, useLocalSubscribe } from "@/lib/admin-data";
import { getRegisteredUsers } from "@/lib/auth";

export const Route = createFileRoute("/admin/estadisticas")({
  component: AdminStats,
});

function AdminStats() {
  const jobs = useLocalSubscribe("sumarh.jobs:changed", getJobs);
  const cvs = useLocalSubscribe("sumarh.cvs:changed", getCvs);
  const posts = useLocalSubscribe("sumarh.posts:changed", getPostulaciones);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const refresh = () => setUsers(getRegisteredUsers().length);
    refresh();
    window.addEventListener("sumarh.users:changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sumarh.users:changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const activeJobs = jobs.filter((j) => j.status === "Activo").length;
  const cards = [
    { label: "Empleos activos", value: activeJobs, icon: Briefcase },
    { label: "CVs recibidos", value: cvs.length, icon: FileText },
    { label: "Postulaciones", value: posts.length, icon: Send },
    { label: "Usuarios registrados", value: users, icon: Users },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-bold text-[#0c2d2d]">Estadísticas</h2>
      <p className="mt-1 text-sm text-foreground/60">Resumen general de la plataforma</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-foreground/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/60">{label}</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a5f5f]/10 text-[#1a5f5f]">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-[#0c2d2d]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}