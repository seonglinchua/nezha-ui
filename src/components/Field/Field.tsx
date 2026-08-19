import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../../shared/cx";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Shown above the input. Always required — an unlabelled field is a bug. */
  label: string;
  /** Helper text, or the error message when `invalid` is set. */
  note?: string;
  invalid?: boolean;
}

export function Field({
  label,
  note,
  invalid = false,
  id,
  className,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const noteId = `${inputId}-note`;

  return (
    <div className={cx("nz-field", invalid && "nz-field--invalid", className)}>
      <label className="nz-field__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="nz-field__input"
        aria-invalid={invalid || undefined}
        aria-describedby={note ? noteId : undefined}
        {...rest}
      />
      {note ? (
        <span className="nz-field__note" id={noteId}>
          {note}
        </span>
      ) : null}
    </div>
  );
}
