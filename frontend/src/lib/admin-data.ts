export interface AdminJob {
  id: string;
  slug?: string; // optional link to dedicated detail page (seed jobs)
  title: string;
  company: string;
  location: string;
  type: string;
  mode: string;
  description: string;
  status: "Activo" | "Inactivo";
}

export interface CvRecord {
  id: string;
  filename: string;
  email: string;
  sentAt: string;
}

export interface PostulacionRecord {
  id: string;
  jobTitle: string;
  jobId?: string;
  email: string;
  date: string;
}

const JOBS_KEY = "sumarh.admin.jobs";
const CVS_KEY = "sumarh.admin.cvs";
const POSTS_KEY = "sumarh.admin.postulaciones";

const SEED_JOBS: AdminJob[] = [
  {
    id: "repositor",
    slug: "/empleos/repositor",
    title: "Repositor",
    company: "Supermercado Kilgelmann",
    location: "San Carlos Centro",
    type: "Full-time",
    mode: "Presencial",
    description:
      "Buscamos personal para reposición de mercadería en salón, control de stock y atención al cliente. Se requiere proactividad y disponibilidad horaria para turnos rotativos…",
    status: "Activo",
  },
  {
    id: "tecnico-pc",
    slug: "/empleos/tecnico-pc",
    title: "Técnico de PC",
    company: "TechFix Soluciones",
    location: "Rosario",
    type: "Full-time",
    mode: "Presencial",
    description:
      "Buscamos un técnico experto para nuestro taller. Las tareas principales incluyen la reparación de hardware, mantenimiento preventivo/correctivo y ensamblaje de equipos a medida. Se…",
    status: "Activo",
  },
  {
    id: "operador",
    slug: "/empleos/operador",
    title: "Operador de Producción",
    company: "Lheritier",
    location: "San Carlos Centro",
    type: "Full-time",
    mode: "Presencial",
    description:
      "Buscamos personal para tareas operativas relacionadas con la elaboración y empaque de nuestros productos alimenticios. Se requiere compromiso con la calidad y disponibilidad para trabaja…",
    status: "Activo",
  },
  {
    id: "limpieza",
    slug: "/empleos/limpieza",
    title: "Personal de Limpieza",
    company: "Consultorio Dermatológico",
    location: "Rafaela",
    type: "Part-time",
    mode: "Presencial",
    description:
      "Buscamos una persona responsable para realizar tareas de limpieza y mantenimiento de higiene en nuestro consultorio dermatológico. Se valorará la puntualidad, proactividad y…",
    status: "Activo",
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function emit(event: string) {
  window.dispatchEvent(new Event(event));
}

/* ===== Jobs ===== */
export function getJobs(): AdminJob[] {
  if (typeof window === "undefined") return SEED_JOBS;
  const raw = localStorage.getItem(JOBS_KEY);
  if (!raw) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(SEED_JOBS));
    return SEED_JOBS;
  }
  try {
    return JSON.parse(raw) as AdminJob[];
  } catch {
    return SEED_JOBS;
  }
}

function writeJobs(list: AdminJob[]) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(list));
  emit("sumarh.jobs:changed");
}

export function addJob(job: Omit<AdminJob, "id" | "status"> & { status?: AdminJob["status"] }): AdminJob {
  const list = getJobs();
  const created: AdminJob = {
    ...job,
    id: crypto.randomUUID(),
    status: job.status ?? "Activo",
  };
  list.push(created);
  writeJobs(list);
  return created;
}

export function updateJob(id: string, patch: Partial<AdminJob>) {
  const list = getJobs().map((j) => (j.id === id ? { ...j, ...patch } : j));
  writeJobs(list);
}

export function deleteJob(id: string) {
  writeJobs(getJobs().filter((j) => j.id !== id));
}

/* ===== CVs ===== */
export function getCvs(): CvRecord[] {
  return read<CvRecord[]>(CVS_KEY, []);
}
export function addCv(rec: Omit<CvRecord, "id" | "sentAt">) {
  const list = getCvs();
  list.push({ ...rec, id: crypto.randomUUID(), sentAt: new Date().toISOString() });
  localStorage.setItem(CVS_KEY, JSON.stringify(list));
  emit("sumarh.cvs:changed");
}
export function removeCv(id: string) {
  localStorage.setItem(CVS_KEY, JSON.stringify(getCvs().filter((c) => c.id !== id)));
  emit("sumarh.cvs:changed");
}

/* ===== Postulaciones ===== */
export function getPostulaciones(): PostulacionRecord[] {
  return read<PostulacionRecord[]>(POSTS_KEY, []);
}
export function addPostulacion(rec: Omit<PostulacionRecord, "id" | "date">) {
  const list = getPostulaciones();
  list.push({ ...rec, id: crypto.randomUUID(), date: new Date().toISOString() });
  localStorage.setItem(POSTS_KEY, JSON.stringify(list));
  emit("sumarh.posts:changed");
}
export function removePostulacion(id: string) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(getPostulaciones().filter((p) => p.id !== id)));
  emit("sumarh.posts:changed");
}

/* ===== Hook helper ===== */
import { useEffect, useState } from "react";
export function useLocalSubscribe<T>(event: string, getter: () => T): T {
  const [val, setVal] = useState<T>(() => getter());
  useEffect(() => {
    const handler = () => setVal(getter());
    handler();
    window.addEventListener(event, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(event, handler);
      window.removeEventListener("storage", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return val;
}