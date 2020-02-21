import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../routes";
import { FirebaseContext } from "../firebase";
import { SignOutButton } from "../SignInForm/SignOutButton";

export const NavHeader = () => {
  const FirebaseAuth = useContext(FirebaseContext);
  const message = (user: firebase.User | null) =>
    user ? `Currently logged in as ${user.displayName}` : "Not currently logged in";
  let [loggedIn, setLoggedIn] = useState(message(FirebaseAuth.currentUser));
  useEffect(() =>
    FirebaseAuth.onAuthStateChanged(user => setLoggedIn(message(user)))
  );
  return (
    <div>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      <span>{loggedIn}</span>
      <SignOutButton/>
    </div>
  );
};
