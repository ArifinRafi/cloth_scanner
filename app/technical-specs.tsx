import Image from 'next/image';

const specifications = [
  { value: '6', unit: 'sec', title: 'Scanning time', detail: 'Per cloth panel' },
  { value: '33', unit: 'MP', title: 'High-definition imaging', detail: 'Camera resolution' },
  { value: '3', unit: 'm/s', title: 'Gantry speed', detail: 'Precision panel handling' },
  { value: '600', unit: 'W', title: 'Power consumption', detail: 'Per machine' },
];

export default function TechnicalSpecs() {
  return (
    <section id="technical-specifications" className="technical-specs" aria-labelledby="technical-specs-title">
      <header className="technical-specs-heading">
        <div>
          <p className="conventional-eyebrow">05 / TECHNICAL SPECIFICATIONS</p>
          <h2 id="technical-specs-title">Precision you can<br /><span>measure.</span></h2>
        </div>
        <p>High-definition vision, fast handling and AI inference. Built together for the garment production floor.</p>
      </header>

      <div className="technical-specs-layout">
        <div className="technical-specs-performance">
          <div className="technical-specs-throughput">
            <span className="technical-specs-label">SCANNING + SORTING</span>
            <div className="technical-specs-output"><strong>650</strong><span>panels<br />per hour</span></div>
            <p>System throughput target</p>
          </div>
          <dl className="technical-specs-grid">
            {specifications.map(spec => (
              <div key={spec.title} className="technical-spec">
                <dt>{spec.title}</dt>
                <dd><strong>{spec.value}</strong><span>{spec.unit}</span></dd>
                <dd className="technical-spec-detail">{spec.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="technical-specs-chip">
          <div className="technical-specs-chip-image">
            <Image
              src="/images/nvidia-chip.png"
              alt="Close-up of an NVIDIA processor mounted on a circuit board"
              fill
              sizes="(max-width: 900px) 94vw, 48vw"
            />
            <span className="technical-specs-chip-tag">AI COMPUTE</span>
          </div>
          <figcaption>
            <p className="technical-specs-chip-eyebrow">THE INTELLIGENCE INSIDE</p>
            <h3>NVIDIA <span>inside.</span></h3>
            <p>Accelerated AI inference turns high-resolution fabric images into classified defect findings.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
