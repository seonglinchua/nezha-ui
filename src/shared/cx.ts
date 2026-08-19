export type ClassValue = string | false | null | undefined;

/** Join truthy class names. Small on purpose — no dependency needed. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
