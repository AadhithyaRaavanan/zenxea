import React from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  isInvalid?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, isInvalid = false, disabled = false, className, style, ...props }, ref) => {
    return (
      <label
        className={cn(
          "zx-checkbox-label inline-flex items-center gap-2 select-none",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          aria-invalid={isInvalid}
          className="peer sr-only"
          {...props}
        />
        <span
          className="zx-checkbox-box flex items-center justify-center transition-all"
          style={{
            width: "18px",
            height: "18px",
            border: isInvalid ? "1.5px solid var(--zx-feedback-error)" : "1.5px solid #000000",
            borderRadius: "0px",
            backgroundColor: "var(--zx-bg-default)",
            boxShadow: "none",
            ...style,
          }}
          aria-hidden="true"
        >
          {props.checked && (
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "var(--zx-interactive-primary-bg)",
              }}
            />
          )}
        </span>
        {label && (
          <span
            style={{
              fontFamily: "var(--zx-font-body)",
              fontSize: "0.875rem",
              color: "var(--zx-text-default)",
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  orientation = "vertical",
  disabled = false,
  className,
}) => {
  return (
    <div
      role="radiogroup"
      className={cn(
        "zx-radio-group flex",
        orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
        className
      )}
    >
      {options.map((opt) => {
        const isChecked = value === opt.value;
        const isDisabled = disabled || opt.disabled;

        return (
          <label
            key={opt.value}
            className={cn(
              "zx-radio-label inline-flex items-center gap-2 select-none",
              isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => onChange?.(opt.value)}
              className="sr-only"
            />
            <span
              className="zx-radio-box flex items-center justify-center transition-all"
              style={{
                width: "18px",
                height: "18px",
                border: "1.5px solid #000000",
                borderRadius: "0px",
                backgroundColor: "var(--zx-bg-default)",
                boxShadow: "none",
              }}
              aria-hidden="true"
            >
              {isChecked && (
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#000000",
                  }}
                />
              )}
            </span>
            <span
              style={{
                fontFamily: "var(--zx-font-body)",
                fontSize: "0.875rem",
                color: "var(--zx-text-default)",
              }}
            >
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={cn(
        "zx-switch-label inline-flex items-center gap-3 select-none",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className="zx-switch-track relative inline-flex items-center transition-colors"
        style={{
          width: "44px",
          height: "24px",
          border: "1.5px solid #000000",
          borderRadius: "0px",
          backgroundColor: checked ? "var(--zx-interactive-primary-bg)" : "var(--zx-bg-subtle)",
          boxShadow: "none",
        }}
        aria-hidden="true"
      >
        <span
          className="zx-switch-thumb inline-block transition-transform"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#000000",
            transform: checked ? "translateX(22px)" : "translateX(2px)",
          }}
        />
      </span>
      {label && (
        <span
          style={{
            fontFamily: "var(--zx-font-body)",
            fontSize: "0.875rem",
            color: "var(--zx-text-default)",
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
