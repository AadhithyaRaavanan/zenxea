import React from "react";
import { cn } from "../../utils/cn";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  color?: "default" | "brand" | "accent" | "muted" | "inverse";
}

const colorMap = {
  default: "var(--zx-text-default)",
  brand: "var(--zx-text-brand)",
  accent: "var(--zx-text-accent)",
  muted: "var(--zx-text-muted)",
  inverse: "var(--zx-text-inverse)",
};

const levelStyles: Record<HeadingLevel, { fontSize: string; lineHeight: string; letterSpacing: string }> = {
  1: { fontSize: "var(--zx-text-h1)", lineHeight: "var(--zx-lh-h1)", letterSpacing: "var(--zx-ls-h1)" },
  2: { fontSize: "var(--zx-text-h2)", lineHeight: "var(--zx-lh-h2)", letterSpacing: "var(--zx-ls-h2)" },
  3: { fontSize: "var(--zx-text-h3)", lineHeight: "var(--zx-lh-h3)", letterSpacing: "var(--zx-ls-h3)" },
  4: { fontSize: "var(--zx-text-h4)", lineHeight: "var(--zx-lh-h4)", letterSpacing: "var(--zx-ls-h4)" },
  5: { fontSize: "var(--zx-text-h5)", lineHeight: "var(--zx-lh-h5)", letterSpacing: "var(--zx-ls-h5)" },
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  as,
  color = "default",
  className,
  style,
  children,
  ...props
}) => {
  const Component = (as || (`h${level}` as React.ElementType)) as React.ElementType;
  const cfg = levelStyles[level];

  return (
    <Component
      className={cn(`zx-h${level}`, className)}
      style={{
        fontFamily: "var(--zx-font-display)",
        fontSize: cfg.fontSize,
        lineHeight: cfg.lineHeight,
        letterSpacing: cfg.letterSpacing,
        textTransform: "uppercase",
        color: colorMap[color],
        margin: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
