/**
 * cn — Lightweight class name joining utility for @zenxea/ui
 */
export function cn(...inputs: (string | undefined | null | false | boolean | number)[]): string {
  return inputs.filter((x): x is string => typeof x === "string" && x.length > 0).join(" ");
}
