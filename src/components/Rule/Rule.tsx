import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../shared/cx";

export interface RuleProps extends HTMLAttributes<HTMLDivElement> {
  /** Heavier line, for separating sections rather than rows. */
  strong?: boolean;
  /** Optional caption set into the middle of the line. */
  children?: ReactNode;
}

export function Rule({ strong = false, className, children, ...rest }: RuleProps) {
  if (!children) {
    return (
      <hr
        className={cx("nz-rule", strong && "nz-rule--strong", className)}
        {...(rest as HTMLAttributes<HTMLHRElement>)}
      />
    );
  }
  return (
    <div className={cx("nz-rule", "nz-rule--labelled", className)} {...rest}>
      <span className="nz-label">{children}</span>
    </div>
  );
}
