import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { registerUser } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Crear cuenta — Sumarh" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const res = registerUser({ nombre: nombre.trim(), email: email.trim(), dni: dni.trim(), password });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate({ to: "/login", search: { registered: true } });
  };

  const inputCls =
    "w-full rounded-md border border-foreground/15 bg-white px-3 py-3 text-foreground placeholder:text-foreground/40 focus:border-[#1a5f5f] focus:outline-none";

  return (
    <AuthLayout variant="full">
      <div className="mx-auto max-w-lg">
        <div className="rounded-xl border border-foreground/5 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#0c2d2d]">Crear cuenta</h1>
          <p className="mt-3 text-base text-foreground/70">
            Completa tus datos para registrarte en nuestra plataforma de consultoría ejecutiva.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#0c2d2d]">Nombre completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                className={`mt-2 ${inputCls}`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0c2d2d]">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@sumarh.com"
                className={`mt-2 ${inputCls}`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0c2d2d]">DNI</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Número de documento"
                className={`mt-2 ${inputCls}`}
                required
              />
              <p className="mt-2 text-sm text-foreground/60">
                Tu DNI nos ayuda a evitar cuentas duplicadas.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0c2d2d]">Contraseña</label>
              <div className="relative mt-2">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crea una contraseña segura"
                  className={`${inputCls} pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                  aria-label="Mostrar contraseña"
                >
                  {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0c2d2d]">Confirmar contraseña</label>
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className={`${inputCls} pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                  aria-label="Mostrar contraseña"
                >
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-[#1a5f5f] py-3 text-base font-bold text-white transition-colors hover:bg-[#154d4d]"
            >
              Crear cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/80">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-semibold text-[#1a5f5f] hover:underline">
              Ya tengo una cuenta
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}