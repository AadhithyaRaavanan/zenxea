import React from "react";
import { cn } from "../../utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  return (
    <nav aria-label="Pagination" className={cn("zx-pagination flex items-center gap-1", className)}>
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          fontFamily: "var(--zx-font-mono)",
          fontSize: "0.8125rem",
          border: "1px solid var(--zx-border-default)",
          backgroundColor: "var(--zx-bg-default)",
          color: "var(--zx-text-default)",
          borderRadius: "0px",
        }}
      >
        ← PREV
      </button>

      <span
        className="px-4 py-1.5 font-semibold"
        style={{
          fontFamily: "var(--zx-font-mono)",
          fontSize: "0.8125rem",
          color: "var(--zx-text-muted)",
        }}
      >
        PAGE <strong style={{ color: "var(--zx-text-default)" }}>{currentPage}</strong> OF{" "}
        <strong style={{ color: "var(--zx-text-default)" }}>{totalPages}</strong>
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          fontFamily: "var(--zx-font-mono)",
          fontSize: "0.8125rem",
          border: "1px solid var(--zx-border-default)",
          backgroundColor: "var(--zx-bg-default)",
          color: "var(--zx-text-default)",
          borderRadius: "0px",
        }}
      >
        NEXT →
      </button>
    </nav>
  );
};

export interface DropdownMenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = "left",
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("zx-dropdown-wrapper relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          className="zx-dropdown-menu absolute z-50 mt-1 min-w-[200px] flex flex-col py-1"
          style={{
            [align === "right" ? "right" : "left"]: 0,
            backgroundColor: "var(--zx-bg-default)",
            border: "1.5px solid var(--zx-border-default)",
            boxShadow: "none",
            borderRadius: "0px",
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-left font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900 disabled:opacity-40"
              style={{
                fontFamily: "var(--zx-font-mono)",
                fontSize: "0.8125rem",
                color: item.destructive ? "var(--zx-feedback-error)" : "var(--zx-text-default)",
                border: "none",
                background: "transparent",
                cursor: item.disabled ? "not-allowed" : "pointer",
                width: "100%",
              }}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  header,
  footer,
  width = "260px",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <aside
      className={cn("zx-sidebar flex flex-col h-full shrink-0", className)}
      style={{
        width,
        backgroundColor: "var(--zx-bg-default)",
        borderRight: "2px solid var(--zx-border-default)",
        ...style,
      }}
      {...props}
    >
      {header && (
        <div className="p-4 border-b border-neutral-300 dark:border-neutral-800">
          {header}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-3">{children}</div>
      {footer && (
        <div className="p-4 border-t border-neutral-300 dark:border-neutral-800">
          {footer}
        </div>
      )}
    </aside>
  );
};
