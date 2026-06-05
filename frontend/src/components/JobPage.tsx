import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Bookmark, BookmarkCheck, CheckCircle2, FileUp, Headphones, BadgeCheck, Smile, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { PageLayout } from "./PageLayout";
import { isJobSaved, toggleSavedJob } from "@/lib/saved-jobs";
import { isAuthenticated, getCurrentSession } from "@/lib/auth";
import { addPostulacion } from "@/lib/admin-data";

interface JobPageProps {
  slug: string;
  title: string;
  company: string;
  description: string;
  responsibilities: string[];
  education: string;
  location: string;
  availability?: string;
  experience?: string;
  skills: string[];
  benefits?: string[];
  postulantes?: number;
  publicado?: string;
}

export function JobPage({
  slug,
  title,
  company,
  description,
  responsibilities,
  education,
  location,
  availability,
  experience,
  skills,
  benefits = ["Incorporación inmediata", "Estabilidad laboral", "Excelente clima de trabajo"],
  postulantes = 12,
  publicado = "1 d",
}: JobPageProps) {
  const [saved, setSaved] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setSaved(isJobSaved(slug));
  }, [slug]);

  const onToggleSave = () => {
    if (!isAuthenticated()) {
      setAuthModal(true);
      return;
    }
    const now = toggleSavedJob({ slug, title, company, location, description });
    setSaved(now);
  };

  const onPostular = () => {
    if (!isAuthenticated()) {
      setAuthModal(true);
      return;
    }
    addPostulacion({ jobTitle: title, jobId: slug, email: getCurrentSession()?.email ?? "" });
    alert("¡Postulación enviada!");
  };

  return (
    <PageLayout>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link to="/empleos" className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.16_150)] hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Volver a empleos
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div>
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-[oklch(0.92_0.04_160)] px-3 py-1 text-xs font-semibold text-[oklch(0.4_0.1_170)]">
                Full-time
              </span>
              <span className="flex items-center gap-1.5 text-foreground/60">
                <MapPin className="h-4 w-4" /> {location}
              </span>
            </div>

            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
                <p className="mt-2 text-lg font-semibold text-[oklch(0.55_0.16_150)]">{company}</p>
              </div>
              <button
                type="button"
                onClick={onToggleSave}
                className={
                  saved
                    ? "flex shrink-0 items-center gap-2 rounded-lg border border-[oklch(0.55_0.16_150)] bg-[oklch(0.55_0.16_150)]/10 px-4 py-2.5 text-sm font-semibold text-[oklch(0.4_0.1_170)] hover:bg-[oklch(0.55_0.16_150)]/15"
                    : "flex shrink-0 items-center gap-2 rounded-lg border border-foreground/15 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground/5"
                }
              >
                {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {saved ? "Puesto guardado" : "Guardar puesto"}
              </button>
            </div>

            <hr className="my-8 border-foreground/10" />

            <h2 className="text-xl font-bold text-foreground">Sobre el puesto</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">{description}</p>

            <h2 className="mt-10 text-xl font-bold text-foreground">Responsabilidades</h2>
            <ul className="mt-4 space-y-3">
              {responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.62_0.14_160)]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold text-foreground">Requisitos</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ReqCard label="Educación" value={education} />
              <ReqCard label="Ubicación" value={location.includes("(") ? "Residir en San Carlos Centro o zonas cercanas." : location} />
            </div>

            <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.16_150)]">
                {experience ? "Experiencia" : "Disponibilidad"}
              </p>
              <p className="mt-2 text-sm text-foreground/80">{experience ?? availability}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.16_150)]">
                Habilidades técnicas
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="rounded-md bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.16_150)]">Beneficios</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {benefits.map((b, i) => (
                  <li key={b} className="flex items-center gap-2">
                    {i === 0 && <BadgeCheck className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />}
                    {i === 1 && <BadgeCheck className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />}
                    {i === 2 && <Smile className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />}
                    {i > 2 && <Clock className="h-4 w-4 text-[oklch(0.62_0.14_160)]" />}
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border border-foreground/10 bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">Postularse</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Sube tu CV para unirte al equipo de {company}.
              </p>
              <label className="mt-5 block cursor-pointer rounded-xl border-2 border-dashed border-foreground/20 bg-foreground/[0.02] p-8 text-center hover:bg-foreground/[0.04]">
                <input type="file" className="hidden" accept=".pdf,.docx" />
                <FileUp className="mx-auto h-7 w-7 text-[oklch(0.45_0.12_170)]" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Haz clic para subir o arrastra tu CV
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  Formatos aceptados: PDF, DOCX (Máx. 5MB)
                </p>
              </label>
              <button
                onClick={onPostular}
                className="mt-5 w-full rounded-lg bg-[oklch(0.5_0.13_170)] py-3 text-sm font-bold text-white hover:bg-[oklch(0.45_0.13_170)]"
              >
                Postularme ahora
              </button>
              <p className="mt-3 text-center text-xs text-foreground/50">
                Al hacer clic, aceptas que Sumarh procese tus datos de acuerdo con nuestro{" "}
                <a className="underline" href="#">Aviso de Privacidad</a>.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-5 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">{postulantes}</p>
                  <p className="text-xs text-foreground/60">Postulantes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{publicado}</p>
                  <p className="text-xs text-foreground/60">Publicado</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-foreground p-5 text-background">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">¿Tienes dudas?</p>
                <p className="text-xs text-background/70">Contactar soporte</p>
              </div>
            </div>
          </aside>
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
              Necesitás tener una cuenta para guardar puestos o postularte a empleos.
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

function ReqCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.16_150)]">
        {label}
      </p>
      <p className="mt-2 text-sm text-foreground/80">{value}</p>
    </div>
  );
}