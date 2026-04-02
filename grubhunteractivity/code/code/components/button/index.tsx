import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  variant?: "blue" | "outline";
  clickHandler?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  children,
  variant = "blue",
  clickHandler,
}) => {
  // Helper to render content
  const renderContent = (content: ReactNode) => <span>{content}</span>;

  // Compose class names
  const classNames = [
    styles.button,
    variant === "blue" ? styles.blue : styles.outline,
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={disabled ? undefined : clickHandler}
      onKeyPress={
        disabled
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                clickHandler?.();
              }
            }
      }
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {renderContent(children)}
    </div>
  );
};
