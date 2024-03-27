import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../backend/auth";
import Loader from "../Home/Loader";

const ResetPassword = () => {
    const [err,setErr] = useState("")
    const [token,setToken] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigation = useNavigate()
  
    const handleResetPassword = (e) => {
  
        e.preventDefault()

        if(!token){
           setErr("token is required")
            return
        }
  
        if(!password || !confirmPassword){
            setErr("password field is required")
            return
        }
        if(password !== confirmPassword){
            setErr("confirm password did not match")
            return
        }
  
  
        setIsLoading(true)
        resetPassword(token.trim(),password.trim(),confirmPassword.trim())
        .then((res) => {
            setIsLoading(false)
            if(res.data.success){
                alert(res.data.msg)
                navigation("/")
            }
        })
        .catch((err) => {
          
            console.log(err)
            setIsLoading(false)
            setErr("token did not match")
        })
    }
  
    if(isLoading){
        return <Loader />
    }
    return (
      <div className="signInBox">
        <form action="#" className="signInForm" method="POST">
          <input
            type="text"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            placeholder="enter provided token"
            className="signInInputs"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="enter new password"
            className="signInInputs"
          />
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="confirm password"
            className="signInInputs"
          />
          <button type="submit" onClick={handleResetPassword}>
            Update
          </button>
        </form>
        <p>{err}</p>
      </div>
    );
};

export default ResetPassword;
