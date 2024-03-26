import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../backend/auth";
import { authContext } from "../../Contexts/AuthContext";
import Loader from "../Home/Loader";


function SignUp() {
   const [user, setUser] = useState({first_name: "", last_name:"", email: "", password: "" });
   const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
   const [isLoading,setIsLoading] = useState(false)
   const navigate = useNavigate();
   const[message,setMessage] = useState("")

  const signUpUser = async (e) => {
   
    e.preventDefault();

    setIsLoading(true)
     signup(user.first_name,user.last_name,user.email,user.password,user.password)
     .then((res) => {
      if(res.data.success){
        setIsLoading(false)
        navigate("/signin")
        // setMessage("We have sent you a email on your registered email please verify your email")
      }
      
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
      // setMessage("some error occurred while signing up ")

    })
  };

  if(isLoading){
    return <Loader />
  }
  return (
    <>
    <div className="signUpBox">

    <form action="#" className="signUpForm" method="POST">

        <input type="text" onChange={(e)=>setUser({...user,first_name:e.target.value})} placeholder="first name" className="signUpInputs"/>
        <input type="text" onChange={(e)=>setUser({...user,last_name:e.target.value})} placeholder="last name" className="signUpInputs"/>
        <input type="email"  onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email" className="signUpInputs"/> 
        <input type="password"  onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password" className="signUpInputs"/> 
        <button type="submit" onClick={signUpUser} >Sign Up</button>
    </form>

    <div className="bottom-area">
      <p>Already have an account →</p>
      <button onClick={()=> navigate("/")}>Sign In</button>
    </div>
    <p>{message}</p>
    </div>

    </>
  );
}

export default SignUp;
