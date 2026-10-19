import React from "react";
import { cn } from "../../utils/cn";

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  required = false,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <label
      className={cn("zx-field-label block font-semibold mb-1 select-none", className)}
      style={{
        fontFamily: "var(--zx-font-mono)",
        fontSize: "0.8125rem",
        letterSpacing: "var(--zx-ls-eyebrow)",
        textTransform: "uppercase",
        color: "var(--zx-text-default)",
        ...style,
      }}
      {...props}
    >
      {children}
      {required && (
        <span
          style={{ color: "var(--zx-feedback-error)", marginLeft: "4px" }}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
};

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const HelperText: React.FC<HelperTextProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  return (
    <p
      className={cn("zx-helper-text mt-1", className)}
      style={{
        fontFamily: "var(--zx-font-body)",
        fontSize: "0.75rem",
        color: "var(--zx-text-muted)",
        margin: "4px 0 0 0",
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export interface ValidationMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  return (
    <p
      role="alert"
      className={cn("zx-validation-message mt-1 font-medium", className)}
      style={{
        fontFamily: "var(--zx-font-mono)",
        fontSize: "0.75rem",
        color: "var(--zx-feedback-error)",
        margin: "4px 0 0 0",
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  id?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  helperText,
  errorMessage,
  id,
  className,
  style,
  children,
  ...props
}) => {
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = errorMessage ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("zx-form-field flex flex-col mb-4", className)} style={style} {...props}>
      {label && (
        <FieldLabel htmlFor={fieldId} required={required}>
          {label}
        </FieldLabel>
      )}
      <div className="relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              id: fieldId,
              isInvalid: Boolean(errorMessage),
              "aria-describedby": cn(helperId, errorId) || undefined,
            });
          }
          return child;
        })}
      </div>
      {errorMessage && <ValidationMessage id={errorId}>{errorMessage}</ValidationMessage>}
      {!errorMessage && helperText && <HelperText id={helperId}>{helperText}</HelperText>}
    </div>
  );
};
