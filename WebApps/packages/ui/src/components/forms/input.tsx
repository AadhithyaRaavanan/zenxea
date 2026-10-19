import React from "react";
import { cn } from "../../utils/cn";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  isInvalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizeStyles: Record<InputSize, React.CSSProperties> = {
  sm: {
    height: "32px",
    padding: "4px 8px",
    fontSize: "0.8125rem",
  },
  md: {
    height: "40px",
    padding: "8px 12px",
    fontSize: "0.875rem",
  },
  lg: {
    height: "48px",
    padding: "12px 16px",
    fontSize: "1rem",
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "md",
      isInvalid = false,
      leftIcon,
      rightIcon,
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div className="zx-input-wrapper relative flex items-center w-full">
        {leftIcon && (
          <span
            className="absolute left-3 flex items-center pointer-events-none text-muted"
            style={{ color: "var(--zx-text-muted)" }}
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid}
          className={cn(
            "zx-input w-full transition-colors outline-none",
            leftIcon ? "pl-9" : undefined,
            rightIcon ? "pr-9" : undefined,
            className
          )}
          style={{
            fontFamily: "var(--zx-font-body)",
            backgroundColor: disabled ? "var(--zx-bg-subtle)" : "var(--zx-bg-default)",
            color: disabled ? "var(--zx-text-muted)" : "var(--zx-text-default)",
            border: isInvalid
              ? "1.5px solid var(--zx-feedback-error)"
              : "1px solid var(--zx-border-default)",
            borderRadius: "0px",
            boxShadow: "none",
            cursor: disabled ? "not-allowed" : "text",
            ...sizeStyles[inputSize],
            ...style,
          }}
          {...props}
        />
        {rightIcon && (
          <span
            className="absolute right-3 flex items-center pointer-events-none"
            style={{ color: isInvalid ? "var(--zx-feedback-error)" : "var(--zx-text-muted)" }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
