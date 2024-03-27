import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../backend/auth";
import { authContext } from "../../Contexts/AuthContext";
import Loader from "../Home/Loader";


function SignUp() {

   const [first_name,setFirst_name] = useState("")
   const [last_name,setLast_name] = useState("")
   const [email,setEmail] = useState("")
   const [password,setPasword] = useState("")
   const [confirmPassword,setConfirmPassword] = useState("")

   const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
   const [isLoading,setIsLoading] = useState(false)
   const navigate = useNavigate();
   const[message,setMessage] = useState("")

  const signUp= async (e) => {
   
    e.preventDefault();

    if(!first_name || !email || !password){
      setMessage(" *(required) fields must not be empty")
      return
    }

    if(password.length < 4 || password.length > 20){
      setMessage("password length must be between 4-20 characters")
      return
    }
    if(password !== confirmPassword){
      setMessage("confirm password did not match")
      return
    }
  



    setIsLoading(true)
     signup(first_name.trim(),last_name.trim(),email.trim(),password.trim(),confirmPassword.trim())
     .then((res) => {
      if(res.data.success){
        setIsLoading(false)
        navigate("/")
        // setMessage("We have sent you a email on your registered email please verify your email")
      }
      
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
      setMessage("some error occurred while signing up please try again ")

    })
  };

  if(isLoading){
    return <Loader />
  }
  return (
    <>
    <div className="signUpBox">

    <form action="#" className="signUpForm" method="POST">

        <input type="text" onChange={(e)=>setFirst_name(e.target.value)} placeholder="first name *(required)" className="signUpInputs" value={first_name}/>
        <input type="text" onChange={(e)=>setLast_name(e.target.value)} placeholder="last name  *(optional)" className="signUpInputs" value={last_name}/>
        <input type="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="email  *(required)" className="signUpInputs" value={email}/> 
        <input type="password"  onChange={(e)=>setPasword(e.target.value)} placeholder="password  *(required)" className="signUpInputs" value={password}/> 
        <input type="password"  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="confirm password  *(required)" className="signUpInputs" value={confirmPassword}/> 
        <button type="submit" onClick={signUp} >Sign Up</button>
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
