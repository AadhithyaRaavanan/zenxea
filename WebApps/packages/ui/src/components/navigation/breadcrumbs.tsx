import React from "react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("zx-breadcrumbs flex items-center py-2", className)}>
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:underline transition-colors"
                  style={{
                    fontFamily: "var(--zx-font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--zx-text-muted)",
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={item.isCurrent || isLast ? "page" : undefined}
                  style={{
                    fontFamily: "var(--zx-font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--zx-text-default)",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  style={{
                    fontFamily: "var(--zx-font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--zx-text-muted)",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export interface TabItem {
  id: string;
  label: React.ReactNode;
  count?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "underline" | "pill" | "brutalist";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "brutalist",
  className,
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        "zx-tabs flex overflow-x-auto select-none",
        variant === "brutalist" ? "border-b-2 border-black dark:border-white gap-0" : "gap-2",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              "zx-tab-btn flex items-center gap-2 font-bold px-4 py-2.5 transition-all outline-none",
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{
              fontFamily: "var(--zx-font-mono)",
              fontSize: "0.8125rem",
              letterSpacing: "var(--zx-ls-mono)",
              textTransform: "uppercase",
              borderRadius: "0px",
              cursor: tab.disabled ? "not-allowed" : "pointer",
              backgroundColor:
                variant === "brutalist"
                  ? isActive
                    ? "var(--zx-interactive-primary-bg)"
                    : "transparent"
                  : isActive
                  ? "var(--zx-bg-inverse)"
                  : "transparent",
              color:
                variant === "brutalist"
                  ? isActive
                    ? "#000000"
                    : "var(--zx-text-muted)"
                  : isActive
                  ? "var(--zx-text-inverse)"
                  : "var(--zx-text-muted)",
              border:
                variant === "brutalist"
                  ? isActive
                    ? "2px solid #000000"
                    : "2px solid transparent"
                  : "none",
              marginBottom: variant === "brutalist" && isActive ? "-2px" : "0",
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "1px 6px",
                  borderRadius: "0px",
                  backgroundColor: isActive ? "#000000" : "var(--zx-bg-subtle)",
                  color: isActive ? "#FFFFFF" : "var(--zx-text-default)",
                  fontWeight: 700,
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
