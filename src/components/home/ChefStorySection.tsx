export function ChefStorySection() {
  return (
    <section className="overflow-hidden bg-stone-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Image placeholder */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-800">
            {/* Replace with next/image */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
          </div>

          {/* Copy */}
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400">
              Detrás de los Fogones
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-5xl">
              Una cocina guiada
              <br />
              <span className="italic">por el origen</span>
            </h2>
            <p className="mt-6 text-stone-400 leading-relaxed">
              Nuestro chef ejecutivo inició su formación en Lyon y pasó una
              década perfeccionando técnicas clásicas antes de regresar a México
              para celebrar los ingredientes que lo vieron crecer: el maíz azul
              de Oaxaca, la trucha de los ríos de Michoacán y la trufa negra que
              llega cada enero directamente de Périgord.
            </p>
            <p className="mt-4 text-stone-400 leading-relaxed">
              Cada platillo en el menú tiene una historia de origen verificable.
              Trabajamos directamente con 23 productores locales y 4 importadores
              especializados para garantizar la trazabilidad de cada ingrediente
              en tu mesa.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-stone-800 pt-8">
              {[
                { stat: "23", label: "Productores locales" },
                { stat: "7", label: "Tiempos, menú degustación" },
                { stat: "2016", label: "Año de apertura" },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <dt className="font-serif text-3xl text-amber-400">{stat}</dt>
                  <dd className="mt-1 text-xs text-stone-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
