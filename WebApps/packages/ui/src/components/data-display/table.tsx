import React from "react";
import { cn } from "../../utils/cn";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  bordered?: boolean;
  striped?: boolean;
}

export const Table: React.FC<TableProps> = ({
  bordered = true,
  striped = false,
  className,
  children,
  ...props
}) => {
  return (
    <div className="zx-table-container w-full overflow-x-auto">
      <table
        className={cn(
          "zx-table w-full text-left border-collapse",
          bordered && "border-2 border-black dark:border-white",
          className
        )}
        style={{
          fontFamily: "var(--zx-font-body)",
          fontSize: "0.875rem",
        }}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => (
  <thead
    className={cn("zx-thead border-b-2 border-black dark:border-white", className)}
    style={{
      backgroundColor: "var(--zx-bg-subtle)",
      fontFamily: "var(--zx-font-mono)",
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
    }}
    {...props}
  >
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => (
  <tbody className={cn("zx-tbody divide-y divide-neutral-300 dark:divide-neutral-800", className)} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => (
  <tr className={cn("zx-tr transition-colors hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60", className)} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <th className={cn("zx-th p-3 font-bold", className)} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <td className={cn("zx-td p-3", className)} {...props}>
    {children}
  </td>
);

export type BadgeVariant = "default" | "brand" | "accent" | "outline" | "success" | "warning";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const badgeVariantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  default: {
    bg: "var(--zx-bg-subtle)",
    text: "var(--zx-text-default)",
    border: "var(--zx-border-default)",
  },
  brand: {
    bg: "var(--zx-interactive-primary-bg)",
    text: "#000000",
    border: "#000000",
  },
  accent: {
    bg: "var(--zx-feedback-error)",
    text: "#000000",
    border: "#000000",
  },
  outline: {
    bg: "transparent",
    text: "var(--zx-text-default)",
    border: "var(--zx-border-default)",
  },
  success: {
    bg: "#10b981",
    text: "#000000",
    border: "#000000",
  },
  warning: {
    bg: "#f59e0b",
    text: "#000000",
    border: "#000000",
  },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  dot = false,
  className,
  style,
  children,
  ...props
}) => {
  const cfg = badgeVariantStyles[variant];

  return (
    <span
      className={cn("zx-badge inline-flex items-center gap-1.5 px-2 py-0.5 font-bold uppercase select-none", className)}
      style={{
        fontFamily: "var(--zx-font-mono)",
        fontSize: "0.6875rem",
        letterSpacing: "0.08em",
        borderRadius: "0px",
        backgroundColor: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        boxShadow: "none",
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          className="inline-block"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: cfg.text,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
