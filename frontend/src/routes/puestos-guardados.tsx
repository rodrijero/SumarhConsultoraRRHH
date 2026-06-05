import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Briefcase, Trash2, Bookmark } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { getSavedJobs, removeSavedJob, type SavedJob } from "@/lib/saved-jobs";

export const Route = createFileRoute("/puestos-guardados")({
  head: () => ({ meta: [{ title: "Puestos guardados — Sumarh" }] }),
  component: PuestosGuardados,
});

function PuestosGuardados() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);

  useEffect(() => {
    const read = () => setJobs(getSavedJobs());
    read();
    window.addEventListener("puestosGuardados:changed", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("puestosGuardados:changed", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const handleRemove = (slug: string) => {
    removeSavedJob(slug);
    setJobs(getSavedJobs());
  };

  return (
    <PageLayout>
      <section className="mx-auto min-h-screen max-w-6xl px-6 pb-40 pt-14">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
          Puestos guardados
        </h1>
        <p className="mt-4 max-w-2xl text-base text-foreground/70">
          Los empleos que marcaste para revisar más tarde.
        </p>

        {jobs.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-foreground/15 bg-card p-16 text-center">
            <Bookmark className="h-10 w-10 text-foreground/30" />
            <p className="mt-4 text-base font-medium text-foreground/70">
              No tenés puestos guardados aún
            </p>
            <Link
              to="/empleos"
              className="mt-6 rounded-md bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90"
            >
              Ver empleos disponibles
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {jobs.map((j) => (
              <article key={j.slug} className="rounded-xl bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{j.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-[oklch(0.55_0.16_150)]">
                      {j.company}
                    </p>
                  </div>
                  <span className="rounded-full bg-[oklch(0.92_0.04_160)] px-3 py-1 text-xs font-semibold text-[oklch(0.4_0.1_170)]">
                    Full-time
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-foreground/60">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {j.location.split("(")[0].trim()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" /> Presencial
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70 line-clamp-3">
                  {j.description}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    to={`/empleos/${j.slug}` as any}
                    className="inline-block rounded-md border border-foreground/30 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
                  >
                    Ver más
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove(j.slug)}
                    className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}