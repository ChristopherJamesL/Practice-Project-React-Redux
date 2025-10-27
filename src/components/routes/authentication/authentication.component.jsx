import SignUpForm from "../../sign-up-form/sign-up-form.component";
import SignInForm from "../../sign-in-form/sign-in-form.component";

import "./authentication.styles.jsx";
import { AuthenticationContainer } from "./authentication.styles.jsx";

export default function Authentication() {
  return (
    <>
      <AuthenticationContainer>
        <SignInForm />
        <SignUpForm />
      </AuthenticationContainer>
    </>
  );
}
