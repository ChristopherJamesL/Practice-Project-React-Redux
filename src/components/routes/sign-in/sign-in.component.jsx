import { signInWithGooglePopup } from "../../../utils/firebase/firebase.utils";

export default function SignIn() {
  const handleSignInWithPopup = async () => {
    const response = await signInWithGooglePopup();
    console.log(`User signed in: `, response);
  };

  return (
    <div>
      <div>SignIn</div>;
      <button onClick={handleSignInWithPopup}>Sign In With Google Popup</button>
    </div>
  );
}
