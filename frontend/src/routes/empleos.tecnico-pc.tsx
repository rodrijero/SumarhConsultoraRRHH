import { createFileRoute } from "@tanstack/react-router";
import { JobPage } from "@/components/JobPage";

export const Route = createFileRoute("/empleos/tecnico-pc")({
  head: () => ({ meta: [{ title: "Técnico de PC — Sumarh" }] }),
  component: () => (
    <JobPage
      slug="tecnico-pc"
      title="Técnico de PC"
      company="TechFix Soluciones"
      location="San Carlos Centro, Santa Fe (Presencial)"
      description="Buscamos un Técnico de PC con experiencia para integrarse a nuestro equipo de soporte. El candidato ideal será responsable del diagnóstico, reparación y mantenimiento de equipos informáticos, garantizando un servicio de alta calidad para nuestros clientes."
      responsibilities={[
        "Diagnóstico y reparación de hardware de computadoras y laptops.",
        "Instalación y configuración de sistemas operativos y software.",
        "Mantenimiento preventivo y correctivo de equipos.",
        "Brindar soporte técnico presencial y remoto a clientes.",
      ]}
      education="Técnico en Informática, Electrónica o carreras afines."
      availability="Disponibilidad horaria para turnos rotativos, actitud proactiva y responsable."
      skills={["Reparación de Hardware", "Redes y Conectividad", "Soporte Técnico"]}
    />
  ),
});