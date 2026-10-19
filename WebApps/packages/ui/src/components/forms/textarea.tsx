import React from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ isInvalid = false, disabled = false, className, style, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        aria-invalid={isInvalid}
        className={cn("zx-textarea w-full transition-colors outline-none", className)}
        style={{
          fontFamily: "var(--zx-font-body)",
          backgroundColor: disabled ? "var(--zx-bg-subtle)" : "var(--zx-bg-default)",
          color: disabled ? "var(--zx-text-muted)" : "var(--zx-text-default)",
          border: isInvalid
            ? "2px solid var(--zx-feedback-error)"
            : "1px solid var(--zx-border-default)",
          borderRadius: "0px",
          padding: "8px 12px",
          fontSize: "0.875rem",
          minHeight: "80px",
          cursor: disabled ? "not-allowed" : "text",
          ...style,
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  isInvalid?: boolean;
  selectSize?: "sm" | "md" | "lg";
}

const selectSizeStyles = {
  sm: { height: "32px", fontSize: "0.8125rem", padding: "4px 28px 4px 8px" },
  md: { height: "40px", fontSize: "0.875rem", padding: "8px 32px 8px 12px" },
  lg: { height: "48px", fontSize: "1rem", padding: "12px 36px 12px 16px" },
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, isInvalid = false, selectSize = "md", disabled = false, className, style, ...props }, ref) => {
    return (
      <div className="zx-select-wrapper relative inline-block w-full">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid}
          className={cn("zx-select w-full appearance-none outline-none cursor-pointer", className)}
          style={{
            fontFamily: "var(--zx-font-body)",
            backgroundColor: disabled ? "var(--zx-bg-subtle)" : "var(--zx-bg-default)",
            color: disabled ? "var(--zx-text-muted)" : "var(--zx-text-default)",
            border: isInvalid
              ? "2px solid var(--zx-feedback-error)"
              : "1px solid var(--zx-border-default)",
            borderRadius: "0px",
            ...selectSizeStyles[selectSize],
            ...style,
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--zx-text-default)", fontSize: "0.75rem", fontWeight: 700 }}
          aria-hidden="true"
        >
          ▼
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
