const highlights = [
  { label: 'Days', value: '36' },
  { label: 'Theme', value: 'Hope' },
  { label: 'Focus', value: 'Justice' }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">July Uprising • Bangladesh</p>
        <h1>৩৬ দিন</h1>
        <h2>The July Uprising</h2>
        <p className="lead">
          A tribute page that captures the courage, pain, and hope of a movement that changed the country.
        </p>

        <div className="stats">
          {highlights.map((item) => (
            <div key={item.label} className="stat-box">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-card">
        <div>
          <h3>Why it matters</h3>
          <p>
            The movement stood for dignity, democratic change, and a future shaped by the people.
          </p>
        </div>
        <div>
          <h3>What this page shows</h3>
          <p>
            A simple, polished landing experience built with Next.js and ready to be deployed on Vercel.
          </p>
        </div>
      </section>
    </main>
  );
}
