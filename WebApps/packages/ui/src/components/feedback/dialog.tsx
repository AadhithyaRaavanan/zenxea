import React from "react";
import { cn } from "../../utils/cn";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthMap = {
  sm: "400px",
  md: "540px",
  lg: "720px",
  xl: "960px",
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  footer,
  children,
  maxWidth = "md",
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="zx-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="zx-dialog-panel relative w-full flex flex-col bg-default transition-all"
        style={{
          maxWidth: maxWidthMap[maxWidth],
          backgroundColor: "var(--zx-bg-default)",
          border: "1.5px solid var(--zx-border-default)",
          boxShadow: "none",
          borderRadius: "0px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: "2px solid var(--zx-border-default)" }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--zx-font-display)",
                fontSize: "1.5rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                margin: 0,
                color: "var(--zx-text-default)",
              }}
            >
              {title}
            </h3>
            {description && (
              <p
                style={{
                  fontFamily: "var(--zx-font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--zx-text-muted)",
                  margin: "2px 0 0 0",
                }}
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 font-bold hover:opacity-70 transition-opacity"
            style={{
              background: "transparent",
              border: "1px solid var(--zx-border-default)",
              cursor: "pointer",
              fontFamily: "var(--zx-font-mono)",
              fontSize: "0.875rem",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="p-4 flex items-center justify-end gap-3"
            style={{ borderTop: "2px solid var(--zx-border-default)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "right",
  title,
  children,
  width = "360px",
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="zx-drawer-backdrop fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "zx-drawer-panel fixed top-0 bottom-0 flex flex-col h-full bg-default transition-transform",
          position === "right" ? "right-0" : "left-0"
        )}
        style={{
          width,
          backgroundColor: "var(--zx-bg-default)",
          borderLeft: position === "right" ? "2px solid #000000" : "none",
          borderRight: position === "left" ? "2px solid #000000" : "none",
        }}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: "2px solid var(--zx-border-default)" }}
        >
          {title && (
            <h3
              style={{
                fontFamily: "var(--zx-font-display)",
                fontSize: "1.25rem",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              background: "transparent",
              border: "1px solid var(--zx-border-default)",
              cursor: "pointer",
              fontFamily: "var(--zx-font-mono)",
              fontSize: "0.875rem",
              width: "28px",
              height: "28px",
            }}
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
