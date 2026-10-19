import React from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  xs: {
    padding: "4px 8px",
    fontSize: "0.75rem",
    gap: "4px",
    height: "26px",
  },
  sm: {
    padding: "6px 12px",
    fontSize: "0.8125rem",
    gap: "6px",
    height: "32px",
  },
  md: {
    padding: "8px 16px",
    fontSize: "0.875rem",
    gap: "8px",
    height: "40px",
  },
  lg: {
    padding: "12px 24px",
    fontSize: "1rem",
    gap: "10px",
    height: "48px",
  },
  xl: {
    padding: "14px 28px",
    fontSize: "1.125rem",
    gap: "12px",
    height: "56px",
  },
};

const getVariantStyle = (variant: ButtonVariant, disabled: boolean): React.CSSProperties => {
  if (disabled) {
    return {
      backgroundColor: "var(--zx-bg-subtle)",
      color: "var(--zx-text-muted)",
      borderColor: "var(--zx-border-subtle)",
      boxShadow: "none",
      cursor: "not-allowed",
      opacity: 0.6,
    };
  }

  switch (variant) {
    case "primary":
      // Periwinkle background (#7E69E8), pure black border, crisp line styling
      return {
        backgroundColor: "var(--zx-interactive-primary-bg)",
        color: "var(--zx-interactive-primary-text)",
        border: "1.5px solid #000000",
        boxShadow: "none",
      };
    case "secondary":
      // Pure Black background (#000000), white text, crisp line styling
      return {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        border: "1.5px solid #000000",
        boxShadow: "none",
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: "var(--zx-text-default)",
        border: "1.5px solid var(--zx-border-default)",
        boxShadow: "none",
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        color: "var(--zx-text-default)",
        border: "1px solid transparent",
        boxShadow: "none",
      };
    case "destructive":
      // Coral Red (#FF5A5F)
      return {
        backgroundColor: "var(--zx-feedback-error)",
        color: "#000000",
        border: "1.5px solid #000000",
        boxShadow: "none",
      };
    case "link":
      return {
        backgroundColor: "transparent",
        color: "var(--zx-text-brand)",
        border: "none",
        boxShadow: "none",
        textDecoration: "underline",
        padding: 0,
        height: "auto",
      };
    default:
      return {
        boxShadow: "none",
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  className,
  style,
  children,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "zx-button inline-flex items-center justify-center font-bold transition-all select-none hover:opacity-90 active:opacity-80",
        fullWidth ? "w-full" : "w-auto",
        className
      )}
      style={{
        fontFamily: "var(--zx-font-body)",
        letterSpacing: "0.02em",
        borderRadius: "0px", // Strict Brutalist square corners
        boxShadow: "none",
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...sizeStyles[size],
        ...getVariantStyle(variant, isDisabled),
        ...style,
      }}
      {...props}
    >
      {isLoading && (
        <span
          className="inline-block animate-spin"
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
          }}
          aria-hidden="true"
        />
      )}
      {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
