import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Briefcase, FileText, Send, Users, BarChart3, LogOut } from "lucide-react";
import { isAdmin, logout, getCurrentSession } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Panel de administración — Sumarh" }] }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin/empleos", label: "Empleos", icon: Briefcase },
  { to: "/admin/cvs", label: "CVs Recibidos", icon: FileText },
  { to: "/admin/postulaciones", label: "Postulaciones", icon: Send },
  { to: "/admin/usuarios", label: "Usuarios", icon: Users },
  { to: "/admin/estadisticas", label: "Estadísticas", icon: BarChart3 },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isAdmin()) {
      navigate({ to: "/login", replace: true });
      return;
    }
    setReady(true);
    if (pathname === "/admin" || pathname === "/admin/") {
      navigate({ to: "/admin/empleos", replace: true });
    }
  }, [navigate, pathname]);

  if (!ready) return null;

  const email = getCurrentSession()?.email ?? "admin@gmail.com";

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-foreground/10 bg-white md:flex">
        <div className="border-b border-foreground/10 px-6 py-5">
          <Link to="/admin" className="text-xl font-extrabold tracking-tight text-[#1a5f5f]">
            Sumarh Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-[#1a5f5f] text-white"
                    : "text-foreground/80 hover:bg-[#1a5f5f]/10 hover:text-[#1a5f5f]")
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-foreground/10 px-3 py-3">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-[#1a5f5f]/10 hover:text-[#1a5f5f]"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-foreground/10 bg-white px-6 py-4">
          <h1 className="text-lg font-bold text-[#0c2d2d]">Panel de administración</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground/80">{email}</span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-1.5 text-sm font-semibold text-foreground hover:border-[#1a5f5f] hover:text-[#1a5f5f]"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}