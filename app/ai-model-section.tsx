import Image from 'next/image';

const stages = [
  { title: 'Capture', copy: 'High-resolution cameras capture the cut panel, revealing fine fabric detail.' },
  { title: 'Analyze', copy: 'The AI model runs inference on the images to locate potential defects.' },
  { title: 'Detect', copy: 'Findings are highlighted and classified, showing what was found and where.' },
];

const results = [
  { file: 'holes', title: 'Hole detections', copy: 'Localized findings along the fabric.', alt: 'Dark cut panel with red Hole labels along a vertical strip' },
  { file: 'pen-marks', title: 'Pen mark detections', copy: 'Marked regions across the panel.', alt: 'Dark cut panel with purple masks and Pen Mark labels around detected marks' },
  { file: 'multiple-defects', title: 'Multiple defect classes', copy: 'Different findings in a single inspection.', alt: 'Light cut panel on a green background with multiple colored defect annotations' },
];

export default function AIModelSection() {
  return (
    <section id="ai-model" className="ai-model-section" aria-labelledby="ai-model-title">
      <div className="ai-model-heading">
        <div>
          <p className="conventional-eyebrow">03 / HOW OUR AI MODEL WORKS</p>
          <h2 id="ai-model-title">See the panel.<br /><span>Find the flaw.</span></h2>
        </div>
        <p>From high-resolution images to labeled findings, our AI turns a fabric scan into a visual inspection result.</p>
      </div>

      <ol className="ai-model-stages" aria-label="AI inspection process">
        {stages.map((stage, index) => (
          <li key={stage.title}>
            <div className="ai-stage-heading"><span>0{index + 1}</span><h3>{stage.title}</h3>{index < stages.length - 1 && <span className="ai-stage-arrow" aria-hidden="true">→</span>}</div>
            <p>{stage.copy}</p>
          </li>
        ))}
      </ol>

      <div className="ai-defect-classes">
        <p>Defect classes include</p>
        <ul aria-label="Defect classes">
          {['Pen marks', 'Missing yarn', 'Holes', 'Slubs', 'Side cuts'].map(label => <li key={label}>{label}</li>)}
        </ul>
      </div>

      <div className="ai-results-heading"><h3>Our model’s results</h3><p>Select an image to inspect the full-resolution annotations.</p></div>
      <div className="ai-results-grid">
        {results.map((result, index) => (
          <figure key={result.file}>
            <a className="ai-result-image" href={`/images/ai-results/${result.file}-full.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${result.title.toLowerCase()} at full resolution in a new tab`}>
              <Image src={`/images/ai-results/${result.file}.webp`} alt={result.alt} width={1600} height={1067} sizes="(max-width: 720px) 90vw, 31vw" />
              <span className="ai-result-enlarge">View full size <span aria-hidden="true">↗</span></span>
            </a>
            <figcaption><span className="ai-result-number">0{index + 1}</span><div><h4>{result.title}</h4><p>{result.copy}</p></div></figcaption>
          </figure>
        ))}
      </div>
      <section className="ai-decisions" aria-labelledby="ai-decisions-title">
        <div className="ai-decisions-heading">
          <p className="conventional-eyebrow">HOW WE DIFFERENTIATE</p>
          <h3 id="ai-decisions-title">Every finding.<br /><span>A clear next step.</span></h3>
          <p>Inspection findings guide three primary outcomes: accept the panel, send it for repair, or reject it with a classified defect reason.</p>
        </div>

        <div className="ai-decision-grid">
          <article className="ai-decision ai-decision-accepted">
            <div className="ai-decision-top"><span className="ai-decision-symbol" aria-hidden="true">✓</span><span>01 / PASS</span></div>
            <h4>Accepted</h4>
            <p>The panel meets the configured quality criteria and can move to the next production stage.</p>
            <div className="ai-decision-route">Ready for production</div>
          </article>
          <article className="ai-decision ai-decision-repairable">
            <div className="ai-decision-top"><span className="ai-decision-symbol" aria-hidden="true">↺</span><span>02 / REWORK</span></div>
            <h4>Repairable</h4>
            <p>The panel has a correctable issue and is routed to the designated repair station.</p>
            <div className="ai-decision-route">Send to repair</div>
          </article>
          <article className="ai-decision ai-decision-rejected">
            <div className="ai-decision-top"><span className="ai-decision-symbol" aria-hidden="true">×</span><span>03 / REJECT</span></div>
            <h4>Rejected</h4>
            <p>The panel does not meet the configured acceptance or repair criteria. Its findings identify the reason.</p>
            <div className="ai-rejection-subclasses">
              <p>Defect subclasses</p>
              <ul aria-label="Rejected panel defect subclasses">
                {['Pen marks', 'Holes', 'Slubs', 'Missing yarn', 'Side cuts'].map(label => <li key={label}>{label}</li>)}
              </ul>
            </div>
          </article>
        </div>

        <aside className="ai-performance" aria-labelledby="ai-performance-title">
          <div className="ai-performance-copy">
            <h4 id="ai-performance-title">Aiming for more consistent inspection.</h4>
            <p>Our model targets a 98% defect detection rate. Reported human sorting errors start at 4%, highlighting the need for more consistent quality checks.</p>
            <p className="ai-performance-note">98% is a development target. Defect detection and sorting error are different measures; improvement must be established through testing on the same panels and quality criteria.</p>
          </div>
          <dl className="ai-performance-metrics">
            <div><dt>AI detection target</dt><dd>98<span>%</span></dd><dd className="ai-performance-caption">Defect detection rate</dd></div>
            <div><dt>Reported manual baseline</dt><dd>4<span>%+</span></dd><dd className="ai-performance-caption">Human sorting error rate</dd></div>
          </dl>
        </aside>
      </section>
    </section>
  );
}
