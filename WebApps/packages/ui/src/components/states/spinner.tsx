import React from "react";
import { cn } from "../../utils/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  color?: "default" | "brand" | "accent";
}

const sizeMap = {
  sm: "16px",
  md: "24px",
  lg: "36px",
};

const colorMap = {
  default: "#000000",
  brand: "var(--zx-interactive-primary-bg)",
  accent: "var(--zx-feedback-error)",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "default",
  className,
  style,
  ...props
}) => {
  const dim = sizeMap[size];

  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("zx-spinner inline-block animate-spin", className)}
      style={{
        width: dim,
        height: dim,
        border: "3px solid transparent",
        borderTopColor: colorMap[color],
        borderRightColor: colorMap[color],
        borderRadius: "0px", // Brutalist square spinning box
        ...style,
      }}
      {...props}
    />
  );
};

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn("zx-skeleton animate-pulse", className)}
      style={{
        width,
        height,
        backgroundColor: "var(--zx-bg-subtle)",
        border: "1px solid var(--zx-border-subtle)",
        borderRadius: "0px",
        ...style,
      }}
      {...props}
    />
  );
};

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  label,
  showPercent = true,
  className,
  style,
  ...props
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("zx-progress-wrapper w-full", className)} style={style} {...props}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span
              style={{
                fontFamily: "var(--zx-font-mono)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--zx-text-muted)",
              }}
            >
              {label}
            </span>
          )}
          {showPercent && (
            <span
              style={{
                fontFamily: "var(--zx-font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--zx-text-default)",
              }}
            >
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full overflow-hidden"
        style={{
          height: "12px",
          backgroundColor: "var(--zx-bg-subtle)",
          border: "1.5px solid var(--zx-border-default)",
          boxShadow: "none",
          borderRadius: "0px",
        }}
      >
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${clamped}%`,
            backgroundColor: "var(--zx-interactive-primary-bg)",
          }}
        />
      </div>
    </div>
  );
};

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        "zx-empty-state flex flex-col items-center justify-center p-12 text-center",
        className
      )}
      style={{
        border: "2px dashed var(--zx-border-default)",
        backgroundColor: "var(--zx-bg-subtle)",
        borderRadius: "0px",
        ...style,
      }}
      {...props}
    >
      {icon && <div className="mb-4 text-3xl opacity-60">{icon}</div>}
      <h3
        style={{
          fontFamily: "var(--zx-font-display)",
          fontSize: "1.75rem",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "var(--zx-text-default)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-2 max-w-md"
          style={{
            fontFamily: "var(--zx-font-body)",
            fontSize: "0.875rem",
            color: "var(--zx-text-muted)",
          }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
