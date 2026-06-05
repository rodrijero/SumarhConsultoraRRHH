import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sumarh — Conectamos talento con oportunidades" },
      { name: "description", content: "Transformamos tu trayectoria profesional." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageLayout>
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-6 pb-56 pt-28 text-center">
        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
          Conectamos tu talento con las mejores oportunidades
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-foreground/70">
          En Sumarh, transformamos tu trayectoria profesional. Somos expertos en vincular
          profesionales destacados con las empresas líderes del sector.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/cargar-cv"
            className="inline-flex h-14 w-[280px] items-center justify-center rounded-md bg-foreground px-6 text-sm font-bold uppercase tracking-wider text-background ring-1 ring-foreground transition-colors hover:bg-foreground/90"
          >
            Cargar CV
          </Link>
          <Link
            to="/empleos"
            className="inline-flex h-14 w-[280px] items-center justify-center rounded-md border border-foreground bg-background px-6 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground/5"
          >
            Ver empleos disponibles
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
