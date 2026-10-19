import React from "react";
import { cn } from "../../utils/cn";

export type SplitRatio = "50-50" | "sidebar-main" | "main-sidebar" | "1-2" | "2-1";

export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: SplitRatio;
  gap?: "none" | "sm" | "md" | "lg" | "gutter";
  bordered?: boolean;
  reverseOnMobile?: boolean;
  as?: React.ElementType;
}

const gapMap = {
  none: "0px",
  sm: "var(--zx-gap-sm)",
  md: "var(--zx-gap-md)",
  lg: "var(--zx-gap-lg)",
  gutter: "var(--zx-grid-gutter)",
};

export const Split: React.FC<SplitProps> = ({
  ratio = "50-50",
  gap = "gutter",
  bordered = false,
  reverseOnMobile = false,
  as: Component = "div",
  className,
  style,
  children,
  ...props
}) => {
  const getRatioStyle = (): React.CSSProperties => {
    switch (ratio) {
      case "50-50":
        return { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" };
      case "sidebar-main":
        return { display: "grid", gridTemplateColumns: "minmax(240px, 280px) 1fr" };
      case "main-sidebar":
        return { display: "grid", gridTemplateColumns: "1fr minmax(240px, 280px)" };
      case "1-2":
        return { display: "grid", gridTemplateColumns: "1fr 2fr" };
      case "2-1":
        return { display: "grid", gridTemplateColumns: "2fr 1fr" };
      default:
        return { display: "grid", gridTemplateColumns: "1fr 1fr" };
    }
  };

  return (
    <Component
      className={cn(
        "zx-split",
        ratio === "50-50" && "zx-split-50",
        ratio === "sidebar-main" && "zx-split-sidebar",
        bordered && "zx-grid-bordered",
        reverseOnMobile && "flex flex-col-reverse md:grid",
        className
      )}
      style={{
        ...getRatioStyle(),
        gap: gapMap[gap],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
