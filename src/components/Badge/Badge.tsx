import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../shared/cx";

export type BadgeTone = "neutral" | "posted" | "pending" | "void";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status of the record this badge sits next to. */
  tone?: BadgeTone;
  children?: ReactNode;
}

export function Badge({
  tone = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx("nz-badge", tone !== "neutral" && `nz-badge--${tone}`, className)}
      {...rest}
    >
      {children}
    </span>
  );
}
