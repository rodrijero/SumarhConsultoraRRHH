import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobs, useLocalSubscribe } from "@/lib/admin-data";

export const Route = createFileRoute("/empleos/")({
  head: () => ({ meta: [{ title: "Empleos disponibles — Sumarh" }] }),
  component: Empleos,
});

const LOCATIONS = ["Todas", "San Carlos Centro", "Rosario", "Rafaela", "San Jorge", "San Vicente", "Gálvez", "Remoto"];
const TYPES = ["Todos", "Full-time", "Part-time", "Freelance"];
const MODES = ["Todos", "Presencial", "Remoto", "Híbrido"];

function Empleos() {
  const jobs = useLocalSubscribe("sumarh.jobs:changed", getJobs).filter((j) => j.status === "Activo");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Todas");
  const [type, setType] = useState("Todos");
  const [mode, setMode] = useState("Todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (q && !`${j.title} ${j.company} ${j.description}`.toLowerCase().includes(q)) return false;
      if (location !== "Todas" && j.location !== location) return false;
      if (type !== "Todos" && j.type !== type) return false;
      if (mode !== "Todos" && j.mode !== mode) return false;
      return true;
    });
  }, [query, location, type, mode, jobs]);

  const resetFilters = () => {
    setSearchInput("");
    setQuery("");
    setLocation("Todas");
    setType("Todos");
    setMode("Todos");
  };

  return (
    <PageLayout>
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
          Empleos disponibles
        </h1>
        <p className="mt-4 whitespace-nowrap text-sm text-foreground/70">
          Explora oportunidades exclusivas que se alinean con tu perfil profesional y
          aspiraciones de carrera.
        </p>

        {/* Search + filters */}
        <div className="mt-10 rounded-2xl border border-foreground/10 bg-card p-5 shadow-sm">
          <form
            className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(searchInput);
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Posición, empresa o palabra clave"
                className="h-12 w-full rounded-lg border border-foreground/10 bg-background pl-11 pr-4 text-sm outline-none focus:border-foreground/30"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Buscar
            </button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-foreground/70">Filtrar por:</span>
            <FilterSelect label="Ubicación" value={location} onChange={setLocation} options={LOCATIONS} />
            <FilterSelect label="Tipo de trabajo" value={type} onChange={setType} options={TYPES} />
            <FilterSelect label="Remoto/Presencial" value={mode} onChange={setMode} options={MODES} />
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-4 py-1.5 text-foreground/80 hover:border-foreground/30"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Job cards */}
        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-base text-foreground/60">
            No se encontraron empleos para tu búsqueda
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((j) => (
            <article key={j.id} className="rounded-xl bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{j.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-[oklch(0.55_0.16_150)]">
                    {j.company}
                  </p>
                </div>
                <span className="rounded-full bg-[oklch(0.92_0.04_160)] px-3 py-1 text-xs font-semibold text-[oklch(0.4_0.1_170)]">
                  {j.type}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-foreground/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {j.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" /> {j.mode}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">{j.description}</p>
              {j.slug && (
                <Link
                  to={j.slug as "/empleos/repositor"}
                  className="mt-5 inline-block rounded-md border border-foreground/30 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
                >
                  Ver más
                </Link>
              )}
            </article>
          ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded border border-foreground/15 text-foreground/60 hover:bg-foreground/5">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded bg-foreground text-sm font-semibold text-background">
            1
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded text-sm text-foreground/60 hover:bg-foreground/5">
            2
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded text-sm text-foreground/60 hover:bg-foreground/5">
            3
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded border border-foreground/15 text-foreground/60 hover:bg-foreground/5">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-20 grid gap-10 border-t border-foreground/10 pt-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              ¿No encuentras la posición ideal?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Únete a nuestra base de talentos exclusiva. Analizamos tu CV y te
              contactamos cuando surja una vacante que encaje perfectamente con tu
              trayectoria.
            </p>
            <Link
              to="/cargar-cv"
              className="mt-6 inline-block rounded-md bg-[oklch(0.55_0.14_170)] px-7 py-3 text-sm font-bold text-white hover:bg-[oklch(0.5_0.14_170)]"
            >
              Enviar mi CV
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&auto=format&fit=crop"
            alt="Reunión de equipo"
            className="aspect-video w-full rounded-xl object-cover shadow-lg"
          />
        </div>
      </section>
    </PageLayout>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-auto w-auto rounded-full border-foreground/15 bg-background px-4 py-1.5 text-foreground/80 hover:border-foreground/30">
        <SelectValue>
          <span className="text-sm">
            {label}: <span className="font-semibold">{value}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}