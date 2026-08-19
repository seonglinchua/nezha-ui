import { createElement } from "react";
import { Badge } from "../src";
import type { LedgerColumn } from "../src";

export type Entry = {
  ref: string;
  date: string;
  narration: string;
  amount: number;
  status: "posted" | "pending" | "void";
};

export const entries: Entry[] = [
  { ref: "JV-0041", date: "2026-08-01", narration: "Retainer — Maybank", amount: 8400, status: "posted" },
  { ref: "JV-0042", date: "2026-08-03", narration: "Cloud hosting", amount: -186.4, status: "posted" },
  { ref: "JV-0043", date: "2026-08-05", narration: "Cookbook sales", amount: 312, status: "pending" },
  { ref: "JV-0044", date: "2026-08-07", narration: "Refund — duplicate order", amount: -29, status: "void" },
];

const money = (value: number) =>
  value.toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const columns: LedgerColumn<Entry>[] = [
  { key: "ref", header: "Ref", cell: (row) => row.ref },
  { key: "date", header: "Date", cell: (row) => row.date },
  { key: "narration", header: "Narration", cell: (row) => row.narration },
  {
    key: "status",
    header: "Status",
    cell: (row) => createElement(Badge, { tone: row.status }, row.status),
  },
  {
    key: "amount",
    header: "Amount (SGD)",
    numeric: true,
    signed: (row) => row.amount,
    cell: (row) => money(row.amount),
    total: (rows) => money(rows.reduce((sum, row) => sum + row.amount, 0)),
  },
];
