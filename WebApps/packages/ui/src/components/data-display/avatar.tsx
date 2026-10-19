import React from "react";
import { cn } from "../../utils/cn";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const avatarSizes = {
  sm: { size: "28px", text: "0.75rem" },
  md: { size: "36px", text: "0.875rem" },
  lg: { size: "48px", text: "1.125rem" },
  xl: { size: "64px", text: "1.5rem" },
};

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = "md", className }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const cfg = avatarSizes[size];

  return (
    <div
      className={cn("zx-avatar inline-flex items-center justify-center font-bold overflow-hidden select-none", className)}
      style={{
        width: cfg.size,
        height: cfg.size,
        border: "1.5px solid #000000",
        borderRadius: "0px",
        backgroundColor: "var(--zx-interactive-primary-bg)",
        color: "#000000",
        fontFamily: "var(--zx-font-mono)",
        fontSize: cfg.text,
        boxShadow: "none",
      }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export interface ListRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
}

export const ListRow: React.FC<ListRowProps> = ({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  className,
  style,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "zx-list-row flex items-center justify-between p-3 transition-colors",
        onClick && "cursor-pointer hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60",
        className
      )}
      style={{
        borderBottom: "1px solid var(--zx-border-default)",
        backgroundColor: "var(--zx-bg-default)",
        ...style,
      }}
      {...props}
    >
      <div className="flex items-center gap-3">
        {leading && <div className="shrink-0">{leading}</div>}
        <div>
          <div
            style={{
              fontFamily: "var(--zx-font-body)",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--zx-text-default)",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontFamily: "var(--zx-font-body)",
                fontSize: "0.75rem",
                color: "var(--zx-text-muted)",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
};

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  isPositive = true,
  className,
}) => {
  return (
    <div
      className={cn("zx-metric-card p-5 flex flex-col justify-between", className)}
      style={{
        backgroundColor: "var(--zx-bg-default)",
        border: "1.5px solid var(--zx-border-default)",
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--zx-font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--zx-text-muted)",
        }}
      >
        {label}
      </span>
      <div className="flex items-baseline justify-between mt-2">
        <span
          style={{
            fontFamily: "var(--zx-font-display)",
            fontSize: "2.5rem",
            lineHeight: 1,
            color: "var(--zx-text-default)",
            letterSpacing: "0.02em",
          }}
        >
          {value}
        </span>
        {change && (
          <span
            style={{
              fontFamily: "var(--zx-font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: isPositive ? "var(--zx-feedback-success)" : "var(--zx-feedback-error)",
            }}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export interface KeyValueItem {
  key: string;
  value: React.ReactNode;
}

export interface KeyValueProps {
  items: KeyValueItem[];
  className?: string;
}

export const KeyValue: React.FC<KeyValueProps> = ({ items, className }) => {
  return (
    <div
      className={cn("zx-key-value flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800", className)}
      style={{
        border: "1px solid var(--zx-border-default)",
        backgroundColor: "var(--zx-bg-default)",
      }}
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between p-2.5">
          <span
            style={{
              fontFamily: "var(--zx-font-mono)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--zx-text-muted)",
            }}
          >
            {item.key}
          </span>
          <span
            style={{
              fontFamily: "var(--zx-font-mono)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--zx-text-default)",
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
