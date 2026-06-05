import { Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  variant?: "simple" | "full";
}

export function AuthLayout({ children, variant = "simple" }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F3F4F6]">
      <Briefcase
        aria-hidden
        className="pointer-events-none absolute right-12 top-12 h-64 w-64 text-foreground/5"
        strokeWidth={1.5}
      />
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6 pt-16">
        <Link to="/" className="text-4xl font-extrabold tracking-tight text-[#1a5f5f]">
          Sumarh
        </Link>
        <div className="mt-16 w-full">{children}</div>
      </main>
      <footer className="relative z-10 mt-12 border-t-2 border-[#1a5f5f]/60 bg-[#F3F4F6]">
        {variant === "full" ? (
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-8 py-6 text-sm text-foreground/70 sm:flex-row">
            <span className="font-extrabold text-[#1a5f5f]">Sumarh</span>
            <span>© 2026 Sumarh. Consultoría de Empleo Profesional.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground">Aviso de Privacidad</a>
              <a href="#" className="hover:text-foreground">Términos de Servicio</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
              <a href="#" className="hover:text-foreground">Contacto</a>
            </div>
          </div>
        ) : (
          <p className="px-6 py-6 text-center text-sm text-foreground/70">
            © 2026 Sumarh. Todos los derechos reservados.
          </p>
        )}
      </footer>
    </div>
  );
}