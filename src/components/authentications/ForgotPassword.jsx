import React, { useState } from "react";
import Loader from "../Home/Loader";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../backend/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err,setErr] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const navigation = useNavigate()
  const handleForgotPassword = (e) => {
    e.preventDefault()
      if(!email){
         setErr("email must not be empty")
          return
      }

      setIsLoading(true)
      forgotPassword(email.trim())
      .then((res) => {
          console.log(res.data)
          setIsLoading(false)
          if(res.data.success){
             alert(res.data.msg)
             navigation("/ResetPassword")
          }
      })
      .catch((err) => {
          setIsLoading(false)
          console.log(err)
          setErr("user not exits")
      })
  
  }

  if(isLoading){
      return <Loader />
  }
  return (
    <div className="signInBox">
      <form action="#" className="signInForm" method="POST">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="enter your registered email"
          className="signInInputs"
        />
        <button type="submit" onClick={handleForgotPassword}>
          Verify
        </button>
      </form>
      <p>{err}</p>
    </div>
  );
};

export default ForgotPassword;
