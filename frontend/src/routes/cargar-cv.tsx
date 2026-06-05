import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FileUp, CheckCircle2, Clock, Lock } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { isAuthenticated } from "@/lib/auth";
import { getCurrentSession } from "@/lib/auth";
import { addCv } from "@/lib/admin-data";

export const Route = createFileRoute("/cargar-cv")({
  head: () => ({ meta: [{ title: "Cargar CV — Sumarh" }] }),
  component: CargarCV,
});

function CargarCV() {
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!isAuthenticated()) {
      setAuthModal(true);
      return;
    }
    if (file) {
      addCv({ filename: file.name, email: getCurrentSession()?.email ?? "" });
    }
    setSent(true);
  };
  return (
    <PageLayout>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-foreground">
          Impulsa tu carrera hoy
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-foreground/70">
          Sube tu currículum para que nuestros consultores expertos puedan analizar tu
          perfil y conectarte con las mejores oportunidades ejecutivas.
        </p>

        <div
          className="mt-12 rounded-xl border-2 border-dashed border-[oklch(0.62_0.14_160)] bg-background/40 px-8 py-16"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) setFile(f);
          }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[oklch(0.93_0.03_160)]">
              <FileUp className="h-9 w-9 text-[oklch(0.45_0.12_170)]" strokeWidth={1.5} />
            </div>
            <h2 className="mt-8 text-3xl font-bold text-foreground">
              Arrastra y suelta tu CV aquí
            </h2>
            <p className="mt-3 text-sm text-foreground/60">
              O si lo prefieres, busca el archivo en tu dispositivo
            </p>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-8 rounded-md bg-foreground px-10 py-4 text-sm font-bold text-background transition-colors hover:bg-foreground/90"
            >
              {file ? file.name : "Seleccionar archivo"}
            </button>

            <button
              type="button"
              disabled={!file}
              onClick={handleSend}
              className="mt-5 rounded-md bg-[#1a5f5f] px-10 py-4 text-sm font-bold text-white transition-colors hover:bg-[#154d4d] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#1a5f5f]"
            >
              ENVIAR
            </button>

            {sent && (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.16_150)]">
                <CheckCircle2 className="h-5 w-5" />
                Tu CV fue enviado con éxito. Nos pondremos en contacto pronto.
              </p>
            )}

            <div className="mt-14 w-full border-t border-foreground/10 pt-6">
              <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-foreground/70">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />
                  Formatos: PDF, DOC, DOCX
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />
                  Límite de tamaño: 10MB
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />
                  Privacidad garantizada
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {authModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setAuthModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-extrabold text-[#1a5f5f]">Iniciá sesión para continuar</h3>
            <p className="mt-3 text-sm text-foreground/75">
              Necesitás tener una cuenta para enviar tu CV.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setAuthModal(false)}
                className="rounded-md border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground/5"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/login" })}
                className="rounded-md bg-[#1a5f5f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#154d4d]"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}