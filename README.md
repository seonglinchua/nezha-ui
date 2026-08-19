# @nezha/ui

Interfaces for systems that do real work.

Nezha UI is a small, opinionated React framework for operational, financial,
and data-heavy software. Its visual language follows the ledger vernacular:
ruled lines, banded rows, tabular figures, explicit status, and red reserved for
negative or destructive states.

The framework is deliberately narrow: six components, a focused token system,
and no runtime dependencies beyond its React peer dependencies.

## Status

Version `0.1.0` is an MVP showcase and component-library foundation. The
package is not yet published to npm; clone the repository to explore or build
it locally.

[Open the live specimen catalogue](https://seonglinchua.github.io/nezha-ui/)

## Run the specimen catalogue

```bash
git clone https://github.com/seonglinchua/nezha-ui.git
cd nezha-ui
npm install
npm run dev
```

Vite prints the local preview address when the server starts. The catalogue in
`demo/App.tsx` demonstrates the components, operational patterns, application
studies, responsive behavior, and light/dark appearance modes.

## Components

| Component | Purpose |
| --- | --- |
| `Ledger` | Ruled data table with banded rows, aligned figures, negatives, totals, and a mobile scroll affordance |
| `Panel` | Titled section with an optional reference code |
| `Button` | `primary`, `default`, `quiet`, and `danger` actions |
| `Field` | Labelled input with helper text and an error state |
| `Badge` | Record status using `neutral`, `posted`, `pending`, or `void` tones |
| `Rule` | Divider with an optional caption |

`Ledger` is the centrepiece. The other components support the record-heavy
workflows around it.

```tsx
import { Badge, Ledger, type LedgerColumn } from "@nezha/ui";
import "@nezha/ui/styles.css";

type Entry = {
  ref: string;
  narration: string;
  status: "posted" | "pending" | "void";
  amount: number;
};

const entries: Entry[] = [
  {
    ref: "JV-0041",
    narration: "Retainer — Maybank",
    status: "posted",
    amount: 8400,
  },
];

const columns: LedgerColumn<Entry>[] = [
  { key: "ref", header: "Ref", cell: (row) => row.ref },
  {
    key: "narration",
    header: "Narration",
    cell: (row) => row.narration,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge tone={row.status}>{row.status}</Badge>,
  },
  {
    key: "amount",
    header: "Amount",
    numeric: true,
    signed: (row) => row.amount,
    cell: (row) => row.amount.toFixed(2),
    total: (rows) =>
      rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2),
  },
];

<Ledger
  caption="Period to date"
  rows={entries}
  columns={columns}
  rowKey={(row) => row.ref}
  empty="Nothing posted for this period."
/>;
```

## Build and consume locally

```bash
npm run typecheck
npm run build
npm pack
```

The build writes ESM, CommonJS, declarations, and CSS to `dist/`. The generated
tarball can be installed in another local project while the package remains
unpublished:

```bash
npm install /path/to/nezha-ui/nezha-ui-0.1.0.tgz
```

The public package API is exported from `src/index.ts`. Consumers import the
component bundle and stylesheet separately:

```tsx
import { Badge, Button, Field, Ledger, Panel, Rule } from "@nezha/ui";
import "@nezha/ui/styles.css";
```

React and React DOM 18 or newer are peer dependencies.

## Theming

Light mode is the default. Apply `data-nz-theme` to a containing element to
select a theme explicitly:

```tsx
<div data-nz-theme="dark">...</div>
```

Every visual decision is exposed through CSS custom properties. Override the
semantic tokens to create another theme without changing component code:

```css
[data-nz-theme="mine"] {
  --nzh-bg: #fffdf8;
  --nzh-text: #14110f;
  --nzh-row-alt: #f3ece1;
  --nzh-action: #7a3b12;
}
```

The complete token set is in `src/styles/tokens.css`.

## Interaction and accessibility foundations

- Tables use native table structure, column headers, and optional captions.
- Overflowing ledgers become labelled, keyboard-focusable scroll regions.
- Fields retain visible labels and support helper and error messages.
- Interactive states use native pressed, disabled, menu, and status semantics
  in the specimen catalogue.
- Focus is visible, mobile action targets are at least 44 pixels high, and the
  responsive layout avoids document-level horizontal overflow.

These foundations are not a claim of full WCAG conformance. Screen-reader,
contrast, zoom, and browser coverage should be tested for each consuming
application.

## Project structure

```text
src/components/   Component source and public types
src/styles/       Tokens and component styles
src/shared/       Shared utilities
demo/             Specimen catalogue and interactions
design-qa.md      Design and interaction QA record
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the specimen catalogue |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run build` | Build JavaScript, declarations, and CSS into `dist/` |
| `npm run build:site` | Build the GitHub Pages catalogue into `dist-site/` |
| `npm run preview` | Preview the production build locally |

## Design principles

- Functional before decorative.
- States must be obvious.
- Numbers deserve special treatment.
- Information density is acceptable.
- Rules carry reasons.

## Scope

Adding a component means maintaining it. A component earns a place only when a
records-and-numbers interface cannot be built clearly without it. Complex
overlays and composite inputs—such as dialogs, tooltips, comboboxes, and date
pickers—should come from a well-tested headless library instead of being
half-built here.

## License

[MIT](LICENSE)
