import { InputHTMLAttributes } from "react";

import { Group, Input, FormInputLabel } from "./form-input.styles";

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({ label, ...otherProps }: FormInputProps) {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          $shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}
