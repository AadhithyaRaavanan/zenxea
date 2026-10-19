import React from "react";
import { cn } from "../../utils/cn";

export type SectionSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type SectionVariant = "default" | "subtle" | "inverse" | "brand" | "bordered";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  variant?: SectionVariant;
  as?: React.ElementType;
}

const spacingStyles: Record<SectionSpacing, React.CSSProperties> = {
  xs: { paddingBlock: "var(--zx-space-section-xs)" },
  sm: { paddingBlock: "var(--zx-space-section-sm)" },
  md: { paddingBlock: "var(--zx-space-section-md)" },
  lg: { paddingBlock: "var(--zx-space-section-lg)" },
  xl: { paddingBlock: "var(--zx-space-section-xl)" },
  "2xl": { paddingBlock: "var(--zx-space-section-2xl)" },
};

const variantStyles: Record<SectionVariant, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--zx-bg-default)",
    color: "var(--zx-text-default)",
  },
  subtle: {
    backgroundColor: "var(--zx-bg-subtle)",
    color: "var(--zx-text-default)",
  },
  inverse: {
    backgroundColor: "var(--zx-bg-inverse)",
    color: "var(--zx-text-inverse)",
  },
  brand: {
    backgroundColor: "var(--zx-bg-brand)",
    color: "#FFFFFF",
  },
  bordered: {
    backgroundColor: "var(--zx-bg-default)",
    color: "var(--zx-text-default)",
    borderBottom: "2px solid var(--zx-border-default)",
  },
};

export const Section: React.FC<SectionProps> = ({
  spacing = "lg",
  variant = "default",
  as: Component = "section",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn("zx-section", className)}
      style={{
        ...spacingStyles[spacing],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
