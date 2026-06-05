import { createFileRoute } from "@tanstack/react-router";
import { JobPage } from "@/components/JobPage";

export const Route = createFileRoute("/empleos/repositor")({
  head: () => ({ meta: [{ title: "Repositor — Sumarh" }] }),
  component: () => (
    <JobPage
      slug="repositor"
      title="Repositor"
      company="Supermercado Kilgelmann"
      location="San Carlos Centro, Santa Fe (Presencial)"
      description="Buscamos personal para la reposición de mercadería en salón, control de stock y atención al cliente. Se requiere proactividad y disponibilidad para turnos rotativos para unirse a nuestro equipo en Supermercado Kilgelmann."
      responsibilities={[
        "Reposición de productos en góndolas.",
        "Control de fechas de vencimiento.",
        "Mantener el orden y limpieza del sector.",
        "Brindar asistencia básica a los clientes.",
      ]}
      education="Título secundario completo."
      availability="Disponibilidad horaria para turnos rotativos, actitud proactiva y responsable."
      skills={["Control de Stock", "Atención al Cliente", "Organización"]}
    />
  ),
});