import React from "react";
import { cn } from "../../utils/cn";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  actions,
  sticky = true,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        "zx-navbar w-full transition-colors z-50",
        sticky && "sticky top-0",
        className
      )}
      style={{
        backgroundColor: "var(--zx-bg-default)",
        borderBottom: "2px solid var(--zx-border-default)",
        padding: "0 var(--zx-container-gutter)",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...style,
      }}
      {...props}
    >
      <div className="flex items-center gap-6">
        {brand && <div className="zx-navbar-brand flex items-center">{brand}</div>}
        <nav className="zx-navbar-nav hidden md:flex items-center gap-1">{children}</nav>
      </div>
      {actions && <div className="zx-navbar-actions flex items-center gap-3">{actions}</div>}
    </header>
  );
};

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  as?: React.ElementType;
}

export const NavItem: React.FC<NavItemProps> = ({
  isActive = false,
  as: Component = "a",
  className,
  style,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "zx-nav-item inline-flex items-center px-3 py-2 font-semibold transition-colors select-none",
        className
      )}
      style={{
        fontFamily: "var(--zx-font-mono)",
        fontSize: "0.8125rem",
        letterSpacing: "var(--zx-ls-mono)",
        textTransform: "uppercase",
        color: isActive ? "var(--zx-text-default)" : "var(--zx-text-muted)",
        borderBottom: isActive ? "2px solid var(--zx-border-brand)" : "2px solid transparent",
        borderRadius: "0px",
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
