import React from "react";
import { cn } from "../../utils/cn";

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "div" | "span";
  size?: "hero" | "display";
  color?: "default" | "brand" | "accent" | "muted" | "inverse";
}

const colorMap = {
  default: "var(--zx-text-default)",
  brand: "var(--zx-text-brand)",
  accent: "var(--zx-text-accent)",
  muted: "var(--zx-text-muted)",
  inverse: "var(--zx-text-inverse)",
};

export const Display: React.FC<DisplayProps> = ({
  as: Component = "h1",
  size = "hero",
  color = "default",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "zx-display",
        size === "hero" ? "zx-display-hero" : "zx-display",
        className
      )}
      style={{
        fontFamily: "var(--zx-font-display)",
        fontSize: size === "hero" ? "var(--zx-text-display)" : "var(--zx-text-h1)",
        lineHeight: "var(--zx-lh-display)",
        letterSpacing: "var(--zx-ls-display)",
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
