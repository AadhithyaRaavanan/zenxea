import React from "react";
import { cn } from "../../utils/cn";

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 8 | 12;
export type GridGap = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "gutter";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  gap?: GridGap;
  bordered?: boolean;
  as?: React.ElementType;
}

const gapVarMap: Record<GridGap, string> = {
  xs: "var(--zx-gap-xs)",
  sm: "var(--zx-gap-sm)",
  md: "var(--zx-gap-md)",
  lg: "var(--zx-gap-lg)",
  xl: "var(--zx-gap-xl)",
  "2xl": "var(--zx-gap-2xl)",
  gutter: "var(--zx-grid-gutter)",
};

export const Grid: React.FC<GridProps> = ({
  columns,
  gap = "gutter",
  bordered = false,
  as: Component = "div",
  className,
  style,
  children,
  ...props
}) => {
  const dynamicStyle: React.CSSProperties = {
    gap: gapVarMap[gap],
    ...(columns
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : {}),
    ...style,
  };

  return (
    <Component
      className={cn(
        "zx-grid",
        bordered && "zx-grid-bordered",
        className
      )}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  as?: React.ElementType;
}

const spanClassMap: Record<string, string> = {
  1: "zx-col-span-1",
  2: "zx-col-span-2",
  3: "zx-col-span-3",
  4: "zx-col-span-4",
  5: "zx-col-span-5",
  6: "zx-col-span-6",
  7: "zx-col-span-7",
  8: "zx-col-span-8",
  9: "zx-col-span-9",
  10: "zx-col-span-10",
  11: "zx-col-span-11",
  12: "zx-col-span-12",
  full: "zx-col-span-full",
};

export const GridItem: React.FC<GridItemProps> = ({
  span,
  spanMd,
  spanLg,
  as: Component = "div",
  className,
  style,
  children,
  ...props
}) => {
  const spanStyle: React.CSSProperties = {
    ...(span ? { gridColumn: span === "full" ? "1 / -1" : `span ${span} / span ${span}` } : {}),
    ...style,
  };

  return (
    <Component
      className={cn(
        span ? spanClassMap[String(span)] : undefined,
        spanMd ? `md:${spanClassMap[String(spanMd)]}` : undefined,
        spanLg ? `lg:${spanClassMap[String(spanLg)]}` : undefined,
        className
      )}
      style={spanStyle}
      {...props}
    >
      {children}
    </Component>
  );
};
