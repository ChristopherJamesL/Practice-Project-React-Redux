import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

import { ButtonHTMLAttributes, ReactNode } from "react";

// ===========================
// Button Type Enum
// ===========================

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  inverted = "inverted",
  google = "google-sign-in",
}

// ===========================
// Map enum to styled components
// ===========================

const BUTTON_COMPONENTS: Record<BUTTON_TYPE_CLASSES, typeof BaseButton> = {
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
};

// ===========================
// Button Props
// ===========================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  buttonType?: BUTTON_TYPE_CLASSES;
}

// ===========================
// Button Component
// ===========================

export default function Button({
  children,
  isLoading,
  buttonType,
  ...otherProps
}: ButtonProps) {
  const CustomButton =
    BUTTON_COMPONENTS[buttonType as BUTTON_TYPE_CLASSES] || BaseButton;

  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
}
