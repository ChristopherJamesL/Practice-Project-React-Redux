import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Navigation from "./components/routes/navigation/navigation.component";
import Home from "./components/routes/home/home.component";
import Shop from "./components/routes/shop/shop.component";
import Authentication from "./components/routes/authentication/authentication.component";
import Checkout from "./components/routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      // setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="sign-in" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
