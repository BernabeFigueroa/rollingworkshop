const tickets = [
  {
    name: "General",
    price: "$18.000",
    description: "Acceso al evento completo y networking.",
  },
  {
    name: "Plus",
    price: "$25.000",
    description: "Acceso premium con prioridad en acreditación.",
  },
  {
    name: "VIP",
    price: "$40.000",
    description: "Acceso VIP + material exclusivo del evento.",
  },
];

function ComprarEntrada() {
  return (
    <section id="entradas" className="landing-container landing-section py-16">
      <div className="mx-auto max-w-6xl">
        <p className="section-eyebrow">Entradas</p>
        <h2 className="section-title">Elegí tu entrada</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tickets.map(({ name, price, description }) => (
            <article
              key={name}
              className="rounded-[28px] border border-borde-tarjeta bg-superficie p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="mb-5 inline-flex rounded-full border border-rojo-rolling/40 bg-rojo-rolling/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                {name}
              </div>
              <div className="mb-4 text-4xl font-bold text-white">{price}</div>
              <p className="mb-6 text-sm leading-6 text-gris-claro">
                {description}
              </p>
              <button type="button" className="rc-button rc-button--red w-full">
                Comprar
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComprarEntrada;
