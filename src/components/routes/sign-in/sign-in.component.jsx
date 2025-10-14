import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";

export default function SignIn() {
  const handleSignInWithPopup = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(`User signed in: `, user);

    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("user doc ref: ", userDocRef);
  };

  return (
    <div>
      <div>SignIn</div>;
      <button onClick={handleSignInWithPopup}>Sign In With Google Popup</button>
      <SignUpForm />
    </div>
  );
}
