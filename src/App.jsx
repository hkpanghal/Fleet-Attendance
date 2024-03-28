import React, { useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "./Contexts/AuthContext";
import AppStack from "./Router/AppStack";
import AuthStack from "./Router/AuthStack";
import { fetchDetails } from "./Slices/userDetailsSlice";
import Loader from "./components/Home/Loader";

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const isLoggedin = useSelector((state) => state.user.isLoggedIn);
  const user_details = useSelector((state) => state.user.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails());
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      setIsLoggedIn(isLoggedin);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />
  }

  return isLoggedin ? <AppStack /> : <AuthStack />;
}

export default App;
