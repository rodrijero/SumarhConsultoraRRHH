import { createFileRoute } from "@tanstack/react-router";
import { JobPage } from "@/components/JobPage";

export const Route = createFileRoute("/empleos/limpieza")({
  head: () => ({ meta: [{ title: "Personal de Limpieza — Sumarh" }] }),
  component: () => (
    <JobPage
      slug="limpieza"
      title="Personal de Limpieza"
      company="Consultorio Dermatológico"
      location="San Carlos Centro, Santa Fe (Presencial)"
      description="Buscamos una persona responsable y detallista para integrarse al equipo de un consultorio dermatológico de primer nivel. El objetivo principal es garantizar un entorno pulcro, seguro y acogedor tanto para los pacientes como para el personal médico, siguiendo estrictos protocolos de higiene sanitaria."
      responsibilities={[
        "Realizar la limpieza y desinfección profunda de consultorios, salas de espera y áreas comunes.",
        "Manejo adecuado de residuos patológicos siguiendo las normativas vigentes.",
        "Reposición constante de insumos en sanitarios y áreas de atención (toallas, jabón, alcohol).",
        "Mantenimiento del orden general del mobiliario y cristalería.",
      ]}
      education="Título secundario completo."
      experience="Mínimo 1 año en tareas de limpieza institucional (preferiblemente en centros de salud)."
      skills={["Protocolos de bioseguridad", "Manejo de químicos", "Organización de insumos"]}
      benefits={["Incorporación inmediata", "Estabilidad laboral", "Excelente clima de trabajo", "Horarios fijos y uniforme"]}
      postulantes={8}
      publicado="2 d"
    />
  ),
});