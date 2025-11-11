import { useState } from "react";
import { useDispatch } from "react-redux";
import {} from // createAuthUserWithEmailAndPassword,
// createUserDocumentFromAuth,
"../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles.jsx";
import { emailSignUpStart } from "../../store/user/user.action.js";
// import "./sign-up-form.styles.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(`passwords do not match`);
      return;
    }

    try {
      dispatch(emailSignUpStart(email, password, displayName));
      // const { user } = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );

      // const userToCreate = { ...user, displayName };
      // await createUserDocumentFromAuth(userToCreate);
      setFormFields(defaultFormFields);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("Error creating user with email and password: ", e.message);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't Have An Account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
}
