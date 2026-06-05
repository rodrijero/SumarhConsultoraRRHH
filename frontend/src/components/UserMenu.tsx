import { useEffect, useRef, useState } from "react";
import { User, LogOut, Bookmark } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/lib/auth";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-[#1a5f5f] hover:text-[#1a5f5f]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a5f5f] text-white">
          <User className="h-4 w-4" />
        </span>
        <span className="hidden max-w-[180px] truncate sm:inline">{email}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-md border border-foreground/10 bg-white shadow-lg">
          <div className="border-b border-foreground/10 px-4 py-3">
            <p className="text-xs text-foreground/60">Sesión iniciada como</p>
            <p className="truncate text-sm font-semibold text-foreground">{email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate({ to: "/puestos-guardados" });
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[#1a5f5f] hover:text-white"
          >
            <Bookmark className="h-4 w-4" />
            Ver puestos guardados
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[#1a5f5f] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}