import React from "react";
import { cn } from "../../utils/cn";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: React.ElementType;
  gutter?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "zx-container-sm",
  md: "zx-container-md",
  lg: "zx-container-lg",
  xl: "zx-container-xl",
  "2xl": "zx-container-2xl",
  full: "zx-container-full",
};

export const Container: React.FC<ContainerProps> = ({
  size = "xl",
  as: Component = "div",
  gutter = true,
  className,
  children,
  style,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "zx-container",
        sizeClasses[size],
        !gutter && "px-0",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
