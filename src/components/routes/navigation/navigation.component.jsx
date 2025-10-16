import { useContext } from "react";
import { Outlet, Link } from "react-router";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

export default function Navigation() {
  const { currentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
