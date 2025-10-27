import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  inverted: "inverted",
  google: "google-sign-in",
};

const BUTTON_COMPONENTS = {
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
};

export default function Button({ children, buttonType, ...otherProps }) {
  const CustomButton = BUTTON_COMPONENTS[buttonType] || BaseButton;

  return <CustomButton {...otherProps}>{children}</CustomButton>;
}
