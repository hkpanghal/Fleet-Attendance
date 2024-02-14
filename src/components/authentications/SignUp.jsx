import React, { useState } from "react";
import { signUp } from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [user, setUser] = useState({name: "", email: "", password: "" });
   const navigate = useNavigate();
  const signUpUser = async (e) => {
    e.preventDefault();
    signUp(user)
  };

  
  return (
    <>
    <div className="signUpBox">

    <form action="#" className="signUpForm" method="POST">

        <input type="text" onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="name" className="signUpInputs"/>
        <input type="email"  onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email" className="signUpInputs"/> 
        <input type="password"  onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password" className="signUpInputs"/> 
        <button type="submit" onClick={signUpUser} >Sign Up</button>
    </form>

    <div className="bottom-area">
      <p>Already have an account →</p>
      <button onClick={()=> navigate("/SignIn")}>Sign In</button>
    </div>

    </div>

  
    </>
  );
}

export default SignUp;
