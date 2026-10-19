import React from "react";
import { cn } from "../../utils/cn";

export type StackGap = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  as?: React.ElementType;
}

const gapMap: Record<StackGap, string> = {
  xs: "var(--zx-gap-xs)",
  sm: "var(--zx-gap-sm)",
  md: "var(--zx-gap-md)",
  lg: "var(--zx-gap-lg)",
  xl: "var(--zx-gap-xl)",
  "2xl": "var(--zx-gap-2xl)",
  "3xl": "var(--zx-gap-3xl)",
};

const alignMap: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

const justifyMap: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

export const Stack: React.FC<StackProps> = ({
  gap = "md",
  align = "stretch",
  justify = "start",
  as: Component = "div",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn("zx-stack", className)}
      style={{
        display: "flex",
        flexDirection: "column",
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
