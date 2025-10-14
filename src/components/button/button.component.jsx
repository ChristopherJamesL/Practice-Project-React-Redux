import "./button.styles.scss";
//default inverted googlesignin

const BUTTON_TYPE_CLASSES = {
  inverted: "inverted",
  google: "google-sign-in",
};

export default function Button({ children, buttonType, ...otherProps }) {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
