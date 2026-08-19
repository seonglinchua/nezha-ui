import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../shared/cx";

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  /** Reference code shown on the right of the header, e.g. a document number. */
  reference?: ReactNode;
  children?: ReactNode;
}

export function Panel({
  title,
  reference,
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <section className={cx("nz-panel", className)} {...rest}>
      {title || reference ? (
        <header className="nz-panel__head">
          {title ? <h2 className="nz-panel__title">{title}</h2> : <span />}
          {reference ? <span className="nz-panel__ref">{reference}</span> : null}
        </header>
      ) : null}
      <div className="nz-panel__body">{children}</div>
    </section>
  );
}
