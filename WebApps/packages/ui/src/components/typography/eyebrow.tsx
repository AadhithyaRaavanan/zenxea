import React from "react";
import { cn } from "../../utils/cn";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "default" | "brand" | "accent" | "muted";
  as?: React.ElementType;
}

const colorMap = {
  default: "var(--zx-text-default)",
  brand: "var(--zx-text-brand)",
  accent: "var(--zx-text-accent)",
  muted: "var(--zx-text-muted)",
};

export const Eyebrow: React.FC<EyebrowProps> = ({
  color = "brand",
  as: Component = "span",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn("zx-eyebrow", className)}
      style={{
        fontFamily: "var(--zx-font-mono)",
        fontSize: "var(--zx-text-overline)",
        lineHeight: "var(--zx-lh-nav)",
        letterSpacing: "var(--zx-ls-eyebrow)",
        textTransform: "uppercase",
        fontWeight: "var(--zx-weight-semibold)",
        color: colorMap[color],
        display: "inline-block",
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface MetadataProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  value?: React.ReactNode;
  as?: React.ElementType;
}

export const Metadata: React.FC<MetadataProps> = ({
  label,
  value,
  as: Component = "span",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn("zx-mono", className)}
      style={{
        fontFamily: "var(--zx-font-mono)",
        fontSize: "var(--zx-text-body-sm)",
        letterSpacing: "var(--zx-ls-mono)",
        color: "var(--zx-text-muted)",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--zx-gap-xs)",
        ...style,
      }}
      {...props}
    >
      {label && <strong style={{ color: "var(--zx-text-default)", fontWeight: 600 }}>{label}:</strong>}
      {value ?? children}
    </Component>
  );
};
