import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../shared/cx";

export type ButtonVariant = "default" | "primary" | "quiet" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. Use `primary` once per view. */
  variant?: ButtonVariant;
  /** Compact height, for use inside table rows and toolbars. */
  small?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "default",
  small = false,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "nz-button",
        variant !== "default" && `nz-button--${variant}`,
        small && "nz-button--sm",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
