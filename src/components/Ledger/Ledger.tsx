import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "../../shared/cx";

export interface LedgerColumn<Row> {
  /** Stable key, also used for the React key of each cell. */
  key: string;
  /** Column heading. */
  header: ReactNode;
  /** Pull the cell value out of a row. */
  cell: (row: Row) => ReactNode;
  /** Right-align and set in tabular figures. Use for anything countable. */
  numeric?: boolean;
  /** Show this cell in red when the value is below zero. */
  signed?: (row: Row) => number | null | undefined;
  /** Footer cell, e.g. a column total. */
  total?: (rows: Row[]) => ReactNode;
}

export interface LedgerProps<Row> {
  caption?: ReactNode;
  columns: LedgerColumn<Row>[];
  rows: Row[];
  /** Unique key per row. Defaults to the row index. */
  rowKey?: (row: Row, index: number) => string | number;
  /** Shown instead of the body when there are no rows. */
  empty?: ReactNode;
  className?: string;
}

/**
 * A ruled table with banded rows and tabular figures.
 *
 * Numbers line up, negatives read red, and totals sit under a double rule —
 * the conventions people already know from a paper ledger.
 */
export function Ledger<Row>({
  caption,
  columns,
  rows,
  rowKey,
  empty = "No entries yet.",
  className,
}: LedgerProps<Row>) {
  const hasTotals = columns.some((column) => column.total);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const measure = () => {
      const hasOverflow = element.scrollWidth > element.clientWidth + 1;
      setOverflowing(hasOverflow);
      setCanScrollRight(hasOverflow && element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [columns.length, rows.length]);

  const updateScrollState = () => {
    const element = scrollRef.current;
    if (element) setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
  };

  return (
    <div className={cx("nz-ledger-frame", canScrollRight && "nz-ledger-frame--more")}>
    <div
      className="nz-ledger-wrap"
      ref={scrollRef}
      tabIndex={overflowing ? 0 : undefined}
      aria-label={overflowing ? "Scrollable table" : undefined}
      onScroll={updateScrollState}
    >
      <table className={cx("nz-ledger", className)}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cx(column.numeric && "nz-ledger__cell--num")}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="nz-ledger__empty" colSpan={columns.length}>
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={rowKey ? rowKey(row, index) : index}>
                {columns.map((column) => {
                  const signedValue = column.signed?.(row);
                  const negative =
                    typeof signedValue === "number" && signedValue < 0;
                  return (
                    <td
                      key={column.key}
                      className={cx(
                        column.numeric && "nz-ledger__cell--num",
                        negative && "nz-ledger__cell--neg"
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
        {hasTotals && rows.length > 0 ? (
          <tfoot>
            <tr>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cx(column.numeric && "nz-ledger__cell--num")}
                >
                  {column.total ? column.total(rows) : null}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
    </div>
  );
}
