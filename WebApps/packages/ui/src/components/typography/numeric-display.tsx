import React from "react";
import { cn } from "../../utils/cn";

export interface NumericDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
  label?: string;
  suffix?: string;
  prefix?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "brand" | "accent";
}

const sizeMap = {
  sm: { fontSize: "var(--zx-text-h4)", lineHeight: "var(--zx-lh-h4)" },
  md: { fontSize: "var(--zx-text-h3)", lineHeight: "var(--zx-lh-h3)" },
  lg: { fontSize: "var(--zx-text-h2)", lineHeight: "var(--zx-lh-h2)" },
  xl: { fontSize: "var(--zx-text-display)", lineHeight: "var(--zx-lh-display)" },
};

const colorMap = {
  default: "var(--zx-text-default)",
  brand: "var(--zx-text-brand)",
  accent: "var(--zx-text-accent)",
};

export const NumericDisplay: React.FC<NumericDisplayProps> = ({
  value,
  label,
  suffix,
  prefix,
  size = "lg",
  color = "default",
  className,
  style,
  ...props
}) => {
  const cfg = sizeMap[size];

  return (
    <div className={cn("zx-numeric-display inline-flex flex-col", className)} style={style} {...props}>
      <span
        style={{
          fontFamily: "var(--zx-font-display)",
          fontSize: cfg.fontSize,
          lineHeight: cfg.lineHeight,
          color: colorMap[color],
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.02em",
        }}
      >
        {prefix && <span style={{ opacity: 0.7, marginRight: "2px" }}>{prefix}</span>}
        {value}
        {suffix && <span style={{ opacity: 0.7, marginLeft: "2px" }}>{suffix}</span>}
      </span>
      {label && (
        <span
          style={{
            fontFamily: "var(--zx-font-mono)",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "var(--zx-ls-eyebrow)",
            color: "var(--zx-text-muted)",
            marginTop: "2px",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  className,
  style,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <div
      className={cn("zx-code-block relative", className)}
      style={{
        border: "1px solid var(--zx-border-default)",
        backgroundColor: "var(--zx-bg-subtle)",
        position: "relative",
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{
          borderBottom: "1px solid var(--zx-border-default)",
          backgroundColor: "var(--zx-bg-default)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--zx-font-mono)",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--zx-text-muted)",
          }}
        >
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          style={{
            background: "transparent",
            border: "1px solid var(--zx-border-default)",
            padding: "2px 8px",
            fontFamily: "var(--zx-font-mono)",
            fontSize: "0.7rem",
            cursor: "pointer",
            color: "var(--zx-text-default)",
          }}
        >
          {copied ? "COPIED ✓" : "COPY"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "var(--zx-space-4)",
          fontFamily: "var(--zx-font-mono)",
          fontSize: "0.85rem",
          lineHeight: "1.5",
          overflowX: "auto",
          color: "var(--zx-text-default)",
          ...style,
        }}
        {...props}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};
