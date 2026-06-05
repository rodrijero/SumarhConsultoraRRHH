import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
  useLocalSubscribe,
  type AdminJob,
} from "@/lib/admin-data";

export const Route = createFileRoute("/admin/empleos")({
  component: AdminEmpleos,
});

const TYPES = ["Full-time", "Part-time", "Freelance"];
const MODES = ["Presencial", "Remoto", "Híbrido"];

type FormState = Omit<AdminJob, "id">;

const empty: FormState = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  mode: "Presencial",
  description: "",
  status: "Activo",
};

function AdminEmpleos() {
  const jobs = useLocalSubscribe("sumarh.jobs:changed", getJobs);
  const [editing, setEditing] = useState<AdminJob | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };
  const startEdit = (j: AdminJob) => {
    setEditing(j);
    setForm({
      title: j.title,
      company: j.company,
      location: j.location,
      type: j.type,
      mode: j.mode,
      description: j.description,
      status: j.status,
      slug: j.slug,
    });
    setOpen(true);
  };
  const onDelete = (j: AdminJob) => {
    if (confirm(`¿Eliminar el empleo "${j.title}"? Esta acción no se puede deshacer.`)) {
      deleteJob(j.id);
    }
  };
  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateJob(editing.id, form);
    else addJob(form);
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0c2d2d]">Gestionar empleos</h2>
          <p className="mt-1 text-sm text-foreground/60">{jobs.length} empleos en total</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-md bg-[#1a5f5f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#154d4d]"
        >
          <Plus className="h-4 w-4" />
          Agregar empleo
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-foreground/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#1a5f5f]/5 text-left text-xs uppercase tracking-wider text-[#1a5f5f]">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Modalidad</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {jobs.map((j) => (
              <tr key={j.id} className="hover:bg-foreground/[0.02]">
                <td className="px-4 py-3 font-semibold text-foreground">{j.title}</td>
                <td className="px-4 py-3 text-foreground/80">{j.company}</td>
                <td className="px-4 py-3 text-foreground/80">{j.location}</td>
                <td className="px-4 py-3 text-foreground/80">{j.type}</td>
                <td className="px-4 py-3 text-foreground/80">{j.mode}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                      (j.status === "Activo"
                        ? "bg-[#1a5f5f]/10 text-[#1a5f5f]"
                        : "bg-foreground/10 text-foreground/60")
                    }
                  >
                    {j.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => startEdit(j)}
                      className="inline-flex items-center gap-1 rounded-md border border-foreground/15 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:border-[#1a5f5f] hover:text-[#1a5f5f]"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </button>
                    <button
                      onClick={() => onDelete(j)}
                      className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-foreground/50">
                  No hay empleos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <form
            onSubmit={onSave}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0c2d2d]">
                {editing ? "Editar empleo" : "Agregar empleo"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} className="text-foreground/50 hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Título" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <Field label="Empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
              <Field label="Ubicación" value={form.location} onChange={(v) => setForm({ ...form, location: v })} required />
              <Select label="Tipo de trabajo" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={TYPES} />
              <Select label="Modalidad" value={form.mode} onChange={(v) => setForm({ ...form, mode: v })} options={MODES} />
              <Select label="Estado" value={form.status} onChange={(v) => setForm({ ...form, status: v as AdminJob["status"] })} options={["Activo", "Inactivo"]} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-[#0c2d2d]">Descripción completa</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                required
                className="mt-2 w-full rounded-md border border-foreground/15 bg-white p-3 text-sm focus:border-[#1a5f5f] focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground/5"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#1a5f5f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#154d4d]"
              >
                {editing ? "Guardar cambios" : "Crear empleo"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({
  label, value, onChange, required,
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#0c2d2d]">{label}</label>
      <input
        type="text"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-foreground/15 bg-white px-3 py-2.5 text-sm focus:border-[#1a5f5f] focus:outline-none"
      />
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#0c2d2d]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-foreground/15 bg-white px-3 py-2.5 text-sm focus:border-[#1a5f5f] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}