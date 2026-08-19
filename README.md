# @nezha/ui

A small React component library in the **ledger vernacular** — ruled lines,
banded rows, tabular figures, negatives in red. Built for interfaces that show
records and numbers: back-office tools, dashboards, admin screens.

It is deliberately narrow. Six components, one strong opinion, no dependencies
beyond React.

```bash
npm install @nezha/ui
```

```tsx
import { Ledger, Panel, Badge } from "@nezha/ui";
import "@nezha/ui/styles.css";
```

## Components

| Component | What it's for |
| --- | --- |
| `Ledger` | Ruled table with banded rows, aligned figures, red negatives, totals |
| `Panel` | Titled section with a reference code in the header |
| `Button` | `primary`, `default`, `quiet`, `danger` |
| `Field` | Labelled input with helper text and an error state |
| `Badge` | Record status — posted, pending, void |
| `Rule` | Divider, optionally with a caption set into the line |

`Ledger` is the one to look at first. Everything else is supporting cast.

```tsx
<Ledger
  caption="Period to date"
  rows={entries}
  rowKey={(row) => row.ref}
  columns={[
    { key: "ref", header: "Ref", cell: (r) => r.ref },
    { key: "narration", header: "Narration", cell: (r) => r.narration },
    {
      key: "amount",
      header: "Amount",
      numeric: true,
      signed: (r) => r.amount,
      cell: (r) => r.amount.toFixed(2),
      total: (rows) => rows.reduce((s, r) => s + r.amount, 0).toFixed(2),
    },
  ]}
/>
```

## Theming

Every visual decision is a CSS variable. Light and dark appearance modes ship
in the box, and you switch by setting an attribute:

```html
<div className="nz-root" data-nz-theme="dark">…</div>
```

To make your own, override the variables. You do not need to touch component
code:

```css
[data-nz-theme="mine"] {
  --nzh-bg: #fffdf8;
  --nzh-text: #14110f;
  --nzh-row-alt: #f3ece1;
  --nzh-action: #7a3b12;
}
```

The full token list is in `src/styles/tokens.css`.

## Running it locally

```bash
npm install
npm run dev        # specimen sheet at localhost:5173
npm run build      # builds dist/ with types and CSS
npm run typecheck
```

`demo/App.tsx` is the specimen sheet — every component in one page, with a
theme toggle. It doubles as the visual regression check: if a change looks
wrong there, it is wrong.

## Conventions

- **Numbers are monospaced and right-aligned.** Columns of figures have to line
  up. `font-variant-numeric: tabular-nums` is applied wherever numbers appear.
- **No border radius.** Ledgers are ruled, not rounded. Change `--nz-radius`
  if you disagree.
- **Labels are uppercase mono.** They read as field names on a form, not prose.
- **Red means negative or destructive.** It is never used for decoration.
- **Every input has a visible label.** `Field` requires one.

## Scope

Adding a component means maintaining it forever, so the bar is high: it earns a
place only if a records-and-numbers interface can't be built without it. Things
deliberately left out — modals, tooltips, comboboxes, date pickers — need real
focus management and screen-reader support, and are better taken from a headless
library than half-built here.

## License

MIT
