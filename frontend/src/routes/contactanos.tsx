import { createFileRoute } from "@tanstack/react-router";
import { Mail, Building2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/contactanos")({
  head: () => ({ meta: [{ title: "Contáctanos — Sumarh" }] }),
  component: Contactanos,
});

function Contactanos() {
  return (
    <PageLayout>
      <section className="mx-auto min-h-screen max-w-4xl px-6 pb-56 pt-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[oklch(0.55_0.16_150)]">
          Atención Ejecutiva
        </p>
        <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-foreground">
          Contacta con el equipo de Sumarh
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70">
          En Sumarh somos especialistas en vincular talento humano con empresas líderes
          del sector. Entendemos las necesidades de las organizaciones modernas.
        </p>

        <div className="mx-auto mt-12 max-w-2xl space-y-4 text-left">
          <InfoCard
            icon={<Mail className="h-5 w-5 text-[oklch(0.45_0.12_170)]" />}
            label="Correo Electrónico Directo"
            value="sumarh@gmail.com"
          />
          <InfoCard
            icon={<Building2 className="h-5 w-5 text-[oklch(0.45_0.12_170)]" />}
            label="Sede Corporativa"
            value="San Carlos Centro, Santa Fe, Argentina"
          />
        </div>
      </section>
    </PageLayout>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-5 rounded-xl border border-foreground/10 bg-card/60 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.93_0.03_160)]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-foreground/60">{label}</p>
        <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}