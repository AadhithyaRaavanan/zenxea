import React from "react";
import { cn } from "../../utils/cn";

export type BodySize = "sm" | "base" | "lg";
export type BodyWeight = "regular" | "medium" | "semibold" | "bold";
export type TextColor = "default" | "muted" | "brand" | "accent" | "inverse";

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: BodySize;
  weight?: BodyWeight;
  color?: TextColor;
  as?: React.ElementType;
}

const sizeStyles: Record<BodySize, { fontSize: string; lineHeight: string }> = {
  sm: { fontSize: "var(--zx-text-body-sm)", lineHeight: "var(--zx-lh-body-sm)" },
  base: { fontSize: "var(--zx-text-body)", lineHeight: "var(--zx-lh-body)" },
  lg: { fontSize: "var(--zx-text-body-lg)", lineHeight: "var(--zx-lh-body-lg)" },
};

const weightMap: Record<BodyWeight, string> = {
  regular: "var(--zx-weight-regular)",
  medium: "var(--zx-weight-medium)",
  semibold: "var(--zx-weight-semibold)",
  bold: "var(--zx-weight-bold)",
};

const colorMap: Record<TextColor, string> = {
  default: "var(--zx-text-default)",
  muted: "var(--zx-text-muted)",
  brand: "var(--zx-text-brand)",
  accent: "var(--zx-text-accent)",
  inverse: "var(--zx-text-inverse)",
};

export const Body: React.FC<BodyProps> = ({
  size = "base",
  weight = "regular",
  color = "default",
  as: Component = "p",
  className,
  style,
  children,
  ...props
}) => {
  const cfg = sizeStyles[size];

  return (
    <Component
      className={cn(
        size === "lg" ? "zx-lead" : size === "sm" ? "zx-body-sm" : "zx-body",
        className
      )}
      style={{
        fontFamily: "var(--zx-font-body)",
        fontSize: cfg.fontSize,
        lineHeight: cfg.lineHeight,
        letterSpacing: "var(--zx-ls-body)",
        fontWeight: weightMap[weight],
        color: colorMap[color],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: TextColor;
  as?: React.ElementType;
}

export const Caption: React.FC<CaptionProps> = ({
  color = "muted",
  as: Component = "span",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn("zx-caption", className)}
      style={{
        fontFamily: "var(--zx-font-body)",
        fontSize: "var(--zx-text-caption)",
        lineHeight: "var(--zx-lh-caption)",
        letterSpacing: "var(--zx-ls-caption)",
        color: colorMap[color],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
