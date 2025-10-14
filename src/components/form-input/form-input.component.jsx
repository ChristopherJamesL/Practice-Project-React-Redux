import "./form-input.styles.scss";

export default function FormInput({ label, ...otherProps }) {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`form-input-label ${otherProps.value.length ? "shrink" : ""}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
