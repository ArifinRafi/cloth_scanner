/* Generated from the supplied HTML; layout, copy, SVGs and asset pixels are preserved. */
/* eslint-disable @next/next/no-img-element */
import { AssemblyScroll, SortingScroll } from './reference-animations';
import ReferenceInteractions from './reference-interactions';

export default function ReferenceContent() {
  return <main className="reference-site">



<header className="nav-wrap">
  <div className="container nav">
    <a className="brand" href="#top"><img src="/design-reference/logo-icon.png" alt="" decoding="async" loading="lazy" /><span className="brand-word">Cloth Scanner</span></a>
    <nav className="nav-links">
      <a href="#top" className="active">Overview</a>
      <a href="#specs">Specs</a>
      <a href="#creator">Creator</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
    <a href="#contact" className="btn btn-teal nav-cta">Talk to Our Team</a>
  </div>
</header>


<section id="top" className="hero">
  <AssemblyScroll />
  <div className="container hero-inner">
    <h1 className="hero-title">AI powered cut panel inspection<br />through robotic automation</h1>
    <p className="hero-sub">A single rejected consignment costs more than a year of our<br />Cloth Scanner.</p>
    <div className="hero-actions">
      <a href="#contact" className="btn btn-teal">Talk to Our Team</a>
      <a href="#works" className="btn btn-outline">Explore Interactive 3D</a>
    </div>
    <div className="hero-accuracy">
      <svg className="spark" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 0c.6 5.7 5.7 10.8 12 12-6.3 1.2-11.4 6.3-12 12-.6-5.7-5.7-10.8-12-12C6.3 10.8 11.4 5.7 12 0z" /></svg>
      <span className="acc-num">99.2%</span>
      <span className="acc-label">inspection accuracy</span>
    </div>
  </div>
  <div className="container hero-stats">
    <div className="stat">
      <div className="stat-num">~$10.53M</div>
      <div className="stat-label">Saved every year, per factory.</div>
    </div>
    <div className="stat">
      <div className="stat-num">&lt;3s</div>
      <div className="stat-label">Grades each panel before the next one arrives.</div>
    </div>
    <div className="stat">
      <div className="stat-num">5 &rarr; 0.5</div>
      <div className="stat-label">Inspectors per table. Redeployed, not replaced.</div>
    </div>
  </div>
</section>


<section className="problem">
  <div className="container">
    <h2 className="problem-head">Manual inspection has a blind spot.<br />What it misses kills your margin.</h2>
    <div className="problem-grid">
      <article className="prob-card">
        <div className="prob-photo"><img src="/design-reference/2033d0bfb6f1.jpg" alt="Garment finishing quality inspection" decoding="async" loading="lazy" /></div>
        <h3 className="serif-teal">Rising Payroll Overhead</h3>
        <p>Every new cutting table needs more inspection capacity. That means more headcount tied up in checking panels.</p>
      </article>
      <article className="prob-card">
        <div className="prob-photo"><img src="/design-reference/a0d4f34315d1.jpg" alt="Garment production line" decoding="async" loading="lazy" /></div>
        <h3 className="serif-teal">The Cost Compounds</h3>
        <p>A cheap defect at cutting gets expensive downstream. Rework, delays, and shipment risk all start with what was missed early.</p>
      </article>
      <article className="prob-card">
        <div className="prob-photo"><img src="/design-reference/91aa5af13339.jpg" alt="Manual fabric inspection" decoding="async" loading="lazy" /></div>
        <h3 className="serif-teal">Shift Fatigue is Real</h3>
        <p>Manual inspection gets harder to sustain across a full shift. Missed defects move down the line&mdash;and become harder to fix.</p>
      </article>
    </div>
  </div>
</section>


<section id="works" className="works">
  <div className="container">
    <p className="eyebrow center">HOW CLOTH SCANNER WORKS</p>
    <h2 className="section-head center">Fast, automatic, and continuous.</h2>
    <SortingScroll />

    <div className="specs" id="specs">
      <div className="spec-head-row">
        <p className="eyebrow spec-label">SPECIFICATION</p>
      </div>
      <div className="spec-grid">
        <div className="spec"><div className="spec-k">ELECTRICITY CONSUMPTION</div><div className="spec-v">~2.4 KW</div><div className="spec-s">SINGLE-PHASE 220V</div></div>
        <div className="spec"><div className="spec-k">GANTRY SYSTEM SPEED</div><div className="spec-v">1.5 M/S</div><div className="spec-s">X + Y</div></div>
        <div className="spec"><div className="spec-k">CAMERA RESOLUTION</div><div className="spec-v">2 &times; 4K</div><div className="spec-s">DUAL OVERHEAD</div></div>
        <div className="spec"><div className="spec-k">SORTING SPEED</div><div className="spec-v">1.2 M/S</div><div className="spec-s">~1,200 PANELS / HOUR</div></div>
        <div className="spec"><div className="spec-k">PROCESSING SPEED</div><div className="spec-v">&lt;3.0S</div><div className="spec-s">PER PANEL</div></div>
        <div className="spec spec-logo"><img src="/design-reference/6c1707186a63.jpg" alt="NVIDIA Inside" decoding="async" loading="lazy" /></div>
      </div>
    </div>
  </div>
</section>


<section className="inspection">
  <div className="container">
    <p className="eyebrow center">THE INSPECTION</p>
    <h2 className="section-head center">A closer look at fabric.<br />A clearer view of every defect.</h2>
    <div className="panel-grid">
      <article className="panel-card">
        <div className="panel-img"><img src="/design-reference/ac77fec779f3.jpg" alt="Charcoal panel" decoding="async" loading="lazy" /></div>
        <h3 className="serif-title">Charcoal panel</h3>
        <p className="panel-sub">Dark textured fabric</p>
        <button type="button" className="btn btn-dark btn-sm js-inspect" data-title="Charcoal panel" data-orig="/design-reference/ac77fec779f3.jpg" data-pred="/design-reference/8e14ec863931.jpg" data-defect="Pen mark" data-foot="Surface marks, brought into view." data-text="Pen marks are highlighted across the upper-left and right-hand areas of the panel.">Start Inspection <span>&rsaquo;</span></button>
      </article>
      <article className="panel-card">
        <div className="panel-img"><img src="/design-reference/f20909294659.jpg" alt="Graphite panel" decoding="async" loading="lazy" /></div>
        <h3 className="serif-title">Graphite panel</h3>
        <p className="panel-sub">Dark textured fabric</p>
        <button type="button" className="btn btn-dark btn-sm js-inspect" data-title="Graphite panel" data-orig="/design-reference/f20909294659.jpg" data-pred="/design-reference/44ba6edec047.jpg" data-defect="Line mark" data-foot="Edge defect, brought into view." data-text="A continuous line defect is highlighted along the left edge of the panel.">Start Inspection <span>&rsaquo;</span></button>
      </article>
      <article className="panel-card">
        <div className="panel-img"><img src="/design-reference/9fdf89a4bd46.jpg" alt="Ivory panel" decoding="async" loading="lazy" /></div>
        <h3 className="serif-title">Ivory panel</h3>
        <p className="panel-sub">Light solid fabric</p>
        <button type="button" className="btn btn-dark btn-sm js-inspect" data-title="Ivory panel" data-orig="/design-reference/9fdf89a4bd46.jpg" data-pred="/design-reference/3062cf567cfb.jpg" data-defect="Surface marks" data-foot="Scattered marks, brought into view." data-text="Small surface marks are highlighted across the mid-section of the panel.">Start Inspection <span>&rsaquo;</span></button>
      </article>
    </div>
  </div>
</section>


<section className="dashboard">
  <div className="container">
    <div className="dash-top">
      <div>
        <p className="eyebrow">THE DASHBOARD</p>
        <h2 className="section-head left">Every inspection.<br />Part of the bigger picture.</h2>
      </div>
      <div className="toggle" role="group" aria-label="Dashboard view">
        <button type="button" className="tg active" data-view="daily" aria-pressed="true">Daily Overview</button>
        <button type="button" className="tg" data-view="qc" aria-pressed="false">QC Review</button>
      </div>
    </div>
    <div className="dash-app" id="dashApp"><div className="da-bar"><div className="da-brand"><svg viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" rx="8" fill="#007977" /><path d="M9 7.5h8.5l4 4v11H9z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" /><path d="M5.5 16h19" stroke="#43e08a" strokeWidth="2" strokeLinecap="round" /></svg><b>Cloth Scanner</b><span>Quality dashboard</span></div><div className="da-meta"><span className="da-range">10 Aug – 8 Sep 2026</span><span>Updated 8 Sep 2026</span></div></div><div className="da-views"><div className="da-view on" data-view="daily"><p className="da-when">Today · 8 Sep 2026</p><div className="da-kpis"><div className="da-kpi"><span className="k-lab k-ai"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 4 8 4-8 4-8-4z" /><path d="m4 12 8 4 8-4M4 16l8 4 8-4" /></svg>Cut panels checked</span><span className="k-big ">89</span><span className="k-sub">3,287 in the last 30 days</span></div><div className="da-kpi"><span className="k-lab k-miss"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4.5 21 20H3z" /><path d="M12 10v4.5M12 17.2h.01" /></svg>Defective panels found</span><span className="k-big ">3</span><span className="k-sub">154 in the last 30 days</span></div><div className="da-kpi"><span className="k-lab k-amb"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18.5 5.5 5.5 18.5" /><circle cx="7.5" cy="7.5" r="2.3" /><circle cx="16.5" cy="16.5" r="2.3" /></svg>Defective panel rate</span><span className="k-big ">3.4%</span><span className="k-sub">4.7% 30-day average</span></div><div className="da-kpi"><span className="k-lab k-qc"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8z" /><circle cx="12" cy="12" r="2.5" /></svg>Most common defect</span><span className="k-big ">Hole</span><span className="k-sub">42 of 172 defects (24%)</span></div></div><div className="da-row"><div className="da-card da-wide"><div className="da-h"><h3><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 20V11M10 20V4M15 20v-7M20 20V8" /></svg>Daily inspection volume</h3><span className="da-cap">10 Aug – 8 Sep</span></div><div className="da-legend"><span><i className="lg-b"></i>Panels checked</span><span><i className="lg-def"></i>Defective</span><span><i className="lg-now"></i>Today</span></div><svg className="da-chart" viewBox="0 0 640 232" role="img" aria-label="Cut panels checked per day, 10 Aug to 8 Sep; defective panels shown in pink at the base of each bar."><line x1="38" x2="630" y1="192.0" y2="192.0" className="g0" /><text x="30" y="196.0" textAnchor="end">0</text><line x1="38" x2="630" y1="148.0" y2="148.0" className="g" /><text x="30" y="152.0" textAnchor="end">40</text><line x1="38" x2="630" y1="104.0" y2="104.0" className="g" /><text x="30" y="108.0" textAnchor="end">80</text><line x1="38" x2="630" y1="60.0" y2="60.0" className="g" /><text x="30" y="64.0" textAnchor="end">120</text><line x1="38" x2="630" y1="16.0" y2="16.0" className="g" /><text x="30" y="20.0" textAnchor="end">160</text><rect x="41.7" y="56.7" width="12.2" height="135.3" rx="2" className="b" /><rect x="41.7" y="187.6" width="12.2" height="4.4" className="b-def" /><text x="47.9" y="210" textAnchor="middle">10 Aug</text><rect x="61.5" y="36.9" width="12.2" height="155.1" rx="2" className="b" /><rect x="61.5" y="188.7" width="12.2" height="3.3" className="b-def" /><rect x="81.2" y="74.3" width="12.2" height="117.7" rx="2" className="b" /><rect x="81.2" y="188.7" width="12.2" height="3.3" className="b-def" /><rect x="100.9" y="41.3" width="12.2" height="150.7" rx="2" className="b" /><rect x="100.9" y="181.0" width="12.2" height="11.0" className="b-def" /><rect x="120.7" y="138.1" width="12.2" height="53.9" rx="2" className="b" /><rect x="120.7" y="190.9" width="12.2" height="1.1" className="b-def" /><rect x="140.4" y="63.3" width="12.2" height="128.7" rx="2" className="b" /><rect x="140.4" y="184.3" width="12.2" height="7.7" className="b-def" /><rect x="160.1" y="25.9" width="12.2" height="166.1" rx="2" className="b" /><rect x="160.1" y="183.2" width="12.2" height="8.8" className="b-def" /><rect x="179.9" y="55.6" width="12.2" height="136.4" rx="2" className="b" /><rect x="179.9" y="186.5" width="12.2" height="5.5" className="b-def" /><text x="186.0" y="210" textAnchor="middle">17 Aug</text><rect x="199.6" y="58.9" width="12.2" height="133.1" rx="2" className="b" /><rect x="199.6" y="185.4" width="12.2" height="6.6" className="b-def" /><rect x="219.3" y="45.7" width="12.2" height="146.3" rx="2" className="b" /><rect x="219.3" y="184.3" width="12.2" height="7.7" className="b-def" /><rect x="239.1" y="39.1" width="12.2" height="152.9" rx="2" className="b" /><rect x="239.1" y="182.1" width="12.2" height="9.9" className="b-def" /><rect x="258.8" y="135.9" width="12.2" height="56.1" rx="2" className="b" /><rect x="258.8" y="189.8" width="12.2" height="2.2" className="b-def" /><rect x="278.5" y="49.0" width="12.2" height="143.0" rx="2" className="b" /><rect x="278.5" y="187.6" width="12.2" height="4.4" className="b-def" /><rect x="298.3" y="75.4" width="12.2" height="116.6" rx="2" className="b" /><rect x="298.3" y="188.7" width="12.2" height="3.3" className="b-def" /><rect x="318.0" y="65.5" width="12.2" height="126.5" rx="2" className="b" /><rect x="318.0" y="187.6" width="12.2" height="4.4" className="b-def" /><text x="324.1" y="210" textAnchor="middle">24 Aug</text><rect x="337.7" y="66.6" width="12.2" height="125.4" rx="2" className="b" /><rect x="337.7" y="185.4" width="12.2" height="6.6" className="b-def" /><rect x="357.5" y="82.0" width="12.2" height="110.0" rx="2" className="b" /><rect x="357.5" y="182.1" width="12.2" height="9.9" className="b-def" /><rect x="377.2" y="85.3" width="12.2" height="106.7" rx="2" className="b" /><rect x="377.2" y="183.2" width="12.2" height="8.8" className="b-def" /><rect x="396.9" y="148.0" width="12.2" height="44.0" rx="2" className="b" /><rect x="396.9" y="190.9" width="12.2" height="1.1" className="b-def" /><rect x="416.7" y="63.3" width="12.2" height="128.7" rx="2" className="b" /><rect x="416.7" y="187.6" width="12.2" height="4.4" className="b-def" /><rect x="436.4" y="61.1" width="12.2" height="130.9" rx="2" className="b" /><rect x="436.4" y="187.6" width="12.2" height="4.4" className="b-def" /><rect x="456.1" y="64.4" width="12.2" height="127.6" rx="2" className="b" /><rect x="456.1" y="189.8" width="12.2" height="2.2" className="b-def" /><text x="462.3" y="210" textAnchor="middle">31 Aug</text><rect x="475.9" y="57.8" width="12.2" height="134.2" rx="2" className="b" /><rect x="475.9" y="178.8" width="12.2" height="13.2" className="b-def" /><rect x="495.6" y="82.0" width="12.2" height="110.0" rx="2" className="b" /><rect x="495.6" y="190.9" width="12.2" height="1.1" className="b-def" /><rect x="515.3" y="60.0" width="12.2" height="132.0" rx="2" className="b" /><rect x="515.3" y="186.5" width="12.2" height="5.5" className="b-def" /><rect x="535.1" y="133.7" width="12.2" height="58.3" rx="2" className="b" /><rect x="535.1" y="189.8" width="12.2" height="2.2" className="b-def" /><rect x="554.8" y="45.7" width="12.2" height="146.3" rx="2" className="b" /><rect x="554.8" y="178.8" width="12.2" height="13.2" className="b-def" /><rect x="574.5" y="73.2" width="12.2" height="118.8" rx="2" className="b" /><rect x="574.5" y="189.8" width="12.2" height="2.2" className="b-def" /><rect x="594.3" y="65.5" width="12.2" height="126.5" rx="2" className="b" /><rect x="594.3" y="184.3" width="12.2" height="7.7" className="b-def" /><text x="600.4" y="210" textAnchor="middle">7 Sep</text><rect x="614.0" y="94.1" width="12.2" height="97.9" rx="2" className="b-now" /><rect x="614.0" y="188.7" width="12.2" height="3.3" className="b-def" /><text x="620.1" y="86.1" textAnchor="middle" className="v-now">89</text></svg></div><div className="da-card "><div className="da-h"><h3><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8z" /><circle cx="12" cy="12" r="2.5" /></svg>Defects by type</h3><span className="da-cap">172 defects · 30 days</span></div><div className="tb"><div className="tb-row"><span className="tb-n">Hole</span><span className="tb-bar"><i style={{"width":"100.0%"}}></i></span><span className="tb-v">42</span></div><div className="tb-row"><span className="tb-n">Missing Yarn</span><span className="tb-bar"><i style={{"width":"83.3%"}}></i></span><span className="tb-v">35</span></div><div className="tb-row"><span className="tb-n">Slub</span><span className="tb-bar"><i style={{"width":"71.4%"}}></i></span><span className="tb-v">30</span></div><div className="tb-row"><span className="tb-n">GSM Cut</span><span className="tb-bar"><i style={{"width":"66.7%"}}></i></span><span className="tb-v">28</span></div><div className="tb-row"><span className="tb-n">Pen Mark</span><span className="tb-bar"><i style={{"width":"45.2%"}}></i></span><span className="tb-v">19</span></div><div className="tb-row"><span className="tb-n">Joint</span><span className="tb-bar"><i style={{"width":"42.9%"}}></i></span><span className="tb-v">18</span></div></div><p className="da-sub">Found today</p><div className="chips"><span className="chip">Hole · 2</span><span className="chip">Slub · 1</span><span className="chip">GSM Cut · 1</span></div></div></div></div><div className="da-view" data-view="qc"><p className="da-when">10 Aug – 8 Sep 2026 · 154 defective panels</p><div className="da-kpis"><div className="da-kpi"><span className="k-lab k-ai"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 20V11M10 20V4M15 20v-7M20 20V8" /></svg>Found by AI model</span><span className="k-big c-ai">88.3%</span><span className="k-sub">136 of 154 defective panels</span></div><div className="da-kpi"><span className="k-lab k-qc"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 20V11M10 20V4M15 20v-7M20 20V8" /></svg>Found by QC team</span><span className="k-big c-qc">35.7%</span><span className="k-sub">55 of 154 defective panels</span></div><div className="da-kpi"><span className="k-lab k-amb"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18.5 5.5 5.5 18.5" /><circle cx="7.5" cy="7.5" r="2.3" /><circle cx="16.5" cy="16.5" r="2.3" /></svg>AI model advantage</span><span className="k-big ">+52.6 pp</span><span className="k-sub">81 more defective panels found</span></div><div className="da-kpi"><span className="k-lab k-miss"><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>Caught only by AI</span><span className="k-big ">99</span><span className="k-sub">37 by both · 18 by QC only</span></div></div><div className="da-row"><div className="da-card da-wide"><div className="da-h"><h3><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 20.5h17" /><path d="m4.5 15 5-5 4 3.5 6-7" /></svg>Detection trend</h3><span className="da-cap">Weekly · * part week</span></div><div className="da-legend"><span><i className="lg-ai"></i>AI model</span><span><i className="lg-qc"></i>QC team</span></div><svg className="da-chart" viewBox="0 0 640 232" role="img" aria-label="Weekly share of defective panels found by the AI model versus the QC team."><line x1="44" x2="600" y1="192.0" y2="192.0" className="g0" /><text x="36" y="196.0" textAnchor="end">0%</text><line x1="44" x2="600" y1="148.0" y2="148.0" className="g" /><text x="36" y="152.0" textAnchor="end">25%</text><line x1="44" x2="600" y1="104.0" y2="104.0" className="g" /><text x="36" y="108.0" textAnchor="end">50%</text><line x1="44" x2="600" y1="60.0" y2="60.0" className="g" /><text x="36" y="64.0" textAnchor="end">75%</text><line x1="44" x2="600" y1="16.0" y2="16.0" className="g" /><text x="36" y="20.0" textAnchor="end">100%</text><text x="44.0" y="210" textAnchor="middle">10 Aug</text><text x="175.5" y="210" textAnchor="middle">17 Aug</text><text x="307.0" y="210" textAnchor="middle">24 Aug</text><text x="438.5" y="210" textAnchor="middle">31 Aug</text><text x="570.0" y="210" textAnchor="middle">7 Sep*</text><polyline points="44.0,162.7 175.5,128.4 307.0,118.7 438.5,118.7 570.0,86.4" className="ln qc" /><circle cx="44.0" cy="162.7" r="3.5" className="pt qc" /><circle cx="175.5" cy="128.4" r="3.5" className="pt qc" /><circle cx="307.0" cy="118.7" r="3.5" className="pt qc" /><circle cx="438.5" cy="118.7" r="3.5" className="pt qc" /><circle cx="570.0" cy="86.4" r="5" className="pt qc" /><text x="582.0" y="90.4" className="endv qc">60.0%</text><polyline points="44.0,35.6 175.5,40.4 307.0,25.8 438.5,40.4 570.0,51.2" className="ln ai" /><circle cx="44.0" cy="35.6" r="3.5" className="pt ai" /><circle cx="175.5" cy="40.4" r="3.5" className="pt ai" /><circle cx="307.0" cy="25.8" r="3.5" className="pt ai" /><circle cx="438.5" cy="40.4" r="3.5" className="pt ai" /><circle cx="570.0" cy="51.2" r="5" className="pt ai" /><text x="582.0" y="55.2" className="endv ai">80.0%</text></svg></div><div className="da-card "><div className="da-h"><h3><svg className="da-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8z" /><circle cx="12" cy="12" r="2.5" /></svg>Detection by defect type</h3><span className="da-cap">172 defects</span></div><div className="dt-head"><span>Defect</span><span></span><span>AI · QC</span></div><div className="dt-row"><span className="dt-n">Hole</span><span className="dt-bars"><span><i className="ai" style={{"width":"85.7%"}}></i></span><span><i className="qc" style={{"width":"35.7%"}}></i></span></span><span className="dt-v"><b>85.7%</b><em>35.7%</em></span></div><div className="dt-row"><span className="dt-n">Missing Yarn</span><span className="dt-bars"><span><i className="ai" style={{"width":"91.4%"}}></i></span><span><i className="qc" style={{"width":"17.1%"}}></i></span></span><span className="dt-v"><b>91.4%</b><em>17.1%</em></span></div><div className="dt-row"><span className="dt-n">Slub</span><span className="dt-bars"><span><i className="ai" style={{"width":"90.0%"}}></i></span><span><i className="qc" style={{"width":"36.7%"}}></i></span></span><span className="dt-v"><b>90.0%</b><em>36.7%</em></span></div><div className="dt-row"><span className="dt-n">GSM Cut</span><span className="dt-bars"><span><i className="ai" style={{"width":"92.9%"}}></i></span><span><i className="qc" style={{"width":"50.0%"}}></i></span></span><span className="dt-v"><b>92.9%</b><em>50.0%</em></span></div><div className="dt-row"><span className="dt-n">Pen Mark</span><span className="dt-bars"><span><i className="ai" style={{"width":"78.9%"}}></i></span><span><i className="qc" style={{"width":"47.4%"}}></i></span></span><span className="dt-v"><b>78.9%</b><em>47.4%</em></span></div><div className="dt-row"><span className="dt-n">Joint</span><span className="dt-bars"><span><i className="ai" style={{"width":"77.8%"}}></i></span><span><i className="qc" style={{"width":"50.0%"}}></i></span></span><span className="dt-v"><b>77.8%</b><em>50.0%</em></span></div></div></div></div></div><p className="da-foot">Sample inspection records</p></div>
  </div>
</section>


<section className="downstream">
  <div className="container">
    <p className="eyebrow center">DOWNSTREAM</p>
    <h2 className="section-head center">The numbers become a control system.</h2>
    <div className="down-grid">
      <div className="down-left">
        <div className="down-index"><span className="di-no" id="dsNo">01</span><span className="di-label" id="dsLabel">DEFECT TRACKING</span></div>
        <h3 className="serif-title big" id="dsTitle">Panel &rarr; defect &rarr; record</h3>
        <p className="down-desc" id="dsDesc">Records every defect with style, batch, and decision. Builds a traceable QA history.</p>
        <div className="down-nav">
          <button type="button" className="chev" id="dsPrev" aria-label="Previous">&lsaquo;</button>
          <button type="button" className="chev active" id="dsNext" aria-label="Next">&rsaquo;</button>
        </div>
      </div>
      <div className="down-right">
        <div className="ds-frame" id="dsFrame">
<svg className="ds-svg on" data-slide="1" viewBox="0 0 1240 729" xmlns="http://www.w3.org/2000/svg" fontFamily="'Futura Now Headline','Futura',Arial,sans-serif" role="img" aria-label="Defect tracking: the scanner finds a defect, logs it, and sorts the panel">
<defs>
    <radialGradient id="floor1" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#0f8c7c" stopOpacity=".35" /><stop offset="1" stopColor="#0f8c7c" stopOpacity="0" /></radialGradient>
    <linearGradient id="glass1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f2b31" /><stop offset="1" stopColor="#081a1f" /></linearGradient>
    <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3fe0bc" /></marker>
    <clipPath id="ta1"><rect x="790" y="104" width="190" height="150" rx="6" /></clipPath><clipPath id="tb1"><rect x="800" y="428" width="150" height="118" rx="6" /></clipPath>
  </defs>
<ellipse cx="315" cy="505" rx="249" ry="60" fill="url(#floor1)" /><image href="/design-reference/be7cf97e1d0b.webp" x="100" y="95" width="430" height="437" />
<text x="275" y="70" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="start">Camera + AI</text>
<text x="4" y="258" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="start">Panel In</text>
<path d="M268 64 L238 116" stroke="#3fe0bc" strokeWidth="2.5" fill="none" />
<path d="M50 272 L92 292" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" />
<circle cx="268" cy="64" r="5" fill="#3fe0bc" />
<circle cx="50" cy="272" r="5" fill="#3fe0bc" />
<g transform="translate(590,66)">
    <rect width="118" height="150" rx="10" fill="url(#glass1)" stroke="#2c8f82" strokeWidth="2" />
    <rect x="18" y="18" width="82" height="46" rx="4" fill="#0d3a3c" stroke="#3fe0bc" strokeWidth="1.6" />
    <path d="M26 50 L44 36 L58 46 L74 30 L92 40" stroke="#3fe0bc" strokeWidth="2" fill="none" />
    <circle cx="30" cy="92" r="7" fill="none" stroke="#3fe0bc" strokeWidth="1.6" />
    <circle cx="56" cy="92" r="7" fill="none" stroke="#3fe0bc" strokeWidth="1.6" />
    <rect x="78" y="84" width="22" height="16" rx="3" fill="none" stroke="#3fe0bc" strokeWidth="1.6" />
    <line x1="18" y1="118" x2="100" y2="118" stroke="#2c8f82" strokeWidth="1.4" />
    <line x1="18" y1="130" x2="72" y2="130" stroke="#2c8f82" strokeWidth="1.4" />
  </g><text x="649" y="248" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="middle">Control Box</text>
<text x="776" y="46" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="start">Defect Found</text>
<rect x="772" y="62" width="440" height="214" rx="14" fill="url(#glass1)" stroke="#2c8f82" strokeWidth="2" />
<rect x="772" y="62" width="440" height="30" rx="14" fill="#0e3035" /><rect x="772" y="80" width="440" height="12" fill="#0e3035" /><circle cx="792" cy="77" r="4" fill="#ef5b5b" /><circle cx="806" cy="77" r="4" fill="#f0b429" /><circle cx="820" cy="77" r="4" fill="#3fe08c" /><text x="1002" y="83" fill="#8fb0a9" fontSize="15" textAnchor="middle" letterSpacing="1.5">LIVE INSPECTION</text>
<image href="/design-reference/8e14ec863931.jpg" x="767" y="98" width="236" height="162" preserveAspectRatio="xMidYMid slice" clipPath="url(#ta1)" /><rect x="790" y="104" width="190" height="150" rx="6" fill="none" stroke="#2c8f82" strokeWidth="1.4" />
<rect x="998" y="106" width="196" height="30" rx="6" fill="#12514b" stroke="#12514b" strokeWidth="1.4" /><text x="1096" y="127" textAnchor="middle" fill="#bff5e6" fontSize="17" fontWeight="600">DEFECT FOUND</text>
<text x="1004" y="170" fill="#8fb0a9" fontSize="16">Style</text><text x="1190" y="170" textAnchor="end" fill="#e6f2ef" fontSize="19">SH-204</text><line x1="1004" y1="182" x2="1190" y2="182" stroke="#1d4a47" strokeWidth="1" /><text x="1004" y="206" fill="#8fb0a9" fontSize="16">Batch</text><text x="1190" y="206" textAnchor="end" fill="#e6f2ef" fontSize="19">B24-071</text><line x1="1004" y1="218" x2="1190" y2="218" stroke="#1d4a47" strokeWidth="1" /><text x="1004" y="242" fill="#8fb0a9" fontSize="16">Defect</text><text x="1190" y="242" textAnchor="end" fill="#e6f2ef" fontSize="19">Pen mark</text>
<path d="M490 250 L548 250 L548 141 L582 141" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" />
<path d="M708 141 L764 141" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" />
<circle cx="490" cy="250" r="5" fill="#3fe0bc" />
<path d="M992 276 L992 366" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" strokeDasharray="9 8" />
<rect x="784" y="374" width="428" height="226" rx="14" fill="url(#glass1)" stroke="#2c8f82" strokeWidth="2" />
<text x="806" y="412" fill="#e6f2ef" fontSize="24" fontWeight="600" textAnchor="start">Defect Record</text>
<image href="/design-reference/8e14ec863931.jpg" x="782" y="423" width="186" height="127" preserveAspectRatio="xMidYMid slice" clipPath="url(#tb1)" /><rect x="800" y="428" width="150" height="118" rx="6" fill="none" stroke="#2c8f82" strokeWidth="1.4" />
<text x="972" y="452" fill="#8fb0a9" fontSize="16">Style</text><text x="1192" y="452" textAnchor="end" fill="#e6f2ef" fontSize="19">SH-204</text><text x="972" y="484" fill="#8fb0a9" fontSize="16">Batch</text><text x="1192" y="484" textAnchor="end" fill="#e6f2ef" fontSize="19">B24-071</text><text x="972" y="516" fill="#8fb0a9" fontSize="16">Defect</text><text x="1192" y="516" textAnchor="end" fill="#e6f2ef" fontSize="19">Pen mark</text>
<text x="972" y="548" fill="#8fb0a9" fontSize="16">Decision</text>
<rect x="1108" y="530" width="84" height="26" rx="6" fill="#3a2e0c" stroke="#f0b429" strokeWidth="1.4" /><text x="1150" y="549" textAnchor="middle" fill="#f6cf6a" fontSize="16" fontWeight="600">Repair</text>
<path d="M360 532 L360 566" stroke="#3fe0bc" strokeWidth="2.5" fill="none" />
<path d="M110 566 L690 566" stroke="#3fe0bc" strokeWidth="2.5" fill="none" />
<path d="M110 566 L110 588" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" />
<path d="M300 566 L300 588" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" />
<path d="M490 566 L490 588" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" />
<path d="M690 566 L776 566" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr1)" strokeDasharray="9 8" />
<circle cx="360" cy="566" r="5" fill="#3fe0bc" />
<g transform="translate(30,596)">
      <rect width="160" height="110" rx="12" fill="url(#glass1)" stroke="#3fe08c" strokeWidth="2" />
      <path d="M52 22 L108 22 L100 62 L60 62 Z" fill="#0f3b2a" stroke="#3fe08c" strokeWidth="2" />
      <path d="M68 42 L77 51 L93 33" stroke="#3fe08c" strokeWidth="3" fill="none" />
      <text x="80" y="92" fill="#8ff0bd" fontSize="22" fontWeight="600" textAnchor="middle">Accept</text></g>
<g transform="translate(220,596)">
      <rect width="160" height="110" rx="12" fill="url(#glass1)" stroke="#f0b429" strokeWidth="2" />
      <path d="M52 22 L108 22 L100 62 L60 62 Z" fill="#3a2e0c" stroke="#f0b429" strokeWidth="2" />
      <path d="M71 50 L88 33 M84 30 A7 7 0 1 0 91 37" stroke="#f0b429" strokeWidth="3" fill="none" />
      <text x="80" y="92" fill="#f6cf6a" fontSize="22" fontWeight="600" textAnchor="middle">Repair</text></g>
<g transform="translate(410,596)">
      <rect width="160" height="110" rx="12" fill="url(#glass1)" stroke="#ef5b5b" strokeWidth="2" />
      <path d="M52 22 L108 22 L100 62 L60 62 Z" fill="#3b1416" stroke="#ef5b5b" strokeWidth="2" />
      <path d="M71 33 L89 51 M89 33 L71 51" stroke="#ef5b5b" strokeWidth="3" fill="none" />
      <text x="80" y="92" fill="#f59a9a" fontSize="22" fontWeight="600" textAnchor="middle">Reject</text></g>
</svg>
<svg className="ds-svg" data-slide="2" viewBox="0 0 1240 729" xmlns="http://www.w3.org/2000/svg" fontFamily="'Futura Now Headline','Futura',Arial,sans-serif" role="img" aria-label="Production control: inspection status flows to ERP/MES and the order record">
<defs>
    <radialGradient id="floor2" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#0f8c7c" stopOpacity=".35" /><stop offset="1" stopColor="#0f8c7c" stopOpacity="0" /></radialGradient>
    <linearGradient id="glass2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f2b31" /><stop offset="1" stopColor="#081a1f" /></linearGradient>
    <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3fe0bc" /></marker>
    <clipPath id="ta2"><rect x="790" y="104" width="150" height="150" rx="6" /></clipPath>
  </defs>
<ellipse cx="315" cy="505" rx="249" ry="60" fill="url(#floor2)" /><image href="/design-reference/be7cf97e1d0b.webp" x="100" y="95" width="430" height="437" />
<text x="4" y="258" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="start">Panel In</text>
<path d="M50 272 L92 292" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr2)" />
<circle cx="50" cy="272" r="5" fill="#3fe0bc" />
<g transform="translate(590,66)">
    <rect width="118" height="150" rx="10" fill="url(#glass2)" stroke="#2c8f82" strokeWidth="2" />
    <rect x="18" y="18" width="82" height="46" rx="4" fill="#0d3a3c" stroke="#3fe0bc" strokeWidth="1.6" />
    <path d="M26 50 L44 36 L58 46 L74 30 L92 40" stroke="#3fe0bc" strokeWidth="2" fill="none" />
    <circle cx="30" cy="92" r="7" fill="none" stroke="#3fe0bc" strokeWidth="1.6" />
    <circle cx="56" cy="92" r="7" fill="none" stroke="#3fe0bc" strokeWidth="1.6" />
    <rect x="78" y="84" width="22" height="16" rx="3" fill="none" stroke="#3fe0bc" strokeWidth="1.6" />
    <line x1="18" y1="118" x2="100" y2="118" stroke="#2c8f82" strokeWidth="1.4" />
    <line x1="18" y1="130" x2="72" y2="130" stroke="#2c8f82" strokeWidth="1.4" />
  </g><text x="649" y="248" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="middle">Control Box</text>
<path d="M490 250 L548 250 L548 141 L582 141" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr2)" />
<path d="M708 141 L764 141" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr2)" />
<circle cx="490" cy="250" r="5" fill="#3fe0bc" />
<text x="776" y="46" fill="#e6f2ef" fontSize="24" fontWeight="500" textAnchor="start">Inspection Status</text>
<rect x="772" y="62" width="440" height="214" rx="14" fill="url(#glass2)" stroke="#2c8f82" strokeWidth="2" />
<rect x="772" y="62" width="440" height="30" rx="14" fill="#0e3035" /><rect x="772" y="80" width="440" height="12" fill="#0e3035" /><circle cx="792" cy="77" r="4" fill="#ef5b5b" /><circle cx="806" cy="77" r="4" fill="#f0b429" /><circle cx="820" cy="77" r="4" fill="#3fe08c" /><text x="1002" y="83" fill="#8fb0a9" fontSize="15" textAnchor="middle" letterSpacing="1.5">LIVE STATUS</text>
<image href="/design-reference/f20909294659.jpg" x="772" y="98" width="186" height="162" preserveAspectRatio="xMidYMid slice" clipPath="url(#ta2)" /><rect x="790" y="104" width="150" height="150" rx="6" fill="none" stroke="#2c8f82" strokeWidth="1.4" />
<rect x="958" y="106" width="236" height="32" rx="7" fill="#123d2c" stroke="#3fe08c" strokeWidth="1.4" /><path d="M972 122 L980 130 L994 114" stroke="#3fe08c" strokeWidth="3" fill="none" /><text x="1086" y="129" textAnchor="middle" fill="#8ff0bd" fontSize="18" fontWeight="700" letterSpacing="1">CLEARED</text>
<text x="964" y="166" fill="#8fb0a9" fontSize="16">Panel ID</text><text x="1190" y="166" textAnchor="end" fill="#e6f2ef" fontSize="19">#4587</text><line x1="964" y1="178" x2="1190" y2="178" stroke="#1d4a47" strokeWidth="1" /><text x="964" y="197" fill="#8fb0a9" fontSize="16">Style</text><text x="1190" y="197" textAnchor="end" fill="#e6f2ef" fontSize="19">SH-204</text><line x1="964" y1="209" x2="1190" y2="209" stroke="#1d4a47" strokeWidth="1" /><text x="964" y="228" fill="#8fb0a9" fontSize="16">Batch</text><text x="1190" y="228" textAnchor="end" fill="#e6f2ef" fontSize="19">B24-071</text>
<text x="964" y="260" fill="#8fb0a9" fontSize="16">Status</text><text x="1190" y="260" textAnchor="end" fill="#8ff0bd" fontSize="19" fontWeight="700">OK</text>
<g transform="translate(250,560)">
      <rect width="170" height="140" rx="12" fill="url(#glass2)" stroke="#2c8f82" strokeWidth="2" />
      <rect x="35" y="16" width="100" height="22" rx="4" fill="#0d3a3c" stroke="#3fe0bc" strokeWidth="1.6" />
      <rect x="35" y="44" width="100" height="22" rx="4" fill="#0d3a3c" stroke="#3fe0bc" strokeWidth="1.6" />
      <rect x="35" y="72" width="100" height="22" rx="4" fill="#0d3a3c" stroke="#3fe0bc" strokeWidth="1.6" />
      <circle cx="120" cy="27" r="3.5" fill="#3fe0bc" /><circle cx="120" cy="55" r="3.5" fill="#3fe0bc" /><circle cx="120" cy="83" r="3.5" fill="#3fe08c" />
      <line x1="45" y1="27" x2="90" y2="27" stroke="#2c8f82" strokeWidth="2" /><line x1="45" y1="55" x2="90" y2="55" stroke="#2c8f82" strokeWidth="2" />
      <line x1="45" y1="83" x2="90" y2="83" stroke="#2c8f82" strokeWidth="2" />
      <text x="85" y="124" textAnchor="middle" fill="#e6f2ef" fontSize="22" fontWeight="600">ERP / MES</text></g>
<path d="M830 276 L830 305 L600 305 L600 600 L428 600" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr2)" />
<path d="M420 662 L776 662" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr2)" />
<path d="M1110 330 L1110 284" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr2)" />
<rect x="784" y="330" width="428" height="372" rx="14" fill="url(#glass2)" stroke="#2c8f82" strokeWidth="2" />
<text x="806" y="370" fill="#e6f2ef" fontSize="24" fontWeight="600" textAnchor="start">Order / Style / Batch</text>
<text x="806" y="414" fill="#8fb0a9" fontSize="16">PO</text><text x="1190" y="414" textAnchor="end" fill="#e6f2ef" fontSize="19">PO-4587</text><line x1="806" y1="426" x2="1190" y2="426" stroke="#1d4a47" strokeWidth="1" /><text x="806" y="450" fill="#8fb0a9" fontSize="16">Style</text><text x="1190" y="450" textAnchor="end" fill="#e6f2ef" fontSize="19">SH-204</text><line x1="806" y1="462" x2="1190" y2="462" stroke="#1d4a47" strokeWidth="1" /><text x="806" y="486" fill="#8fb0a9" fontSize="16">Batch</text><text x="1190" y="486" textAnchor="end" fill="#e6f2ef" fontSize="19">B24-071</text>
<line x1="806" y1="506" x2="1190" y2="506" stroke="#2c8f82" strokeWidth="1.2" />
<text x="806" y="546" fill="#8fb0a9" fontSize="16">Status</text>
<rect x="930" y="526" width="150" height="28" rx="6" fill="#123d2c" stroke="#3fe08c" strokeWidth="1.4" /><text x="1005" y="546" textAnchor="middle" fill="#8ff0bd" fontSize="16" fontWeight="600">CLEARED</text>
<text x="1190" y="546" textAnchor="end" fill="#e6f2ef" fontSize="19">120</text>
<rect x="930" y="572" width="150" height="28" rx="6" fill="#3a2e0c" stroke="#f0b429" strokeWidth="1.4" /><text x="1005" y="592" textAnchor="middle" fill="#f6cf6a" fontSize="16" fontWeight="600">HOLD</text>
<text x="1190" y="592" textAnchor="end" fill="#e6f2ef" fontSize="19">8</text>
<rect x="930" y="618" width="150" height="28" rx="6" fill="#3b1416" stroke="#ef5b5b" strokeWidth="1.4" /><text x="1005" y="638" textAnchor="middle" fill="#f59a9a" fontSize="16" fontWeight="600">REWORK</text>
<text x="1190" y="638" textAnchor="end" fill="#e6f2ef" fontSize="19">2</text>
</svg>
<svg className="ds-svg" data-slide="3" viewBox="0 0 1240 729" xmlns="http://www.w3.org/2000/svg" fontFamily="'Futura Now Headline','Futura',Arial,sans-serif" role="img" aria-label="TQM: defect data becomes pattern analysis, corrective action and better quality">
<defs>
    <radialGradient id="floor3" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#0f8c7c" stopOpacity=".35" /><stop offset="1" stopColor="#0f8c7c" stopOpacity="0" /></radialGradient>
    <linearGradient id="glass3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f2b31" /><stop offset="1" stopColor="#081a1f" /></linearGradient>
    <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3fe0bc" /></marker>
    <clipPath id="ta3"><rect x="552" y="372" width="170" height="118" rx="6" /></clipPath>
  </defs>
<path d="M70 150 L150 116 L230 150 L150 184 Z" fill="#0d2d33" stroke="#2c8f82" strokeWidth="2" /><path d="M70 124 L150 90 L230 124 L150 158 Z" fill="#0d2d33" stroke="#2c8f82" strokeWidth="2" /><path d="M70 98 L150 64 L230 98 L150 132 Z" fill="#0d2d33" stroke="#2c8f82" strokeWidth="2" /><path d="M70 72 L150 38 L230 72 L150 106 Z" fill="#0d2d33" stroke="#3fe0bc" strokeWidth="2" /><path d="M136 70 L160 60 L184 72 L160 84 Z" fill="none" stroke="#ef5b5b" strokeWidth="2.5" />
<rect x="365" y="46" width="190" height="126" rx="10" fill="url(#glass3)" stroke="#2c8f82" strokeWidth="2" />
      <rect x="452" y="172" width="16" height="18" fill="#2c8f82" /><rect x="420" y="190" width="80" height="6" rx="3" fill="#2c8f82" />
      <rect x="385" y="120" width="14" height="36" fill="#3fe0bc" /><rect x="405" y="98" width="14" height="58" fill="#3fe0bc" />
      <rect x="425" y="108" width="14" height="48" fill="#3fe0bc" opacity=".7" /><rect x="445" y="82" width="14" height="74" fill="#3fe0bc" />
      <circle cx="510" cy="100" r="30" fill="#0d3a3c" stroke="#2c8f82" strokeWidth="2" />
      <path d="M510 100 L510 70 A30 30 0 0 1 538 110 Z" fill="#3fe0bc" />
      <path d="M510 100 L538 110 A30 30 0 0 1 493 125 Z" fill="#f0b429" opacity=".85" />
      <line x1="483" y1="146" x2="537" y2="146" stroke="#2c8f82" strokeWidth="2" />
<rect x="708" y="40" width="124" height="158" rx="12" fill="url(#glass3)" stroke="#2c8f82" strokeWidth="2" />
      <rect x="744" y="32" width="52" height="18" rx="5" fill="#0d3a3c" stroke="#3fe0bc" strokeWidth="1.6" />
      <path d="M728 76 l6 6 l10 -12" stroke="#3fe0bc" strokeWidth="2.5" fill="none" /><line x1="754" y1="76" x2="812" y2="76" stroke="#2c8f82" strokeWidth="2" />
      <path d="M728 102 l6 6 l10 -12" stroke="#3fe0bc" strokeWidth="2.5" fill="none" /><line x1="754" y1="102" x2="812" y2="102" stroke="#2c8f82" strokeWidth="2" />
      <circle cx="770" cy="152" r="24" fill="#123d2c" stroke="#3fe08c" strokeWidth="2" />
      <path d="M759 152 l8 8 l15 -16" stroke="#3fe08c" strokeWidth="3.5" fill="none" />
<ellipse cx="1080" cy="192" rx="120" ry="26" fill="url(#floor3)" /><image href="/design-reference/be7cf97e1d0b.webp" x="986" y="12" width="188" height="191" />
<path d="M250 118 L350 118" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr3)" />
<path d="M570 118 L692 118" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr3)" />
<path d="M848 118 L970 118" stroke="#3fe0bc" strokeWidth="2.5" fill="none" markerEnd="url(#arr3)" />
<text x="150" y="244" fill="#e6f2ef" fontSize="24" fontWeight="600" textAnchor="middle">Defect Data</text><text x="150" y="274" fill="#8fb0a9" fontSize="17" fontWeight="400" textAnchor="middle">(style / batch / type)</text>
<text x="460" y="244" fill="#e6f2ef" fontSize="24" fontWeight="600" textAnchor="middle">Pattern Analysis</text><text x="460" y="274" fill="#8fb0a9" fontSize="17" fontWeight="400" textAnchor="middle">(find recurring issues)</text>
<text x="770" y="244" fill="#e6f2ef" fontSize="24" fontWeight="600" textAnchor="middle">Corrective Action</text><text x="770" y="274" fill="#8fb0a9" fontSize="17" fontWeight="400" textAnchor="middle">(CAPA)</text>
<text x="1080" y="244" fill="#e6f2ef" fontSize="24" fontWeight="600" textAnchor="middle">Better Quality</text><text x="1080" y="274" fill="#8fb0a9" fontSize="17" fontWeight="400" textAnchor="middle">(for every batch)</text>
<rect x="20" y="300" width="1200" height="408" rx="14" fill="url(#glass3)" stroke="#2c8f82" strokeWidth="2" />
<text x="48" y="342" fill="#e6f2ef" fontSize="21" fontWeight="600" textAnchor="start">Top Defects (Last 30 Days)</text>
<text x="48" y="386" fill="#e6f2ef" fontSize="18">Cutting error</text><rect x="210" y="373" width="250" height="14" rx="7" fill="#0f2b31" /><rect x="210" y="373" width="164" height="14" rx="7" fill="#3fe0bc" /><text x="520" y="386" textAnchor="end" fill="#e6f2ef" fontSize="18">42%</text>
<text x="48" y="426" fill="#e6f2ef" fontSize="18">Stitch miss</text><rect x="210" y="413" width="250" height="14" rx="7" fill="#0f2b31" /><rect x="210" y="413" width="94" height="14" rx="7" fill="#3fe0bc" /><text x="520" y="426" textAnchor="end" fill="#e6f2ef" fontSize="18">24%</text>
<text x="48" y="466" fill="#e6f2ef" fontSize="18">Size variation</text><rect x="210" y="453" width="250" height="14" rx="7" fill="#0f2b31" /><rect x="210" y="453" width="70" height="14" rx="7" fill="#3fe0bc" /><text x="520" y="466" textAnchor="end" fill="#e6f2ef" fontSize="18">18%</text>
<text x="48" y="506" fill="#e6f2ef" fontSize="18">Other</text><rect x="210" y="493" width="250" height="14" rx="7" fill="#0f2b31" /><rect x="210" y="493" width="62" height="14" rx="7" fill="#3fe0bc" /><text x="520" y="506" textAnchor="end" fill="#e6f2ef" fontSize="18">16%</text>
<image href="/design-reference/44ba6edec047.jpg" x="532" y="367" width="211" height="127" preserveAspectRatio="xMidYMid slice" clipPath="url(#ta3)" /><rect x="552" y="372" width="170" height="118" rx="6" fill="none" stroke="#2c8f82" strokeWidth="1.4" />
<text x="637" y="516" fill="#8fb0a9" fontSize="16" fontWeight="400" textAnchor="middle">Pattern: Cutting error</text>
<line x1="760" y1="330" x2="760" y2="530" stroke="#2c8f82" strokeWidth="1.2" />
<text x="790" y="342" fill="#e6f2ef" fontSize="21" fontWeight="600" textAnchor="start">Improvement Over Time</text>
<line x1="842" y1="372" x2="1180" y2="372" stroke="#1d4a47" strokeWidth="1" /><text x="832" y="377" textAnchor="end" fill="#8fb0a9" fontSize="15">10%</text>
<line x1="842" y1="432" x2="1180" y2="432" stroke="#1d4a47" strokeWidth="1" /><text x="832" y="437" textAnchor="end" fill="#8fb0a9" fontSize="15">5%</text>
<line x1="842" y1="492" x2="1180" y2="492" stroke="#1d4a47" strokeWidth="1" /><text x="832" y="497" textAnchor="end" fill="#8fb0a9" fontSize="15">0%</text>
<polyline points="872,398 965,414 1057,430 1150,438" fill="none" stroke="#3fe0bc" strokeWidth="3" />
<circle cx="872" cy="398" r="5" fill="#3fe0bc" /><text x="872" y="518" textAnchor="middle" fill="#8fb0a9" fontSize="15">Week 1</text>
<circle cx="965" cy="414" r="5" fill="#3fe0bc" /><text x="965" y="518" textAnchor="middle" fill="#8fb0a9" fontSize="15">Week 2</text>
<circle cx="1057" cy="430" r="5" fill="#3fe0bc" /><text x="1057" y="518" textAnchor="middle" fill="#8fb0a9" fontSize="15">Week 3</text>
<circle cx="1150" cy="438" r="8" fill="#3fe0bc" /><text x="1150" y="518" textAnchor="middle" fill="#8fb0a9" fontSize="15">Week 4</text>
<text x="1150" y="422" textAnchor="middle" fill="#3fe0bc" fontSize="20" fontWeight="700">4.5%</text>
<line x1="48" y1="566" x2="1192" y2="566" stroke="#2c8f82" strokeWidth="1.2" />
<g transform="translate(90,636)"><path d="M0 -16 L14 -10 L14 2 Q14 14 0 20 Q-14 14 -14 2 L-14 -10 Z" fill="none" stroke="#3fe0bc" strokeWidth="2.5" /><path d="M-6 2 l5 5 l9 -10" stroke="#3fe0bc" strokeWidth="2.5" fill="none" /></g><text x="124" y="643" fill="#e6f2ef" fontSize="19" fontWeight="400" textAnchor="start">Real defect data</text>
<g transform="translate(480,636)"><ellipse cx="0" cy="-12" rx="14" ry="6" fill="none" stroke="#3fe0bc" strokeWidth="2.5" /><path d="M-14 -12 V12 A14 6 0 0 0 14 12 V-12 M-14 0 A14 6 0 0 0 14 0" fill="none" stroke="#3fe0bc" strokeWidth="2.5" /></g><text x="514" y="643" fill="#e6f2ef" fontSize="19" fontWeight="400" textAnchor="start">Traceable quality record</text>
<g transform="translate(880,636)"><path d="M-18 12 L-6 0 L2 8 L18 -8 M8 -8 H18 V2" fill="none" stroke="#3fe0bc" strokeWidth="2.5" /></g><text x="914" y="643" fill="#e6f2ef" fontSize="19" fontWeight="400" textAnchor="start">Measurable improvement</text>
</svg>
</div>
        <div className="dots-vert" id="dsDots">
          <button type="button" className="d active" aria-label="Slide 1"></button>
          <button type="button" className="d" aria-label="Slide 2"></button>
          <button type="button" className="d" aria-label="Slide 3"></button>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="model" id="model">
  <div className="container">
    <p className="eyebrow center">THE MODEL</p>
    <h2 className="section-head center">Trained on your fabric. Tuned to your line.</h2>
    <div className="three-col center-col">
      <div className="col">
        <p className="col-label">Custom-tuned per factory</p>
        <h3 className="serif-title">No two Bangladeshi factories run the same fabric mix.</h3>
        <p className="col-desc">The model is calibrated using your actual fabric mix and defect patterns, in lieu of a generic test set.</p>
      </div>
      <div className="col">
        <p className="col-label">Production-grade accuracy</p>
        <h3 className="serif-title">Below 1% escape rate</h3>
        <p className="col-desc">Performance is measured on live production panels under actual operating conditions.</p>
      </div>
      <div className="col">
        <p className="col-label">Continuous improvement</p>
        <h3 className="serif-title">Performance improves with production data</h3>
        <p className="col-desc">New and recurring defects are added to the factory&apos;s training set, then tested against production panels to measure whether detection improves.</p>
      </div>
    </div>
  </div>
</section>


<section className="automation">
  <div className="container auto-grid">
    <h2 className="auto-head">No cloud. No lock-in.<br />Your factory stays in control.</h2>
    <div className="auto-right">
      <div className="auto-block">
        <p className="col-label">Your Data</p>
        <h3 className="serif-title">Stays in your factory.</h3>
        <p className="col-desc">The core workflow is designed without cloud dependency. Your production and inspection information isn&apos;t quietly turned into a shared dataset for someone else.</p>
      </div>
    </div>
  </div>
</section>


<section className="buy" id="buy">
  <div className="container">
    <p className="eyebrow">HOW YOU BUY</p>
    <h2 className="section-head left big">Monthly subscription. Everything included.</h2>
    <div className="three-col buy-cols">
      <div className="col">
        <p className="col-label">The model</p>
        <h3 className="serif-title">You install it. We own it.</h3>
        <p className="col-desc">We build the cell, and install it on your cutting table. You pay a monthly subscription per table &mdash; no capital purchase, no procurement committee, no six-month approval loop that the plan doesn&apos;t survive.</p>
      </div>
      <div className="col">
        <p className="col-label">What&apos;s included</p>
        <h3 className="serif-title">Everything the cell needs to keep working.</h3>
        <p className="col-desc">Full installation, training for your operators and supervisors, all software updates and model retraining, on-site service response, and refurbishment of the cell every four years &mdash; all bundled into the monthly fee. No hidden add-ons.</p>
      </div>
      <div className="col">
        <p className="col-label">What you avoid</p>
        <h3 className="serif-title">The overhead of owning industrial equipment.</h3>
        <p className="col-desc">No imported machine, no expatriate service call, no six-week wait for spare parts that becomes obsolete in five years. If a component fails, our team is at your factory the same week &mdash; often the same day.</p>
      </div>
    </div>
    <a href="#contact" className="btn btn-teal">Ask for a quote <span>&rsaquo;</span></a>
  </div>
</section>


<footer id="contact" className="footer">
  <div className="container footer-inner">
    <div className="footer-top">
      <div className="footer-brand" id="creator">
        <span className="footer-logo brand"><img src="/design-reference/logo-icon.png" alt="" decoding="async" loading="lazy" /><span className="brand-word">Cloth Scanner</span></span>
        <h3 className="serif-title footer-tag">Built in Bangladesh. Serviced in Bangladesh.</h3>
        <p className="footer-desc">This is a product of Advanced AI Lab, the AI business of ACI PLC. Every cell is designed, assembled, and serviced within a day&apos;s drive of your factory. No imported machine, no expatriate service call, no six-week wait for spare parts.</p>
      </div>
      <div className="footer-cols">
        <div className="fcol">
          <p className="fcol-head">Product</p>
          <a href="#top">The Cell</a>
          <a href="#works">The Machine</a>
          <a href="#model">The Model</a>
          <a href="#works">See In 3D</a>
          <a href="#buy">How To Buy It</a>
        </div>
        <div className="fcol">
          <p className="fcol-head">Company</p>
          <a href="#creator">About</a>
          <a href="#contact">Contact</a>
          <a href="#">AAI Website</a>
        </div>
        <div className="fcol">
          <p className="fcol-head">Contact</p>
          <a href="mailto:clothscanner@advanceailab.com">clothscanner@advanceailab.com</a>
          <a href="tel:+8801234567890">(+880) 1234-567890</a>
          <div className="socials">
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24H8V8z" /></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.5h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.5h7.6l5.2 6.9 6.1-6.9zm-1.3 19.9h2L6.5 3.6H4.4l13.2 17.8z" /></svg></a>
            <a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.07-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.3 1.28.5 1.72.64.72.22 1.38.2 1.9.12.58-.1 1.8-.74 2.05-1.44.25-.7.25-1.3.18-1.44-.07-.13-.27-.2-.57-.35zM12 0A12 12 0 0 0 1.7 18l-1.7 6 6.2-1.6A12 12 0 1 0 12 0zm0 22a10 10 0 0 1-5.1-1.4l-.36-.22-3.7.97.99-3.6-.24-.37A10 10 0 1 1 12 22z" /></svg></a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>&copy; 2026 ADVANCED AI LAB LIMITED &middot; ACI PLC</span>
      <img className="aal-logo" src="/design-reference/de1aa54b45d2.png" alt="Advanced AI Lab Limited" />
    </div>
  </div>
</footer>


<div className="insp-overlay" id="inspModal" hidden>
  <div className="insp-modal" role="dialog" aria-modal="true" aria-labelledby="inspTitle">
    <div className="insp-head">
      <h3 className="insp-title serif-title" id="inspTitle">Charcoal Panel</h3>
      <div className="insp-seg" role="tablist">
        <button type="button" data-view="orig">Original</button>
        <button type="button" data-view="pred" className="active">Inspection</button>
        <button type="button" data-view="compare">Compare</button>
      </div>
      <button type="button" className="insp-close" aria-label="Close inspection">&times;</button>
    </div>

    <div className="insp-stage">
      <div className="stage-single">
        <img className="stage-img" alt="Panel inspection" decoding="async" loading="lazy" />
        <span className="defect-badge"><i></i><span className="db-text">Pen mark</span></span>
      </div>
      <div className="stage-compare" hidden>
        <figure><div className="cmp-frame"><img className="cmp-orig" alt="Original panel" decoding="async" loading="lazy" /></div><figcaption>Original</figcaption></figure>
        <figure><div className="cmp-frame"><img className="cmp-pred" alt="AI inspection" decoding="async" loading="lazy" /><span className="defect-badge sm"><i></i><span className="db-text2">Pen mark</span></span></div><figcaption>AI Inspection</figcaption></figure>
      </div>
    </div>

    <div className="insp-foot">
      <div className="insp-caption">
        <p className="foot-title">Surface marks, brought into view.</p>
        <p className="foot-text">Pen marks are highlighted across the upper-left and right-hand areas of the panel.</p>
      </div>
      <button type="button" className="closer-look">
        <span className="cl-label">Closer Look</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      </button>
    </div>
  </div>
</div>



<ReferenceInteractions />
</main>;
}
