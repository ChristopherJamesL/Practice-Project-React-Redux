import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserError,
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { selectUserError } from "../../store/user/user.selector";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { FormEvent, ChangeEvent } from "react";
// import { FirebaseError } from "firebase/app";

import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const signInError = useSelector(selectUserError);

  useEffect(() => {
    if (signInError) {
      const { message } = signInError;
      let friendlyMessage = "Something went wrong";

      if (
        message?.includes("wrong-password") ||
        message?.includes("invalid-credential") ||
        message?.includes("user-not-found")
      ) {
        friendlyMessage = "Incorrect email or password";
      } else if (message?.includes("user-disabled")) {
        friendlyMessage = "This account has been disabled";
      }

      alert(friendlyMessage);
      dispatch(clearUserError());
    }
  }, [signInError, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(emailSignInStart({ email, password }));
    setFormFields(defaultFormFields);
  };

  return (
    <SignInContainer>
      <h2>Already Have An Account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <ButtonsContainer>
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
            Sign In
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
