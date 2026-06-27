import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { User, Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { loginUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión — Sumarh" }] }),
  validateSearch: (search: Record<string, unknown>): { registered?: boolean } => {
    const registered = search.registered === "true" || search.registered === true;
    return registered ? { registered: true } : {};
  },
  component: LoginPage,
});

function LoginPage() {
  const { registered } = Route.useSearch();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = loginUser(identifier, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate({ to: res.admin ? "/admin" : "/" });
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-md">
        {registered && (
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-[#1a5f5f]/40 bg-[#f0fdf4] p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1a5f5f]" />
            <div>
              <p className="font-bold text-[#1a5f5f]">Cuenta creada con éxito</p>
              <p className="text-sm text-[#1a5f5f]/80">Inicie sesión para continuar</p>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-foreground/5 bg-white p-8 shadow-sm">
          <h1 className="text-center text-3xl font-extrabold text-[#0c2d2d]">Bienvenido</h1>
          <p className="mt-3 text-center text-base text-foreground/70">
            Ingresa tus credenciales para continuar con tu trayectoria profesional.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#0c2d2d]">Nombre o Email</label>
              <div className="relative mt-2">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ejemplo@sumarh.com"
                  className="w-full rounded-md border border-foreground/15 bg-white py-3 pl-11 pr-3 text-foreground placeholder:text-foreground/40 focus:border-[#1a5f5f] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-[#0c2d2d]">Contraseña</label>
                <a href="#" className="text-sm text-[#1a5f5f] hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-foreground/15 bg-white py-3 pl-11 pr-11 text-foreground placeholder:text-foreground/40 focus:border-[#1a5f5f] focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-[#1a5f5f]"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-foreground/80">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-foreground/30 accent-[#1a5f5f]"
              />
              Recordar mi sesión en este equipo
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-md bg-[#1a5f5f] py-3 text-base font-bold text-white transition-colors hover:bg-[#154d4d]"
            >
              Iniciar sesión
            </button>
          </form>

          <hr className="my-6 border-foreground/10" />

          <p className="text-center text-sm text-foreground/80">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-semibold text-[#1a5f5f] hover:underline">
              Solicitar acceso
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}