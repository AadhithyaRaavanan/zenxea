import React from "react";
import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "default" | "subtle" | "heavy" | "brand" | "accent";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

const colorMap: Record<DividerVariant, string> = {
  default: "var(--zx-border-default)",
  subtle: "var(--zx-border-subtle)",
  heavy: "var(--zx-text-default)",
  brand: "var(--zx-border-brand)",
  accent: "var(--zx-border-accent)",
};

const thicknessMap: Record<DividerVariant, string> = {
  default: "1px",
  subtle: "1px",
  heavy: "2px",
  brand: "2px",
  accent: "2px",
};

const spacingMap: Record<string, string> = {
  none: "0px",
  xs: "var(--zx-space-2)",
  sm: "var(--zx-space-4)",
  md: "var(--zx-space-6)",
  lg: "var(--zx-space-8)",
  xl: "var(--zx-space-12)",
};

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  variant = "default",
  spacing = "md",
  className,
  style,
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";

  if (isHorizontal) {
    return (
      <hr
        className={cn("zx-divider", className)}
        style={{
          border: "none",
          borderTop: `${thicknessMap[variant]} solid ${colorMap[variant]}`,
          marginBlock: spacingMap[spacing],
          width: "100%",
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={cn("zx-divider-vertical", className)}
      style={{
        borderLeft: `${thicknessMap[variant]} solid ${colorMap[variant]}`,
        marginInline: spacingMap[spacing],
        alignSelf: "stretch",
        height: "auto",
        ...style,
      }}
      {...props}
    />
  );
};
