import { createFileRoute } from "@tanstack/react-router";
import { PenSquare, Brain, BadgeCheck, Headphones, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/crear-cv")({
  head: () => ({ meta: [{ title: "Crea tu CV — Sumarh" }] }),
  component: CreaTuCV,
});

const features = [
  {
    icon: PenSquare,
    title: "Estructura Estratégica",
    text: "Analizamos tu trayectoria para resaltar los logros que realmente impactan en tu sector específico.",
  },
  {
    icon: Brain,
    title: "Enfoque Psicológico",
    text: "Diseñamos la jerarquía visual basándonos en cómo los reclutadores escanean la información en segundos.",
  },
  {
    icon: BadgeCheck,
    title: "Optimización ATS",
    text: "Aseguramos que tu CV sea legible por los sistemas automáticos de filtrado de las grandes empresas.",
  },
  {
    icon: Headphones,
    title: "Preparación para Entrevistas",
    text: "Te brindamos herramientas y asesoría para prepararte y destacar en entrevistas laborales, aumentando tus posibilidades de éxito.",
  },
];

function CreaTuCV() {
  return (
    <PageLayout>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Tu CV es tu carta de presentación al mundo
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/70">
            Un currículum bien estructurado no solo cuenta tu historia laboral, sino que
            proyecta tu potencial. En el mercado actual, tienes solo{" "}
            <span className="font-semibold text-[oklch(0.55_0.16_150)]">6 segundos</span>{" "}
            para captar la atención de un reclutador. Queremos ayudarte a que esos segundos valgan la pena.
          </p>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-3 rounded-lg bg-[oklch(0.65_0.18_150)] px-7 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[oklch(0.6_0.18_150)]"
          >
            <MessageCircle className="h-5 w-5" />
            Hablar con un asesor por WhatsApp
          </a>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-foreground/5">
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop"
            alt="Currículum profesional"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl bg-card p-7 shadow-sm">
              <f.icon className="h-7 w-7 text-foreground" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}