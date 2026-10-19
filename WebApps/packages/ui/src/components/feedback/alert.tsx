import React from "react";
import { cn } from "../../utils/cn";

export type AlertStatus = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: AlertStatus;
  title?: React.ReactNode;
  onDismiss?: () => void;
}

const statusConfig: Record<
  AlertStatus,
  { bg: string; border: string; text: string; icon: string }
> = {
  info: {
    bg: "var(--zx-bg-subtle)",
    border: "var(--zx-border-brand)",
    text: "var(--zx-text-brand)",
    icon: "ℹ",
  },
  success: {
    bg: "var(--zx-bg-subtle)",
    border: "var(--zx-feedback-success)",
    text: "var(--zx-feedback-success)",
    icon: "✓",
  },
  warning: {
    bg: "var(--zx-bg-subtle)",
    border: "var(--zx-feedback-warning)",
    text: "var(--zx-feedback-warning)",
    icon: "⚠",
  },
  error: {
    bg: "var(--zx-bg-subtle)",
    border: "var(--zx-feedback-error)",
    text: "var(--zx-feedback-error)",
    icon: "✗",
  },
};

export const Alert: React.FC<AlertProps> = ({
  status = "info",
  title,
  onDismiss,
  className,
  style,
  children,
  ...props
}) => {
  const cfg = statusConfig[status];

  return (
    <div
      role="alert"
      className={cn("zx-alert flex items-start justify-between p-4", className)}
      style={{
        backgroundColor: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        boxShadow: "none",
        borderRadius: "0px",
        color: "var(--zx-text-default)",
        ...style,
      }}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex items-center justify-center font-bold text-sm shrink-0"
          style={{
            width: "22px",
            height: "22px",
            border: `1px solid ${cfg.border}`,
            color: cfg.text,
            fontFamily: "var(--zx-font-mono)",
          }}
          aria-hidden="true"
        >
          {cfg.icon}
        </span>
        <div>
          {title && (
            <h4
              style={{
                fontFamily: "var(--zx-font-mono)",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: cfg.text,
                margin: "0 0 4px 0",
              }}
            >
              {title}
            </h4>
          )}
          <div
            style={{
              fontFamily: "var(--zx-font-body)",
              fontSize: "0.875rem",
              lineHeight: 1.5,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="ml-4 shrink-0 font-bold hover:opacity-70 transition-opacity"
          style={{
            background: "transparent",
            border: "none",
            color: "var(--zx-text-muted)",
            cursor: "pointer",
            fontFamily: "var(--zx-font-mono)",
            fontSize: "1rem",
            padding: 0,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export interface ToastProps {
  id: string;
  message: string;
  status?: AlertStatus;
  duration?: number;
  onClose?: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  status = "info",
  onClose,
}) => {
  return (
    <div
      role="status"
      className="zx-toast flex items-center justify-between gap-4 p-3"
      style={{
        backgroundColor: "var(--zx-bg-default)",
        border: "1.5px solid var(--zx-border-default)",
        boxShadow: "none",
        borderRadius: "0px",
        minWidth: "280px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--zx-font-body)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--zx-text-default)",
        }}
      >
        {message}
      </span>
      {onClose && (
        <button
          onClick={() => onClose(id)}
          aria-label="Close notification"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--zx-font-mono)",
            color: "var(--zx-text-muted)",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
