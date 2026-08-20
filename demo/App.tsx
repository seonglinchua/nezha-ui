import { useState } from "react";
import { Badge, Button, Field, Ledger, Panel } from "../src";
import { columns, entries } from "./data";
import { SiteNavigation } from "./SiteNavigation";
import { useAppearance } from "./useAppearance";

const layers = [
  { title: "Foundations", status: "Available", description: "Tokens, type, spacing, and rules." },
  { title: "Components", status: "Available", description: "Small controls with explicit states." },
  { title: "Data components", status: "Available", description: "Ledgers and record-heavy views." },
  { title: "Patterns", status: "Emerging", description: "Repeatable operational workflows." },
  { title: "Templates", status: "Planned", description: "Reusable page-level structures." },
  { title: "Application studies", status: "Available", description: "Reference builds that test the system in context." },
];
const principles = ["Functional before decorative", "States must be obvious", "Numbers deserve special treatment", "Information density is acceptable", "Rules carry reasons"];

export function App() {
  const { mode, resolvedMode, setMode } = useAppearance();
  const [account, setAccount] = useState("");
  const invalid = account.length > 0 && account.length < 6;
  const [specimenMessage, setSpecimenMessage] = useState("Ready for an action.");
  const [componentMessage, setComponentMessage] = useState("Choose a button state.");
  const [reviewed, setReviewed] = useState(false);
  const [resolved, setResolved] = useState(false);

  return (
    <div className="nz-root site" data-nz-theme={resolvedMode}>
      <SiteNavigation mode={mode} resolvedMode={resolvedMode} onModeChange={setMode} />

      <main>
        <section className="hero page-shell" id="overview">
          <div className="nz-label">Nezha UI Framework / v0.1</div>
          <h1>Interfaces for systems that do real work.</h1>
          <p>A practical UI system for operational, financial, and data-heavy software—built for records, approvals, exceptions, and reconciliation.</p>
          <div className="hero-actions"><a className="nz-button nz-button--primary" href="#components">Explore components</a><a className="nz-button" href="#patterns">View patterns</a></div>
          <dl className="hero-meta"><div><dt>Package</dt><dd>@nezha/ui</dd></div><div><dt>Runtime</dt><dd>React 18+</dd></div><div><dt>Dependencies</dt><dd>Zero</dd></div></dl>
        </section>

        <section className="section page-shell specimen" id="specimen" aria-labelledby="specimen-title">
          <SectionHeading index="01" title="Specimen sheet" id="specimen-title" note="Core controls shown in their natural habitat." />
          <Panel title="General ledger" reference="NZH-2026-08"><Ledger caption="Period to date" columns={columns} rows={entries} rowKey={(row) => row.ref} /></Panel>
          <div className="specimen-controls">
            <div className="specimen-block"><div className="specimen-label">Buttons</div><div className="button-row"><Button variant="primary" onClick={() => setSpecimenMessage("Entry JV-0045 posted.")}>Post entry</Button><Button onClick={() => setSpecimenMessage("Draft saved locally.")}>Save draft</Button><Button variant="quiet" onClick={() => setSpecimenMessage("Changes cancelled.")}>Cancel</Button><Button variant="danger" onClick={() => setSpecimenMessage("Entry marked void.")}>Void</Button><Button disabled>Locked</Button></div><p className="demo-feedback" role="status">{specimenMessage}</p></div>
            <div className="specimen-block"><div className="specimen-label">Fields</div><div className="field-grid"><Field label="Account code" placeholder="000000" value={account} invalid={invalid} note={invalid ? "Account codes are six digits." : "Six digits, no spaces."} onChange={(event) => setAccount(event.target.value)} /><Field label="Value date" type="date" defaultValue="2026-08-12" /></div></div>
            <div className="specimen-block specimen-empty"><div className="specimen-label">Empty state</div><Ledger columns={columns} rows={[]} empty="Nothing posted for this period." /></div>
          </div>
        </section>

        <section className="section layers" id="foundations" aria-labelledby="layers-title"><div className="page-shell"><SectionHeading index="02" title="Framework layers" id="layers-title" note="A visible path from system decisions to production software." inverse /><ol className="layer-list">{layers.map((layer, index) => <li key={layer.title}><div className="layer-meta"><span>{String(index + 1).padStart(2, "0")}</span><em>{layer.status}</em></div><div><strong>{layer.title}</strong><p>{layer.description}</p></div></li>)}</ol></div></section>

        <section className="section page-shell" id="components" aria-labelledby="components-title">
          <SectionHeading index="03" title="Featured components" id="components-title" note="Small parts, demonstrated with real states." />
          <div className="component-grid">
            <ComponentTile index="01" title="Button"><div><div className="button-state-row"><Button variant="primary" onClick={() => setComponentMessage("Primary action activated.")}>Post entry</Button><Button onClick={() => setComponentMessage("Secondary action activated.")}>Save</Button><Button disabled>Locked</Button></div><p className="demo-feedback centered" role="status">{componentMessage}</p></div></ComponentTile>
            <ComponentTile index="02" title="Text field"><Field label="Reference" defaultValue="JV-0045" invalid note="Reference already exists." /></ComponentTile>
            <ComponentTile index="03" title="Status badge"><div className="badge-stack"><Badge tone="posted">Posted</Badge><Badge tone="pending">Pending</Badge><Badge tone="void">Void</Badge></div></ComponentTile>
            <ComponentTile index="04" title="Ledger"><Ledger caption="Recent entries" columns={columns.slice(0, 2)} rows={entries.slice(0, 2)} rowKey={(row) => row.ref} /></ComponentTile>
            <ComponentTile index="05" title="Date field"><Field label="Value date" type="date" defaultValue="2026-08-15" /></ComponentTile>
            <ComponentTile index="06" title="Empty state"><Ledger caption="Empty ledger" columns={columns.slice(0, 2)} rows={[]} empty="Nothing to reconcile." /></ComponentTile>
          </div>
        </section>

        <section className="section page-shell" id="patterns" aria-labelledby="patterns-title">
          <SectionHeading index="04" title="Operational patterns" id="patterns-title" note="Repeatable workflows for consequential work." />
          <div className="pattern-list">
            <Pattern code="OP-01" title="General ledger" copy="Review postings, scan status, and reconcile totals without losing numerical context."><span>Balance</span><strong>SGD 8,496.60</strong><Badge tone="posted">Balanced</Badge></Pattern>
            <Pattern code="OP-02" title="Maker / checker" copy="Separate preparation from approval and make responsibility visible at every step."><span>JV-0045</span><strong role="status">{reviewed ? "Approved" : "Awaiting review"}</strong><div><Badge tone={reviewed ? "posted" : "pending"}>{reviewed ? "Checked" : "Checker"}</Badge><Button onClick={() => setReviewed(true)} disabled={reviewed}>{reviewed ? "Reviewed" : "Review"}</Button></div></Pattern>
            <Pattern code="OP-03" title="Reconciliation" copy="Compare source and system values, then isolate the difference that needs attention."><span>Statement 24,104.20</span><span>Ledger 24,075.20</span><strong className="difference">Difference −29.00</strong></Pattern>
            <Pattern code="OP-04" title="Exception handling" copy="Present the failure, its consequence, and the next corrective action in one place."><Badge tone={resolved ? "posted" : "void"}>{resolved ? "Resolved" : "Exception"}</Badge><strong role="status">{resolved ? "Duplicate removed" : "Duplicate order"}</strong><Button variant={resolved ? "quiet" : "danger"} onClick={() => setResolved(true)} disabled={resolved}>{resolved ? "Resolved" : "Resolve"}</Button></Pattern>
          </div>
        </section>

        <section className="section principles" id="principles" aria-labelledby="principles-title"><div className="page-shell principle-layout"><div><span className="section-index">05</span><h2 id="principles-title">Design principles</h2></div><ol>{principles.map((principle, index) => <li key={principle}><span>{index + 1}</span>{principle}</li>)}</ol></div></section>

        <section className="section page-shell" id="examples" aria-labelledby="applications-title">
          <SectionHeading index="06" title="Application studies" id="applications-title" note="Framework decisions tested in complete reference builds." />
          <div className="application-grid">
            <Application
              tone="midnight"
              code="APP-01"
              label="Reference / Monitoring"
              title="World Time Explorer"
              description="Compare working hours across regions without losing local-date context."
              theme="Midnight · Experimental"
              components="Time display · Status · Data rows"
            >
              <div className="time-preview" role="img" aria-label="World Time Explorer showing Singapore at 23:42, London at 15:42, and New York at 10:42">
                <div className="preview-bar"><span>WTE / STUDY</span><span>UTC+08</span></div>
                <div className="time-primary"><span>Singapore</span><strong>23:42</strong><small>Sunday · 16 Aug</small></div>
                <dl className="time-zones"><div><dt>London</dt><dd>15:42</dd></div><div><dt>New York</dt><dd>10:42</dd></div></dl>
              </div>
            </Application>
            <Application
              tone="dark"
              code="APP-02"
              label="Reference / Operations"
              title="General Ledger"
              description="Review period activity, posting state, and balance from one dense workspace."
              theme="Dark"
              components="Ledger · Status badge · Actions"
            >
              <div className="ledger-preview" role="img" aria-label="General Ledger showing a balanced total of 8,496 dollars and 60 cents across posted, pending, and void entries">
                <div className="preview-bar"><span>NZH-2026-08</span><Badge tone="posted">Balanced</Badge></div>
                <div className="ledger-total"><span>Period balance</span><strong>SGD 8,496.60</strong></div>
                <div className="ledger-lines"><div><span>JV-0041</span><Badge tone="posted">Posted</Badge><strong>8,400.00</strong></div><div><span>JV-0043</span><Badge tone="pending">Pending</Badge><strong>312.00</strong></div><div><span>JV-0044</span><Badge tone="void">Void</Badge><strong>−29.00</strong></div></div>
              </div>
            </Application>
          </div>
        </section>

        <section className="section page-shell" id="appearance" aria-labelledby="themes-title">
          <SectionHeading index="07" title="Appearance" id="themes-title" note="Choose how this catalogue renders. The preference is shared with the header control." />
          <div className="theme-list" aria-label="Appearance preference">
            <button type="button" aria-pressed={mode === "light"} onClick={() => setMode("light")}><span className="theme-sample light-sample" aria-hidden="true"><b>Aa</b><span>8,496.60</span></span><span className="theme-copy"><strong>Light</strong><small>Bright neutral surfaces for routine work.</small></span><span className="theme-state">{mode === "light" ? "Selected" : "Available"}</span></button>
            <button type="button" aria-pressed={mode === "dark"} onClick={() => setMode("dark")}><span className="theme-sample dark-sample" aria-hidden="true"><b>Aa</b><span>8,496.60</span></span><span className="theme-copy"><strong>Dark</strong><small>Reduced luminance for extended monitoring.</small></span><span className="theme-state">{mode === "dark" ? "Selected" : "Available"}</span></button>
            <button type="button" aria-pressed={mode === "system"} onClick={() => setMode("system")}><span className={`theme-sample ${resolvedMode}-sample`} aria-hidden="true"><b>Aa</b><span>Auto</span></span><span className="theme-copy"><strong>System</strong><small>Follows the current device preference.</small></span><span className="theme-state">{mode === "system" ? `Selected · ${resolvedMode}` : `Available · ${resolvedMode}`}</span></button>
          </div>
        </section>
      </main>

      <footer className="site-footer page-shell">
        <div className="footer-main">
          <div className="footer-brand"><a href="#overview">@NEZHA/UI</a><p>Interfaces for systems that do real work.</p><span>Nezha Systems</span></div>
          <nav aria-label="Footer navigation"><a href="#components">Components</a><a href="#patterns">Patterns</a><a href="#examples">Examples</a><a href="https://github.com/seonglinchua/nezha-ui" aria-label="Nezha UI GitHub repository">GitHub</a></nav>
        </div>
        <div className="footer-meta"><span>@nezha/ui · v0.1.0 · React 18+</span><a href="#overview">Back to top</a></div>
      </footer>
    </div>
  );
}

function SectionHeading({ index, title, id, note, inverse = false }: { index: string; title: string; id: string; note: string; inverse?: boolean }) {
  return <div className={`section-heading${inverse ? " inverse" : ""}`}><div><span className="section-index">{index}</span><h2 id={id}>{title}</h2></div><p>{note}</p></div>;
}

function ComponentTile({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return <article><div className="tile-meta"><span>{index}</span><h3>{title}</h3></div><div className="tile-demo">{children}</div></article>;
}

function Pattern({ code, title, copy, children }: { code: string; title: string; copy: string; children: React.ReactNode }) {
  return <article><div className="pattern-copy"><span>{code}</span><h3>{title}</h3><p>{copy}</p></div><div className="pattern-demo">{children}</div></article>;
}

function Application({ tone, code, label, title, description, theme, components, children }: { tone: string; code: string; label: string; title: string; description: string; theme: string; components: string; children: React.ReactNode }) {
  return <article><div className={`app-preview ${tone}`}>{children}</div><div className="app-caption"><div className="app-caption-meta"><span>{code}</span><span>{label}</span></div><h3>{title}</h3><p>{description}</p><dl><div><dt>Theme</dt><dd>{theme}</dd></div><div><dt>Built from</dt><dd>{components}</dd></div></dl></div></article>;
}
