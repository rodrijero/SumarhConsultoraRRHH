import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";

const navLinkBase =
  "relative py-2 text-[15px] font-medium text-foreground/90 transition-colors hover:text-foreground";
const navLinkActive =
  "relative py-2 text-[15px] font-semibold text-[oklch(0.62_0.14_160)] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[oklch(0.62_0.14_160)]";

export function Header() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("sumarh.session");
        setEmail(raw ? (JSON.parse(raw).email as string) : null);
      } catch {
        setEmail(null);
      }
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-foreground">
          Sumarh
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          <Link to="/" className={navLinkBase} activeOptions={{ exact: true }} activeProps={{ className: navLinkActive }}>
            Inicio
          </Link>
          <Link to="/crear-cv" className={navLinkBase} activeProps={{ className: navLinkActive }}>
            Crea tu CV
          </Link>
          <Link to="/contactanos" className={navLinkBase} activeProps={{ className: navLinkActive }}>
            Contáctanos
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {email ? (
            <UserMenu email={email} />
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-foreground/80 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}