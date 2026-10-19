import React from "react";
import { cn } from "../../utils/cn";

export type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
export type ClusterAlign = "start" | "center" | "end" | "baseline";
export type ClusterJustify = "start" | "center" | "end" | "between";

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: ClusterGap;
  align?: ClusterAlign;
  justify?: ClusterJustify;
  wrap?: boolean;
  as?: React.ElementType;
}

const gapMap: Record<ClusterGap, string> = {
  xs: "var(--zx-gap-xs)",
  sm: "var(--zx-gap-sm)",
  md: "var(--zx-gap-md)",
  lg: "var(--zx-gap-lg)",
  xl: "var(--zx-gap-xl)",
};

const alignMap: Record<ClusterAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
};

const justifyMap: Record<ClusterJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

export const Cluster: React.FC<ClusterProps> = ({
  gap = "sm",
  align = "center",
  justify = "start",
  wrap = true,
  as: Component = "div",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn("zx-cluster", className)}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap: gapMap[gap],
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
