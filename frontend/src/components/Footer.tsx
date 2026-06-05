import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold">Sumarh</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              Conectando talento con oportunidades líderes en el sector.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>sumarh@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>San Carlos Centro, Santa Fe, Argentina</span>
              </li>
            </ul>
          </div>
          <FooterCol title="Empresa" items={["Sobre Nosotros", "Carreras", "Blog"]} />
          <FooterCol title="Servicios" items={["Para Candidatos", "Para Empresas", "Asesoría"]} />
          <FooterCol title="Legal" items={["Privacidad", "Términos", "Cookies"]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-background/15 pt-6 text-xs text-background/60 sm:flex-row sm:items-center">
          <p>© 2026 Sumarh. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-background">LinkedIn</a>
            <a href="#" className="hover:text-background">Twitter</a>
            <a href="#" className="hover:text-background">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-background">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-background/70">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="transition-colors hover:text-background">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}