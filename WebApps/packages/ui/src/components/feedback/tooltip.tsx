import React from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = React.useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
    }
  };

  return (
    <div
      className="zx-tooltip-wrapper relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "zx-tooltip absolute z-50 whitespace-nowrap px-2.5 py-1 text-xs font-semibold pointer-events-none",
            getPositionClasses()
          )}
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            fontFamily: "var(--zx-font-mono)",
            letterSpacing: "0.04em",
            borderRadius: "0px",
            border: "1px solid var(--zx-border-brand)",
            boxShadow: "none",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("zx-popover-wrapper relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className="zx-popover-panel absolute z-50 mt-2 p-4"
          style={{
            backgroundColor: "var(--zx-bg-default)",
            border: "1.5px solid var(--zx-border-default)",
            boxShadow: "none",
            borderRadius: "0px",
            minWidth: "260px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
