import React from "react";
import { cn } from "../../utils/cn";
import { ButtonVariant } from "./button";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg";
  "aria-label": string;
}

const sizeMap = {
  xs: { width: "26px", height: "26px", fontSize: "0.75rem" },
  sm: { width: "32px", height: "32px", fontSize: "0.875rem" },
  md: { width: "40px", height: "40px", fontSize: "1rem" },
  lg: { width: "48px", height: "48px", fontSize: "1.25rem" },
};

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "outline",
  size = "md",
  className,
  style,
  children,
  ...props
}) => {
  const cfg = sizeMap[size];

  return (
    <button
      className={cn(
        "zx-icon-button inline-flex items-center justify-center font-bold transition-all select-none hover:opacity-85 active:opacity-75",
        className
      )}
      style={{
        width: cfg.width,
        height: cfg.height,
        padding: 0,
        borderRadius: "0px",
        cursor: props.disabled ? "not-allowed" : "pointer",
        border: "1.5px solid var(--zx-border-default)",
        backgroundColor: variant === "primary" ? "var(--zx-interactive-primary-bg)" : "transparent",
        color: variant === "primary" ? "#000000" : "var(--zx-text-default)",
        boxShadow: "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  attached = true,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <div
      role="group"
      className={cn(
        "zx-button-group inline-flex",
        attached ? "border-collapse" : "gap-2",
        className
      )}
      style={{
        borderRadius: "0px",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
