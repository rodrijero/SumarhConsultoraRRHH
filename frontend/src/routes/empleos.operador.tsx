import { createFileRoute } from "@tanstack/react-router";
import { JobPage } from "@/components/JobPage";

export const Route = createFileRoute("/empleos/operador")({
  head: () => ({ meta: [{ title: "Operador de Producción — Sumarh" }] }),
  component: () => (
    <JobPage
      slug="operador"
      title="Operador de Producción"
      company="Lheritier"
      location="San Carlos Centro, Santa Fe (Presencial)"
      description="Buscamos personal para tareas operativas relacionadas con la elaboración y empaque de nuestros productos alimenticios. Se requiere compromiso con la calidad y disponibilidad para trabajar en turnos rotativos."
      responsibilities={[
        "Operación de maquinarias de producción.",
        "Empaque y etiquetado de productos.",
        "Control de calidad del producto final.",
        "Mantenimiento de limpieza y orden en el área de trabajo.",
      ]}
      education="Secundario completo."
      availability="Disponibilidad para turnos rotativos. Experiencia previa en plantas de producción (deseable)."
      skills={["Operación de máquinas", "Control de calidad", "Normas de inocuidad alimentaria"]}
    />
  ),
});