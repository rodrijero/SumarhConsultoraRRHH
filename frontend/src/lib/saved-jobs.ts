export interface SavedJob {
  slug: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const KEY = "puestosGuardados";

export function getSavedJobs(): SavedJob[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedJob[]) : [];
  } catch {
    return [];
  }
}

function write(jobs: SavedJob[]) {
  localStorage.setItem(KEY, JSON.stringify(jobs));
  window.dispatchEvent(new Event("puestosGuardados:changed"));
}

export function isJobSaved(slug: string): boolean {
  return getSavedJobs().some((j) => j.slug === slug);
}

export function toggleSavedJob(job: SavedJob): boolean {
  const list = getSavedJobs();
  const idx = list.findIndex((j) => j.slug === job.slug);
  if (idx >= 0) {
    list.splice(idx, 1);
    write(list);
    return false;
  }
  list.push(job);
  write(list);
  return true;
}

export function removeSavedJob(slug: string) {
  write(getSavedJobs().filter((j) => j.slug !== slug));
}