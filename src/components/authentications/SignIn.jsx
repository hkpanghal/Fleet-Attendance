import React, { useState } from 'react'
import { signIn } from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate()
const [user,setUser] = useState({
    email:"",
    password:"",
  })

  const signInUser = async (e)=> {
    e.preventDefault();
   if(await signIn(user) === true)
   {
     navigate("/Home")
   }
   else if(await signIn(user) === false){
    console.log("some unexpectecd error")
   }
  }
  
  return (
    <>
    <div className="signInBox">

    <form action="#" className="signInForm" method="POST">

        <input type="email"  onChange={(e)=>setUser({...user, email:e.target.value})} placeholder="email" className="signInInputs"/> 
        <input type="password"  onChange={(e)=>setUser({...user, password:e.target.value})} placeholder="password" className="signInInputs"/> 
        <button type="submit" onClick={signInUser} >Sign In</button>
    </form>
    </div>
    </>
  );
}

export default SignIn