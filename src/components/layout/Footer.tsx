import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl text-white">Bistro Polanco</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-stone-500">
              Alta Cocina · Ciudad de México
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Una experiencia gastronómica de vanguardia en el corazón de Polanco,
              donde cada platillo narra la historia de sus ingredientes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-300">
              Experiencia
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Menú", "/menu"],
                ["Menú Degustación", "/menu#degustacion"],
                ["Reservaciones", "/reservaciones"],
                ["Eventos & Catering", "/eventos"],
                ["Nosotros", "/nosotros"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-300">
              Visítanos
            </h3>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed">
              <p>Presidente Masaryk 123</p>
              <p>Polanco V Sección</p>
              <p>Ciudad de México, CDMX</p>
              <p className="mt-3">
                <a href="tel:+525555551234" className="hover:text-white transition-colors">
                  +52 55 5555 1234
                </a>
              </p>
              <p>
                <a
                  href="mailto:reservaciones@bistropolanco.mx"
                  className="hover:text-white transition-colors"
                >
                  reservaciones@bistropolanco.mx
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} Bistro Polanco. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
